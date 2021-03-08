// Config
const key = "";
const port = 19213;

const botToken = '';

// Express
const express = require('express')
const app = express()

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
	//botC = new Confess.Confessionnal(db, client, app, key);
	botR = new RandomAsk.RandomAsk(client, app);
	botM = new Memes.Memes(client, app);
});

client.login(botToken);