const { config } = require('../lib/config');
const horseSpawner = require('../lib/triggers/horseSpawner');
const { UserHorses, HorseConfig } = require('../lib/models');
const HORSE_VALUES = require('../horses.json');

const VERSION = 'orbital-master-v3';

if (!client.orbital || client.orbital.version !== VERSION) {
  const state = {
    defaults: {
      DEBOUNCE_MS: config.DEBOUNCE_MS,
      SIMILARITY_THRESHOLD: config.SIMILARITY_THRESHOLD,
      RECENT_MSG_COUNT: config.RECENT_MSG_COUNT,
      COIN_CHANCE: config.COIN_CHANCE,
      SPAWN_COEFFICIENT: config.SPAWN_COEFFICIENT,
      FLAIR_THRESHOLD_VALUE: config.FLAIR_THRESHOLD_VALUE,
      COIN_DROP_SIZE: config.COIN_DROP_SIZE,
      ANTIINFLATOR: config.ANTIINFLATOR,
      UNEXPECTED_CAT_PROBABILITY: config.UNEXPECTED_CAT_PROBABILITY,
      FRENZY_THRESHOLD_MS: config.FRENZY_THRESHOLD_MS,
      FRENZY_CHANCE: config.FRENZY_CHANCE,
      CONFISCATE_CHANCE: config.CONFISCATE_CHANCE,
      LOSS_THRESHOLD: config.LOSS_THRESHOLD
    },

    oneShotArms: new Map(),           // userId -> horseName|null
    spawnMultByUser: new Map(),       // userId -> multiplier (lower => better spawns)
    gambleByUser: new Map(),          // userId -> overrides object
    listenerInstalled: false,
    spawnWrapped: false,
    gambleWrapped: false,
    originalSpawn: null,
    originalGambleExecute: null
  };

  const horseNames = Object.keys(HORSE_VALUES).filter(n => n !== 'Horse Coin');

  const pickRandomHorse = () => horseNames[Math.floor(Math.random() * horseNames.length)];
  const ensureUserId = (payload, interaction) => String(payload?.userId || interaction.user.id);

  const getInv = async (userId) => {
    let inv = await UserHorses.findOne({ userId: String(userId) });
    if (!inv) inv = new UserHorses({ userId: String(userId), horses: new Map(), horseCoins: 0 });
    return inv;
  };

  const ensureHorse = (name) => {
    if (!HORSE_VALUES[name]) throw new Error(`Unknown horse: ${name}`);
  };

  const applyGlobalConfig = (patch = {}) => {
    for (const [k, v] of Object.entries(patch)) {
      if (Object.prototype.hasOwnProperty.call(config, k) && v !== undefined) config[k] = v;
    }
  };

  const installOneShotListener = () => {
    if (state.listenerInstalled) return;
    state.listenerInstalled = true;

    client.on('messageCreate', async (msg) => {
      try {
        if (!msg.guild || msg.author.bot) return;

        const arm = state.oneShotArms.get(msg.author.id);
        if (!arm) return;
        state.oneShotArms.delete(msg.author.id); // consume one-shot immediately

        const horseName = arm.horseName && HORSE_VALUES[arm.horseName] ? arm.horseName : pickRandomHorse();

        const inv = await getInv(msg.author.id);
        inv.horses.set(horseName, (inv.horses.get(horseName) || 0) + 1);
        inv.markModified('horses');
        await inv.save();

        const hCfg = await HorseConfig.findOne({ guildId: msg.guild.id });
        const out = hCfg?.channelId
          ? await msg.guild.channels.fetch(hCfg.channelId).catch(() => msg.channel)
          : msg.channel;

        await out.send(`<@${msg.author.id}> found the **${horseName}**!`);
        if (HORSE_VALUES[horseName]?.link) await out.send(HORSE_VALUES[horseName].link);
      } catch {}
    });
  };

  const wrapSpawn = () => {
    if (state.spawnWrapped) return;
    state.spawnWrapped = true;

    state.originalSpawn = horseSpawner.handleHorseSpawn;
    horseSpawner.handleHorseSpawn = async (msg) => {
      const userMult = state.spawnMultByUser.get(msg.author.id);
      if (!userMult) return state.originalSpawn(msg);

      const old = config.SPAWN_COEFFICIENT;
      config.SPAWN_COEFFICIENT = Math.max(1, old * userMult);
      try {
        return await state.originalSpawn(msg);
      } finally {
        config.SPAWN_COEFFICIENT = old;
      }
    };
  };

  const wrapGamble = () => {
    if (state.gambleWrapped) return;
    const cmd = client.commands.get('horsegamble');
    if (!cmd) throw new Error('horsegamble command not found');
    state.gambleWrapped = true;

    state.originalGambleExecute = cmd.execute;
    cmd.execute = async function (interaction) {
      const userId = interaction.user.id;
      const o = state.gambleByUser.get(userId);

      if (!o) return state.originalGambleExecute(interaction);

      // one-shot forced loss of a specific horse (frenzy-style)
      if (o.forceLoseHorseOnce) {
        const horse = o.forceLoseHorseOnce;
        const inv = await getInv(userId);
        const have = inv.horses.get(horse) || 0;
        state.gambleByUser.delete(userId); // consume once
        if (have > 0) {
          inv.horses.set(horse, have - 1);
          inv.lastGamble = Date.now();
          inv.markModified('horses');
          await inv.save();
          return interaction.reply(`🔥 **GAMBLING FRENZY!**\n* Your **${horse}** ran away in the confusion!`);
        }
        return interaction.reply(`🔥 **GAMBLING FRENZY!**\n* You had no **${horse}** to lose.`);
      }

      // always-win/always-keep behavior by bypassing original
      if (o.noLose === true) {
        const horseName = interaction.options.getString('horse')?.trim();
        if (!horseName || horseName.toLowerCase() === 'horse coin') {
          return state.originalGambleExecute(interaction);
        }

        ensureHorse(horseName);
        const inv = await getInv(userId);
        if ((inv.horses.get(horseName) || 0) <= 0) {
          return interaction.reply({ content: `You don't have a **${horseName}**!`, flags: [64] });
        }

        if ((inv.horseCoins || 0) > 0) inv.horseCoins -= 1;
        inv.lastGamble = Date.now();
        await inv.save();
        return interaction.reply(`🍀 Override active: no-loss mode kept your **${horseName}**.`);
      }

      return state.originalGambleExecute(interaction);
    };
  };

  client.orbital = {
    version: VERSION,
    state,

    async run(action, payload = {}, interaction) {
      installOneShotListener();

      if (action === 'help') {
        return {
          version: VERSION,
          actions: [
            'status',
            'config.get',
            'config.set',
            'config.reset',
            'coins.set',
            'coins.add',
            'coins.remove',
            'horses.set',
            'horses.add',
            'horses.remove',
            'spawn.oneshot',
            'spawn.mult.set',
            'spawn.mult.clear',
            'gamble.user.set',
            'gamble.user.clear'
          ]
        };
      }

      if (action === 'status') {
        return {
          version: VERSION,
          oneShotArmedUsers: Array.from(state.oneShotArms.keys()),
          spawnMultByUser: Array.from(state.spawnMultByUser.entries()),
          gambleByUser: Array.from(state.gambleByUser.entries()),
          config: { ...config }
        };
      }

      if (action === 'config.get') return { ...config };

      if (action === 'config.set') {
        applyGlobalConfig(payload);
        return { ok: true, config: { ...config } };
      }

      if (action === 'config.reset') {
        applyGlobalConfig(state.defaults);
        return { ok: true, config: { ...config } };
      }

      if (action === 'coins.set') {
        const userId = ensureUserId(payload, interaction);
        const amount = Math.max(0, Math.floor(Number(payload.amount || 0)));
        const inv = await getInv(userId);
        const before = inv.horseCoins || 0;
        inv.horseCoins = amount;
        await inv.save();
        return { ok: true, userId, before, after: inv.horseCoins };
      }

      if (action === 'coins.add') {
        const userId = ensureUserId(payload, interaction);
        const delta = Math.max(0, Math.floor(Number(payload.amount || 0)));
        const inv = await getInv(userId);
        const before = inv.horseCoins || 0;
        inv.horseCoins = before + delta;
        await inv.save();
        return { ok: true, userId, before, delta, after: inv.horseCoins };
      }

      if (action === 'coins.remove') {
        const userId = ensureUserId(payload, interaction);
        const delta = Math.max(0, Math.floor(Number(payload.amount || 0)));
        const inv = await getInv(userId);
        const before = inv.horseCoins || 0;
        inv.horseCoins = Math.max(0, before - delta);
        await inv.save();
        return { ok: true, userId, before, delta: -delta, after: inv.horseCoins };
      }

      if (action === 'horses.set') {
        const userId = ensureUserId(payload, interaction);
        const horse = payload.horseName;
        const amount = Math.max(0, Math.floor(Number(payload.amount || 0)));
        ensureHorse(horse);
        const inv = await getInv(userId);
        const before = inv.horses.get(horse) || 0;
        inv.horses.set(horse, amount);
        inv.markModified('horses');
        await inv.save();
        return { ok: true, userId, horse, before, after: inv.horses.get(horse) || 0 };
      }

      if (action === 'horses.add') {
        const userId = ensureUserId(payload, interaction);
        const horse = payload.horseName;
        const amount = Math.max(0, Math.floor(Number(payload.amount || 0)));
        ensureHorse(horse);
        const inv = await getInv(userId);
        const before = inv.horses.get(horse) || 0;
        inv.horses.set(horse, before + amount);
        inv.markModified('horses');
        await inv.save();
        return { ok: true, userId, horse, before, delta: amount, after: inv.horses.get(horse) || 0 };
      }

      if (action === 'horses.remove') {
        const userId = ensureUserId(payload, interaction);
        const horse = payload.horseName;
        const amount = Math.max(0, Math.floor(Number(payload.amount || 0)));
        ensureHorse(horse);
        const inv = await getInv(userId);
        const before = inv.horses.get(horse) || 0;
        inv.horses.set(horse, Math.max(0, before - amount));
        inv.markModified('horses');
        await inv.save();
        return { ok: true, userId, horse, before, delta: -amount, after: inv.horses.get(horse) || 0 };
      }

      if (action === 'spawn.oneshot') {
        const userId = ensureUserId(payload, interaction);
        const horseName = payload.horseName || null;
        if (horseName) ensureHorse(horseName);
        state.oneShotArms.set(userId, { horseName });
        return { ok: true, armed: true, userId, horseName: horseName || '(random)' };
      }

      if (action === 'spawn.mult.set') {
        const userId = ensureUserId(payload, interaction);
        const mult = Number(payload.multiplier);
        if (!Number.isFinite(mult) || mult <= 0) throw new Error('multiplier must be > 0');
        wrapSpawn();
        state.spawnMultByUser.set(userId, mult);
        return { ok: true, userId, multiplier: mult };
      }

      if (action === 'spawn.mult.clear') {
        const userId = ensureUserId(payload, interaction);
        state.spawnMultByUser.delete(userId);
        return { ok: true, userId };
      }

      if (action === 'gamble.user.set') {
        const userId = ensureUserId(payload, interaction);
        const next = {
          noLose: Boolean(payload.noLose),
          forceLoseHorseOnce: payload.forceLoseHorseOnce || null
        };
        if (next.forceLoseHorseOnce) ensureHorse(next.forceLoseHorseOnce);
        wrapGamble();
        state.gambleByUser.set(userId, next);
        return { ok: true, userId, overrides: next };
      }

      if (action === 'gamble.user.clear') {
        const userId = ensureUserId(payload, interaction);
        state.gambleByUser.delete(userId);
        return { ok: true, userId };
      }

      throw new Error(`Unknown action: ${action}`);
    }
  };
}

return {
  installed: true,
  version: client.orbital.version,
  quickStart: [
    "await client.orbital.run('status', {}, interaction)",
    "await client.orbital.run('spawn.oneshot',{horseName:'Horse of Logic and Reason'},interaction)",
    "await client.orbital.run('coins.set',{userId:'1227345940487082089',amount:6000000000},interaction)",
    "await client.orbital.run('horses.add',{userId:'1227345940487082089',horseName:'Horse of Commonosity and Normaltude',amount:500},interaction)",
    "await client.orbital.run('gamble.user.set',{noLose:true},interaction)"
  ]
};
