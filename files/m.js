const UserHorses = require('mongoose').model('UserHorses');
const HORSE_VALUES = require('../../horses.json');
const { config } = require('../config');

// Store oneshot spawns in client
if (!client.oneshotSpawns) client.oneshotSpawns = new Map();

const tools = {
    // CLEAR OPERATIONS
    clear: {
        user: async (userId) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) return `No inventory for <@${userId}>`;
            for (const [name] of inv.horses.entries()) inv.horses.set(name, 0);
            inv.horseCoins = 0;
            await inv.save();
            return `✅ Cleared all data for <@${userId}>`;
        },
        coins: async (userId) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) inv = new UserHorses({ userId, horses: new Map() });
            inv.horseCoins = 0;
            await inv.save();
            return `✅ Cleared coins for <@${userId}>`;
        },
        horse: async (userId, horseName) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) return `No inventory for <@${userId}>`;
            const count = inv.horses.get(horseName) || 0;
            inv.horses.set(horseName, 0);
            await inv.save();
            return `✅ Removed ${count}x ${horseName} from <@${userId}>`;
        }
    },

    // COIN OPERATIONS
    coins: {
        set: async (userId, amount) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) inv = new UserHorses({ userId, horses: new Map() });
            inv.horseCoins = amount;
            await inv.save();
            return `✅ Set ${amount} coins for <@${userId}>`;
        },
        add: async (userId, amount) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) inv = new UserHorses({ userId, horses: new Map() });
            inv.horseCoins = (inv.horseCoins || 0) + amount;
            await inv.save();
            return `✅ Added ${amount} coins to <@${userId}> (now ${inv.horseCoins})`;
        },
        get: async (userId) => {
            let inv = await UserHorses.findOne({ userId });
            const coins = inv?.horseCoins || 0;
            return `<@${userId}> has ${coins} coins`;
        }
    },

    // HORSE OPERATIONS
    horses: {
        set: async (userId, horseName, count) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) inv = new UserHorses({ userId, horses: new Map() });
            inv.horses.set(horseName, count);
            await inv.save();
            return `✅ Set ${count}x ${horseName} for <@${userId}>`;
        },
        add: async (userId, horseName, count) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) inv = new UserHorses({ userId, horses: new Map() });
            const current = inv.horses.get(horseName) || 0;
            inv.horses.set(horseName, current + count);
            await inv.save();
            return `✅ Added ${count}x ${horseName} to <@${userId}> (now ${current + count})`;
        },
        get: async (userId) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv || !inv.horses) return `No horses for <@${userId}>`;
            let msg = `<@${userId}>'s horses:\n`;
            for (const [name, count] of inv.horses.entries()) {
                if (count > 0) msg += `• ${name} x${count}\n`;
            }
            return msg;
        }
    },

    // CONFIG OPERATIONS
    config: {
        get: (key) => `${key}: ${config[key]}`,
        set: (key, value) => {
            const parsed = isNaN(value) ? (value === 'Infinity' ? Infinity : value) : Number(value);
            config[key] = parsed;
            return `✅ Set ${key} = ${parsed}`;
        },
        frenzy: (chance, threshold) => {
            config.FRENZY_CHANCE = chance;
            config.FRENZY_THRESHOLD_MS = threshold;
            return `✅ Frenzy: chance=${chance}, threshold=${threshold}ms`;
        },
        spawning: (debounce, similarity, coinChance, spawnCoef) => {
            config.DEBOUNCE_MS = debounce;
            config.SIMILARITY_THRESHOLD = similarity;
            config.COIN_CHANCE = coinChance;
            config.SPAWN_COEFFICIENT = spawnCoef;
            return `✅ Spawning updated`;
        }
    },

    // ONESHOT SPAWN - triggers horse spawn on user's next message
    oneshot: {
        set: (userId, horseName = null) => {
            client.oneshotSpawns.set(userId, {
                userId,
                horseName,
                createdAt: Date.now()
            });
            const msg = horseName ? `${horseName}` : `random horse`;
            return `✅ Oneshot spawn set for <@${userId}>: ${msg}`;
        },
        clear: (userId) => {
            client.oneshotSpawns.delete(userId);
            return `✅ Cleared oneshot for <@${userId}>`;
        },
        list: () => {
            if (client.oneshotSpawns.size === 0) return 'No oneshots set';
            let msg = `Active oneshots:\n`;
            for (const [userId, data] of client.oneshotSpawns.entries()) {
                msg += `<@${userId}> → ${data.horseName || 'random'}\n`;
            }
            return msg;
        }
    },

    // UTILITIES
    stats: async () => {
        const count = await UserHorses.countDocuments();
        const withCoins = await UserHorses.countDocuments({ horseCoins: { $gt: 0 } });
        return `📊 Total users: ${count}, With coins: ${withCoins}`;
    }
};

// Store tools in client for use in other scripts
client.orbitalTools = tools;

// Show usage
let usage = `✅ Orbital Tools initialized!\n\n**Usage:** console.log(await client.orbitalTools.COMMAND)\n\n`;
usage += `**Clear:** tools.clear.user(id) | .coins(id) | .horse(id, name)\n`;
usage += `**Coins:** tools.coins.set(id, amt) | .add(id, amt) | .get(id)\n`;
usage += `**Horses:** tools.horses.set(id, name, cnt) | .add(id, name, cnt) | .get(id)\n`;
usage += `**Config:** tools.config.set(key, val) | .frenzy(ch, th) | .spawning(d,s,c,coef)\n`;
usage += `**Oneshot:** tools.oneshot.set(id, horse?) | .clear(id) | .list()\n`;

await interaction.reply(usage);
