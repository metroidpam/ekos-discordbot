// config
const port = 19213;
const key = "";

const channelId = '';
const botToken = '';

// Logs
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ messages: [], finalPhrases: []})
	.write()

// Express
const express = require('express')
const app = express()

app.get('/api/discordbot/:1', (req, res) => {
	if(req.params.length !== 0 && req.params[1] == key) {
		res.send(db.get('messages').value())
	} else {
		res.sendStatus(403);
	}
})

app.listen(port, () => {
	console.log(`Server ouvert port : ${port}`)
})

// Bot
const Discord = require('discord.js');
const client = new Discord.Client();

const responsePhrase = "Merci de t'être confessé mon enfant !";
const finalPhrase = db.get('finalPhrases').value();

client.on('ready', () => {
  	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if(msg.channel.type == "dm" && msg.author.id !== client.user.id) {
		if(msg.attachments.array().length == 0 && msg.content.length !== 0) {
			client.channels.cache.get(channelId).send(customise(msg.content))
			db.get('messages').push({user:msg.author.username, id:msg.author.id, msg:msg.content}).write();
			msg.reply(responsePhrase);
		} else {
			msg.reply("Votre message ne dois pas contenir d'image ou de média.")
		}	
	}
});

function customise(msg) {
	return "```" + msg + "```" + finalPhrase[Math.floor(Math.random()*finalPhrase.length)];
}

client.login(botToken);
