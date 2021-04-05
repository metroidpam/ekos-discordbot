// Config
const key = "";
const port = 0;

const botToken = '';

// Express
const express = require('express')
const app = express()

app.use('/api', express.static('public'))

app.get('/api/:1/bots', (req, res) => {
	if(req.params.length !== 0 && req.params[1] == key) {
		res.send(JSON.stringify({"confessionnal":["logs", "finalPhrases"], "random":["logs", "questions"]}))
	} else {
		res.sendStatus(403)
	}
})

app.listen(port, () => {
	console.log(`Server ouvert port : ${port}`)
})

// Bot
const Discord = require('discord.js');
const client = new Discord.Client();

const Confess = require('./bots/confessionnal.js');
const RandomAsk = require('./bots/random.js');
const Memes = require('./bots/memes.js')
let botC, botR, botM;


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	botC = new Confess.Confessionnal(client, app, key);
	botR = new RandomAsk.RandomAsk(client, app, key);
	botM = new Memes.Memes(client, app);
});

client.login(botToken);