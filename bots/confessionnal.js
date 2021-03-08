const channelId = '808689140601323561';

class Confessionnal {
    constructor(client, express, key) {
        const low = require('lowdb')
        const FileSync = require('lowdb/adapters/FileSync')

        const adapter = new FileSync('data/confessionnal.json')
        const db = low(adapter)

        db.defaults({ messages: [], finalPhrases: []})
	        .write()

        const responsePhrase = "Merci de t'être confessé mon enfant !";
        const finalPhrase = db.get('finalPhrases').value();

        express.get('/api/discordbot/:1/logs', (req, res) => {
            if(req.params.length !== 0 && req.params[1] == key) {
                res.send(db.get('messages').value())
            } else {
                res.sendStatus(403);
            }
        })
        
        express.get('/api/discordbot/:1/finalPhrases', (req, res) => {
            if(req.params.length !== 0 && req.params[1] == key) {
                res.send(db.get('finalPhrases').value())
            } else {
                res.sendStatus(403);
            }
        })

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
    }
}

module.exports = {Confessionnal}