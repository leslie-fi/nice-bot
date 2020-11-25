import {Client, MessageEmbed, Message, Collection} from 'discord.js'
import {keepAlive} from './server.js'
import fs from 'fs'
import * as commandFiles from './commands/index.js'
import dotenv from 'dotenv'
dotenv.config()
const {BOT_PREFIX, DISCORD_TOKEN} = process.env;
const client = new Client()

keepAlive()


client.commands = new Collection();

console.log(typeof commandFiles)

for (const file in commandFiles) {
	client.commands.set(commandFiles[file].help.name, commandFiles[file]);
}

client.once('ready', () => {
  console.log('app ready');
  client.user.setActivity('hang out with me', { type: 'JUST CHILLIN' });
});

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  if (!message.content.toLowerCase().startsWith(BOT_PREFIX.toLowerCase())) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

  const args = message.content
  .trim().slice(BOT_PREFIX.length)
  .split(/ +/g);
  const commandName = args.shift().toLowerCase();
 
  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

  if (!command) return;


try {
  // const commandFile = require(`./commands/${command}.js`)
  await command.execute(client, message, args);
} catch (err) {
  console.error('Error:' + err);
}

})

client.login(DISCORD_TOKEN);

/* prevent the api server from crashing for unhandledRejections */
process.on('unhandledRejection', (reason, promise) => {
  console.error('----------------------------------------------------------------------------------------------------------------');
  console.error(`${new Date()}`);
  console.trace('unhandledRejection at:', reason?.stack ?? reason, promise);
  console.error('----------------------------------------------------------------------------------------------------------------');
});

/* prevent the api server from crashing for uncaughtExceptions */
process.on('uncaughtException', (error) => {
  console.error('----------------------------------------------------------------------------------------------------------------');
  console.error(`${new Date()}`);
  console.trace('uncaughtException at:', error);
  console.error('----------------------------------------------------------------------------------------------------------------');
});