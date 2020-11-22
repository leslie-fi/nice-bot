import express from 'express'
const server = express()
const PORT = 5000;
import dotenv from 'dotenv'
dotenv.config()
server.all('/', (req, res) => {
  res.send('Nice bot up & running')
})

export const keepAlive = () => server.listen(3000, () => console.log(`${process.env.DISCORD_TOKEN} BOT runnin @ http://localhost:${PORT}`));