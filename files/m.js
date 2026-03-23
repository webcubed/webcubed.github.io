const { config } = require('../config');
const { UserHorses, HorseConfig } = require('../models');
const horseSpawner = require('../triggers/horseSpawner');
const HORSE_VALUES = require('../../horses.json');

const VERSION = 'orbital-control-v2';

if (!client.orbital || client.orbital.version !== VERSION) {
  const state = {
    defaults: {
      LOSS_THRESHOLD: config.LOSS_THRESHOLD,
      FRENZY_CHANCE: config.FRENZY_CHANCE,
      CONFISCATE_CHANCE: config.CONFISCATE_CHANCE,
      FRENZY_THRESHOLD_MS: config.FRENZY_THRESHOLD_MS,
      SPAWN_COEFFICIENT: config.SPAWN_COEFFICIENT
    },
    oneShot: new Map(),              // userId -> horseName|null
    userSpawnMult: new Map(),        // userId -> multiplier
    listenerInstalled: false,
    spawnWrapped: false,
    originalSpawner: null
  };

  const horseNames = Object.keys(HORSE_VALUES).filter(n => n !== 'Horse Coin');

  async function getInv(userId) {
    let inv = await UserHorses.findOne({ userId });
    if (!inv) inv = new UserHorses({ userId, horses: new Map(), horseCoins: 0 });
    return inv;
  }

  function pickRandomHorse() {
    return horseNames[Math.floor(Math.random() * horseNames.length)];
  }

  async function grantHorse(userId, horseName, amount) {
    if (!HORSE_VALUES[horseName]) throw new Error('Unknown horse name');
    if (!Number.isInteger(amount) || amount <= 0) throw new Error('amount must be positive integer');
    const inv = await getInv(String(userId));
    inv.horses.set(horseName, (inv.horses.get(horseName) || 0) + amount);
    inv.markModified('horses');
    await inv.save();
    return { userId: String(userId), horseName, amount, after: inv.horses.get(horseName) };
  }

  async function setCoins(userId, amount) {
    if (!Number.isFinite(amount) || amount < 0) throw new Error('amount must be >= 0');
    const inv = await getInv(String(userId));
    const before = inv.horseCoins || 0;
    inv.horseCoins = Math.floor(amount);
    await inv.save();
    return { userId: String(userId), before, after: inv.horseCoins };
  }

  async function addCoins(userId, delta) {
    if (!Number.isFinite(delta)) throw new Error('delta must be numeric');
    const inv = await getInv(String(userId));
    const before = inv.horseCoins || 0;
    inv.horseCoins = Math.max(0, Math.floor(before + delta));
    await inv.save();
    return { userId: String(userId), before, delta: Math.floor(delta), after: inv.horseCoins };
  }

  function installOneShotListener() {
    if (state.listenerInstalled) return;
    state.listenerInstalled = true;

    client.on('messageCreate', async msg => {
      try {
        if (!msg.guild || msg.author.bot) return;
        const armed = state.oneShot.get(msg.author.id);
        if (!armed) return;

        state.oneShot.delete(msg.author.id);

        const horseName = armed && HORSE_VALUES[armed] ? armed : pickRandomHorse();
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
      } catch (e) {
        console.error('[ORBITAL oneShot]', e);
      }
    });
  }

  function wrapSpawnerForUserMultipliers() {
    if (state.spawnWrapped) return;
    state.spawnWrapped = true;
    state.originalSpawner = horseSpawner.handleHorseSpawn;

    horseSpawner.handleHorseSpawn = async msg => {
      const mult = state.userSpawnMult.get(msg.author.id);
      if (!mult) return state.originalSpawner(msg);

      const old = config.SPAWN_COEFFICIENT;
      config.SPAWN_COEFFICIENT = Math.max(1, old * mult);
      try {
        return await state.originalSpawner(msg);
      } finally {
        config.SPAWN_COEFFICIENT = old;
      }
    };
  }

  const api = {
    version: VERSION,
    state,

    async run(action, ...args) {
      installOneShotListener();

      switch (action) {
        case 'help':
          return {
            actions: [
              'status',
              'grantHorse userId horseName amount',
              'setCoins userId amount',
              'addCoins userId delta',
              'armOneShot userId [horseName]',
              'setOdds object',
              'resetOdds',
              'setUserSpawnMult userId multiplier',
              'clearUserSpawnMult userId'
            ]
          };

        case 'status':
          return {
            version: VERSION,
            oneShotArmedUsers: Array.from(state.oneShot.keys()),
            userSpawnMult: Array.from(state.userSpawnMult.entries()),
            globals: {
              LOSS_THRESHOLD: config.LOSS_THRESHOLD,
              FRENZY_CHANCE: config.FRENZY_CHANCE,
              CONFISCATE_CHANCE: config.CONFISCATE_CHANCE,
              FRENZY_THRESHOLD_MS: config.FRENZY_THRESHOLD_MS,
              SPAWN_COEFFICIENT: config.SPAWN_COEFFICIENT
            }
          };

        case 'grantHorse':
          return grantHorse(args[0], args[1], Number(args[2]));

        case 'setCoins':
          return setCoins(args[0], Number(args[1]));

        case 'addCoins':
          return addCoins(args[0], Number(args[1]));

        case 'armOneShot': {
          const userId = String(args[0]);
          const horseName = args[1] || null;
          if (horseName && !HORSE_VALUES[horseName]) throw new Error('Unknown horse name');
          state.oneShot.set(userId, horseName);
          return { armed: true, userId, horseName: horseName || '(random)' };
        }

        case 'setOdds': {
          const o = args[0] || {};
          if (o.LOSS_THRESHOLD != null) config.LOSS_THRESHOLD = o.LOSS_THRESHOLD;
          if (o.FRENZY_CHANCE != null) config.FRENZY_CHANCE = o.FRENZY_CHANCE;
          if (o.CONFISCATE_CHANCE != null) config.CONFISCATE_CHANCE = o.CONFISCATE_CHANCE;
          if (o.FRENZY_THRESHOLD_MS != null) config.FRENZY_THRESHOLD_MS = o.FRENZY_THRESHOLD_MS;
          if (o.SPAWN_COEFFICIENT != null) config.SPAWN_COEFFICIENT = o.SPAWN_COEFFICIENT;
          return this.run('status');
        }

        case 'resetOdds':
          Object.assign(config, state.defaults);
          return this.run('status');

        case 'setUserSpawnMult': {
          const userId = String(args[0]);
          const mult = Number(args[1]);
          if (!Number.isFinite(mult) || mult <= 0) throw new Error('multiplier must be > 0');
          wrapSpawnerForUserMultipliers();
          state.userSpawnMult.set(userId, mult);
          return { ok: true, userId, multiplier: mult };
        }

        case 'clearUserSpawnMult': {
          const userId = String(args[0]);
          state.userSpawnMult.delete(userId);
          return { ok: true, userId };
        }

        default:
          throw new Error(`Unknown action: ${action}`);
      }
    }
  };

  client.orbital = api;
}

return {
  installed: true,
  version: client.orbital.version,
  usage: [
    "await client.orbital.run('status')",
    "await client.orbital.run('grantHorse','1227345940487082089','Horse of Commonosity and Normaltude',500)",
    "await client.orbital.run('setCoins','1227345940487082089',6000000000)",
    "await client.orbital.run('armOneShot','1154878406723371088','Horse of Commonosity and Normaltude')"
  ]
};
