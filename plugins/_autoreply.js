import { pickRandom } from '../lib/others.js'

const bot = ['what's wrong bro?','what's the matter','what dear','don't surprise me','yes','why','what a fool','I'll mark your face','no , this is Patrick','you weren't invited','I'm just too lazy','holding in my emotions','lazy','can anyone help?','signal test again huh?','always beside you','always with you']
const ping = ['use the prefix', 'correct command','not correct','example: .ping','use a trial point','what do you try','response speed = light speed','yahaha crashes' ,'use point\n\n.ping like that','its time to pay for wifi','your quota is dying','Ping : 0 miliseconds','fight .testspeed?']

export async function before(m) {
	if (!m.isGroup) return !1
	if (m.text.toLowerCase() == 'bot') await this.sendMessage(m.chat, { text: pickRandom(bot) }, { quoted: fliveLoc2 })
	if (m.text.toLowerCase() == 'ping') await this.sendMessage(m.chat, { text: pickRandom(ping) }, { quoted: fliveLoc2 })
	return !0
}
