import axios from 'axios';

export const help =   {
  name: 'random wikihow',
 description: 'Redirection to a random wikihow',
    usage: '',
    aliases: ['wikihow', 'wh'],
}    
export const execute = (client, message, args) => {
        axios.get('https://wikihow.com/Sp%C3%A9cial:Randomizer')
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                let startPos = html.indexOf('<h1 id="section_0" ');
                let endPos = html.indexOf(">C", startPos) + 5;
                let url = html.substring(startPos+45, endPos-6)
                console.log(html)
                message.channel.send(response)
            }
        })
        .catch((err) => {
            console.error(err);
    });


   }
