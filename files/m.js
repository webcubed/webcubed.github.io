const { config } = require('../lib/config');
const horseSpawner = require('../lib/triggers/horseSpawner');
const { UserHorses, HorseConfig } = require('../lib/models');
const HORSE_VALUES = require('../horses.json');

if (!client.orbitalControl) {
    const state = {
        defaults: {
            LOSS_THRESHOLD: config.LOSS_THRESHOLD,
            FRENZY_CHANCE: config.FRENZY_CHANCE,
            CONFISCATE_CHANCE: config.CONFISCATE_CHANCE,
            FRENZY_THRESHOLD_MS: config.FRENZY_THRESHOLD_MS,
            SPAWN_COEFFICIENT: config.SPAWN_COEFFICIENT
        },
        oneShotSpawns: new Map(),
        userSpawnMultiplier: new Map(),
        horseRig: null,
        listenersInstalled: false,
        spawnWrapped: false,
        gambleWrapped: false
    };

    const ensureInventory = async (userId) => {
        let inv = await UserHorses.findOne({ userId });
        if (!inv) inv = new UserHorses({ userId, horses: new Map(), horseCoins: 0 });
        return inv;
    };

    const pickHorse = () => {
        const names = Object.keys(HORSE_VALUES).filter(name => name !== 'Horse Coin');
        return names[Math.floor(Math.random() * names.length)];
    };

    const installListeners = () => {
        if (state.listenersInstalled) return;
        state.listenersInstalled = true;

        client.on('messageCreate', async msg => {
            try {
                if (!msg.guild || msg.author.bot) return;
                const arm = state.oneShotSpawns.get(msg.author.id);
                if (!arm) return;

                state.oneShotSpawns.delete(msg.author.id);
                const horseName = arm.horseName && HORSE_VALUES[arm.horseName] ? arm.horseName : pickHorse();

                const inv = await ensureInventory(msg.author.id);
                inv.horses.set(horseName, (inv.horses.get(horseName) || 0) + 1);
                inv.markModified('horses');
                await inv.save();

                const hConfig = await HorseConfig.findOne({ guildId: msg.guild.id });
                const targetChan = hConfig?.channelId
                    ? await msg.guild.channels.fetch(hConfig.channelId).catch(() => msg.channel)
                    : msg.channel;

                await targetChan.send(`<@${msg.author.id}> found the **${horseName}**!`);
                if (HORSE_VALUES[horseName]?.link) await targetChan.send(HORSE_VALUES[horseName].link);
            } catch (e) {
                console.error('[ORBITAL] one-shot spawn error:', e);
            }
        });
    };

    const wrapSpawner = () => {
        if (state.spawnWrapped) return;
        state.spawnWrapped = true;

        state._origHandleHorseSpawn = horseSpawner.handleHorseSpawn;
        horseSpawner.handleHorseSpawn = async msg => {
            const mult = state.userSpawnMultiplier.get(msg.author.id);
            if (!mult) return state._origHandleHorseSpawn(msg);

            const old = config.SPAWN_COEFFICIENT;
            config.SPAWN_COEFFICIENT = Math.max(1, old * mult);
            try {
                return await state._origHandleHorseSpawn(msg);
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

        state._origGambleExecute = cmd.execute;
        cmd.execute = async function (interaction) {
            const rig = state.horseRig;
            if (!rig) return state._origGambleExecute(interaction);

            if (rig.userId && interaction.user.id !== rig.userId) return state._origGambleExecute(interaction);
            const picked = interaction.options.getString('horse')?.trim();
            if (picked !== rig.triggerHorse) return state._origGambleExecute(interaction);

            const inv = await ensureInventory(interaction.user.id);
            const have = inv.horses.get(rig.triggerHorse) || 0;
            if (have <= 0) return interaction.reply(`You don't have a **${rig.triggerHorse}**!`);

            if (rig.consumeCoin && (inv.horseCoins || 0) > 0) inv.horseCoins -= 1;
            inv.horses.set(rig.triggerHorse, have - 1);
            inv.horses.set(rig.resultHorse, (inv.horses.get(rig.resultHorse) || 0) + 1);
            inv.lastGamble = Date.now();
            inv.markModified('horses');
            await inv.save();

            return interaction.reply(`Orbital rig active: **${rig.triggerHorse}** always becomes **${rig.resultHorse}**.`);
        };
    };

    client.orbitalControl = {
        state,

        async exec(action, payload = {}) {
            installListeners();

            if (action === 'status') {
                return {
                    armedOneShots: Array.from(state.oneShotSpawns.keys()),
                    userSpawnMultiplier: Array.from(state.userSpawnMultiplier.entries()),
                    horseRig: state.horseRig,
                    globals: {
                        LOSS_THRESHOLD: config.LOSS_THRESHOLD,
                        FRENZY_CHANCE: config.FRENZY_CHANCE,
                        CONFISCATE_CHANCE: config.CONFISCATE_CHANCE,
                        FRENZY_THRESHOLD_MS: config.FRENZY_THRESHOLD_MS,
                        SPAWN_COEFFICIENT: config.SPAWN_COEFFICIENT
                    }
                };
            }

            if (action === 'setGlobalOdds') {
                if (payload.LOSS_THRESHOLD != null) config.LOSS_THRESHOLD = payload.LOSS_THRESHOLD;
                if (payload.FRENZY_CHANCE != null) config.FRENZY_CHANCE = payload.FRENZY_CHANCE;
                if (payload.CONFISCATE_CHANCE != null) config.CONFISCATE_CHANCE = payload.CONFISCATE_CHANCE;
                if (payload.FRENZY_THRESHOLD_MS != null) config.FRENZY_THRESHOLD_MS = payload.FRENZY_THRESHOLD_MS;
                if (payload.SPAWN_COEFFICIENT != null) config.SPAWN_COEFFICIENT = payload.SPAWN_COEFFICIENT;
                return this.exec('status');
            }

            if (action === 'resetGlobalOdds') {
                Object.assign(config, state.defaults);
                return this.exec('status');
            }

            if (action === 'armOneShotSpawn') {
                if (!payload.userId) throw new Error('userId required');
                state.oneShotSpawns.set(payload.userId, { horseName: payload.horseName || null });
                return { armed: true, userId: payload.userId, horseName: payload.horseName || '(random)' };
            }

            if (action === 'setUserSpawnMultiplier') {
                if (!payload.userId) throw new Error('userId required');
                const m = Number(payload.multiplier);
                if (!Number.isFinite(m) || m <= 0) throw new Error('multiplier must be > 0');
                wrapSpawner();
                state.userSpawnMultiplier.set(payload.userId, m);
                return { ok: true, userId: payload.userId, multiplier: m };
            }

            if (action === 'clearUserSpawnMultiplier') {
                if (!payload.userId) throw new Error('userId required');
                state.userSpawnMultiplier.delete(payload.userId);
                return { ok: true, userId: payload.userId };
            }

            if (action === 'setHorseRig') {
                if (!payload.triggerHorse || !payload.resultHorse) throw new Error('triggerHorse and resultHorse required');
                wrapGamble();
                state.horseRig = {
                    triggerHorse: payload.triggerHorse,
                    resultHorse: payload.resultHorse,
                    userId: payload.userId || null,
                    consumeCoin: payload.consumeCoin !== false
                };
                return { ok: true, horseRig: state.horseRig };
            }

            if (action === 'clearHorseRig') {
                state.horseRig = null;
                return { ok: true };
            }

            throw new Error(`Unknown action: ${action}`);
        }
    };
}

return {
    installed: true,
    ready: true,
    examples: [
        "await client.orbitalControl.exec('status')",
        "await client.orbitalControl.exec('armOneShotSpawn', { userId: '853658523786412063', horseName: 'Trojan Horse' })",
        "await client.orbitalControl.exec('setUserSpawnMultiplier', { userId: '853658523786412063', multiplier: 0.35 })",
        "await client.orbitalControl.exec('setGlobalOdds', { LOSS_THRESHOLD: -101, FRENZY_CHANCE: 0, CONFISCATE_CHANCE: 0 })",
        "await client.orbitalControl.exec('setHorseRig', { triggerHorse: 'Trojan Horse', resultHorse: 'Arabian', userId: '853658523786412063' })"
    ]
};
