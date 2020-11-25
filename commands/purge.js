import Discord from 'discord.js'
export const execute = async (client, message, args = [100]) => {
  let amount = args[0] ? +args[0] : 100
  console.log({amount})
  try {
   if (message.deletable) message.delete()

   if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('Hold Your Horses! You do not have permission to use this command!')
     
    if (isNaN(amount)) return message.channel.send('**You did not include an ammount of messages to purge!**');
    if (amount > 100) return message.channel.send('**I cannot delete more than 100 messages at a time!**')
  
    const fetched = await message.channel.messages.fetch({
      limit: amount++
  });
  message.channel.bulkDelete(fetched);
  message.channel.send(`**Deleted \`${amount}\` messages.**`).then(msg => msg.delete({ timeout: 5000 }))
    
        } catch(error) { 
  message.channel.send(`**Uh Oh! I couldnt delete messages because of:\n ${error}`)
};
  
  console.log(error)
      }
    
    

export const help = {
  name: 'purge',
  aliases: ['dump', 'rm', 'delete', 'd'],
  description: 'Purge and Delete up to 99 messages.',
  usage: '!purge <%number>'
}