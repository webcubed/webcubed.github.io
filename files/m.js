const { MessageFlags } = require('discord.js');
const UserHorses = require('mongoose').model('UserHorses');
const HORSE_VALUES = require('../../horses.json');
const { config } = require('../config');

async function eReply(interaction, content) {
    const payload = {
        content: String(content).slice(0, 1990),
        flags: [MessageFlags.Ephemeral],
        allowedMentions: { parse: [] }
    };

    if (interaction.replied || interaction.deferred) {
        return interaction.followUp(payload);
    }
    return interaction.reply(payload);
}

if (!client.oneshotSpawns) client.oneshotSpawns = new Map();

const tools = {
    clear: {
        user: async (userId) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) return `No inventory for <@${userId}>`;
            for (const [name] of inv.horses.entries()) inv.horses.set(name, 0);
            inv.horseCoins = 0;
            await inv.save();
            return `Cleared all data for <@${userId}>`;
        },
        coins: async (userId) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) inv = new UserHorses({ userId, horses: new Map() });
            inv.horseCoins = 0;
            await inv.save();
            return `Cleared coins for <@${userId}>`;
        },
        horse: async (userId, horseName) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) return `No inventory for <@${userId}>`;
            const count = inv.horses.get(horseName) || 0;
            inv.horses.set(horseName, 0);
            await inv.save();
            return `Removed ${count}x ${horseName} from <@${userId}>`;
        }
    },

    coins: {
        set: async (userId, amount) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) inv = new UserHorses({ userId, horses: new Map() });
            inv.horseCoins = amount;
            await inv.save();
            return `Set ${amount} coins for <@${userId}>`;
        },
        add: async (userId, amount) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) inv = new UserHorses({ userId, horses: new Map() });
            inv.horseCoins = (inv.horseCoins || 0) + amount;
            await inv.save();
            return `Added ${amount} coins to <@${userId}> (now ${inv.horseCoins})`;
        },
        get: async (userId) => {
            const inv = await UserHorses.findOne({ userId });
            return `<@${userId}> has ${inv?.horseCoins || 0} coins`;
        }
    },

    horses: {
        set: async (userId, horseName, count) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) inv = new UserHorses({ userId, horses: new Map() });
            inv.horses.set(horseName, count);
            await inv.save();
            return `Set ${count}x ${horseName} for <@${userId}>`;
        },
        add: async (userId, horseName, count) => {
            let inv = await UserHorses.findOne({ userId });
            if (!inv) inv = new UserHorses({ userId, horses: new Map() });
            const current = inv.horses.get(horseName) || 0;
            inv.horses.set(horseName, current + count);
            await inv.save();
            return `Added ${count}x ${horseName} to <@${userId}> (now ${current + count})`;
        },
        get: async (userId) => {
            const inv = await UserHorses.findOne({ userId });
            if (!inv || !inv.horses) return `No horses for <@${userId}>`;
            const lines = [];
            for (const [name, count] of inv.horses.entries()) if (count > 0) lines.push(`- ${name} x${count}`);
            return lines.length ? `<@${userId}> horses:\n${lines.join('\n')}` : `<@${userId}> has no horses`;
        }
    },

    config: {
        get: (key) => `${key}: ${config[key]}`,
        set: (key, value) => {
            const parsed = value === 'Infinity' ? Infinity : (Number.isNaN(Number(value)) ? value : Number(value));
            config[key] = parsed;
            return `Set ${key} = ${parsed}`;
        }
    },

    oneshot: {
        set: (userId, horseName = null) => {
            client.oneshotSpawns.set(userId, { userId, horseName, createdAt: Date.now() });
            return `Oneshot set for <@${userId}>: ${horseName || 'random'}`;
        },
        clear: (userId) => {
            client.oneshotSpawns.delete(userId);
            return `Oneshot cleared for <@${userId}>`;
        },
        list: () => {
            if (!client.oneshotSpawns.size) return 'No oneshots set';
            return [...client.oneshotSpawns.entries()]
                .map(([uid, d]) => `<@${uid}> -> ${d.horseName || 'random'}`)
                .join('\n');
        }
    }
};

client.orbitalTools = tools;

// helper: always ephemeral when running a tool
client.orbitalRun = async (fn) => {
    try {
        const out = await fn(tools);
        return eReply(interaction, `OK\n${out ?? '(no output)'}`);
    } catch (e) {
        return eReply(interaction, `ERR\n${e?.stack || e}`);
    }
};

await eReply(
    interaction,
    'Orbital tools loaded.\nUse: await client.orbitalRun(async t => t.coins.set("USER_ID", 1000))'
);
