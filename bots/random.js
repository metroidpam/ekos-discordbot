const schedule = require('node-schedule');
const serverId = '808622535259848734';
const channelId = '818388541675143168'

class RandomAsk {
    constructor(client, express) {
		const low = require('lowdb')
		const FileSync = require('lowdb/adapters/FileSync')

		const adapter = new FileSync('data/random.json')
		const db = low(adapter)

		db.defaults({questions:[] ,usersAsked: []})
			.write()
        schedule.scheduleJob('0 10 * * *', () => { randomAsk(db, client) })
    }
}

async function randomAsk(db, client) {
	let u = await randomUser(db, client);
	let q = await randomQuestion(db);
	let x = {pseudo: u.username, id: u.id, question: q};
	if(db.get('usersAsked').size().value() >= 10) {
		db.get('usersAsked').remove({id:db.get('usersAsked[0].id').value()}).write();
	}
	db.get('usersAsked').push(x).write();
	let msg = `Question pour <@${x.id}>  : \n> ${q}`;
	client.channels.cache.get(channelId).send(msg)
}

function randomUser(db, client) {
    return new Promise(resolve => {
		let c = client.guilds.cache.get(serverId);
		c.members.fetch().then(x => {
        	let alreadyAsked = db.get('usersAsked').value();
			let list = [...x.filter(member => !member.presence.user.bot && alreadyAsked.find(x => x.id == member.user.id) == null)];
			let toAsk = list[Object.keys(list)[Math.floor(Math.random()*list.length)]][1].user
			resolve(toAsk)
		})
	})
}

function randomQuestion(db) {
	return new Promise(resolve => {
		let alreadyAsked = db.get('usersAsked').value();
		let questions = db.get('questions').value();
		let list = [...questions.filter(question => alreadyAsked.find(x => x.question == question) == null)];
		let toAsk = list[Object.keys(list)[Math.floor(Math.random()*list.length)]]
		resolve(toAsk)
	})
}

module.exports = {RandomAsk}