import {Client, MessageEmbed, Message, Collection} from 'discord.js'
import {keepAlive} from './server.js'
import fs from 'fs'
import dotenv from 'dotenv'

const {BOT_PREFIX, DISCORD_TOKEN} = process.env;
const client = new Client()

keepAlive()

client.once('ready', () => {
  console.log('app ready');
  client.user.setActivity('hang out with me', { type: 'JUST CHILLIN' });
});

client.on('message', async message => {
  if (message.content.startsWith("!tts")) {
    if (message.member.roles.cache.some(role => role.name === 'admin')) {
        message.delete();
        let msgtosend = message.content.substring(4, message.content.length);
        message.channel.send(msgtosend, { tts: true} );
    } else {
        message.delete();
        message.channel.send(`${message.member} only admins troll tts`, {tts: true});
    }
}
})

client.login(DISCORD_TOKEN);