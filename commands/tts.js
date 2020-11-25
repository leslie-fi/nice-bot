export const execute = async (client, message, args) => {
  if (message.member.roles.cache.some(role => role.name === 'master')) {
    await message.delete(5000);
    let msgtosend = args[0]
    // message.content.substring(4, message.content.length);
    await message.channel.send(msgtosend, { tts: true} );
} else {
    await message.delete(6000);
    await message.channel.send(`${message.member} only admins troll tts`, {tts: true});
}
}
export const help = {
  name: 'tts',
  description: '',
  aliases: [],
  usage: ''
}