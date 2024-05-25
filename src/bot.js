// src/bot.js

const { Client, Intents } = require('discord.js');
const { prefix, token } = require('./config');
const warnCommand = require('./commands/warn');
const reportCommand = require('./commands/report');
const settingsCommand = require('./commands/settings');
const logCommand = require('./commands/log');
const logger = require('./utils/logger');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    logger.info('Bot is ready');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'warn') {
        warnCommand.execute(message, args);
    } else if (command === 'report') {
        reportCommand.execute(message, args);
    } else if (command === 'settings') {
        settingsCommand.execute(message, args);
    } else if (command === 'log') {
        logCommand.execute(message, args);
    }
});

client.login(token);