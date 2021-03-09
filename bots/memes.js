const schedule = require('node-schedule');
const channelId = '808627297820999760';

class Memes {
    constructor(client, express) {
        const low = require('lowdb')
        const FileSync = require('lowdb/adapters/FileSync')
        const adapter = new FileSync('data/memes.json')
        const db = low(adapter)

        db.defaults({ memes: []}).write()
        
        schedule.scheduleJob('0 17 * * *', () => { randomSend(db, client) })
    }
}

function randomSend(db, client) {
    let memes = [...db.get('memes').filter({sent: false}).value()];
    let toSend = memes[Object.keys(memes)[Math.floor(Math.random()*memes.length)]];
    db.get('memes').find({link:toSend.link}).assign({sent:true}).write();
	client.channels.cache.get(channelId).send(`${toSend.title} : \n${toSend.link}`)
}

module.exports = {Memes}
