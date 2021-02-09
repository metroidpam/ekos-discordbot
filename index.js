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

db.defaults({ messages: []})
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
const finalPhrase = [
	"Alors là, je suis choqué.",
	"Heureusement que c'est anonyme.",
	"C'est quand même la honte, je comprends que ce soit anonymes.",
	"T'inquiète personne ne va te juger.",
	"Ha ba d'accord si tu veux, on te juge pas hein.",
	"On va faire comme si on avait rien vu.",
	"Bon dit comme ça, ça change tout.",
	"Je sais que c'est anonyme, mais quand même, il y a des limites...",
	"Sheryfa Luna disait qu'il avait les mots, mais moi, je ne les ai plus devant cette confession.",
	"Du haut de mes lignes de code, je suis bouche-bée.",
	"Ptdr t ki ?",
	"Parfois j'aimerais être à votre place... Euh non, en fait non.",
	"On est dans le partage, mais ça, faut pas le partager.",
	"Cristina dirait que 'ça va pas di touuut ma chéwiiie !'",
	"L'oscar de la honte te revient, malheureusement",
	"OHHHH, MYYY, GOOODD (Janice tmtc)",
	"T'en as pas marre de me raconter ta vie ?",
	"Ohh mais y a pire, non ?",
	"Malgré ça, comme disait Renaud, t'as toujours la banane et t'es toujours debout."
]

client.on('ready', () => {
  	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if(msg.channel.type == "dm") {
		client.channels.cache.get(channelId).send(customise(msg.content))
		db.get('messages')
			.push({user:msg.author.username, id:msg.author.id, msg:msg.content})
			.write();
	}
});

function customise(msg) {
	return "```" + msg + "```" + finalPhrase[Math.floor(Math.random()*finalPhrase.length)];
}

client.login(botToken);