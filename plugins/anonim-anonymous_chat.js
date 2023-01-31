async function handler(m, { command }) {
	this.anonymous = this.anonymous ? this.anonymous : {}
	switch (command) {
		case 'next':
		case 'leave': {
			let room = Object.values(this.anonymous).find(room => room.check(m.sender))
			if (!room) return this.sendButton(m.chat, '_You are not in anonymous chat_', pauthor, null, [['Find Partners', `.start`]], m)
			m.reply('Ok')
			let other = room.other(m.sender)
			if (other) await this.sendButton(other, '_Partner left the chat_', pauthor, null, [['v', `.start`]], m)
			delete this.anonymous[room.id]
			if (command === 'leave') break
		}
		case 'start': {
			if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.sendButton(m.chat, '_You are still in anonymous chat, waiting for a partner_', pauthor, null, [['Leave', `.leave`]], m)
			let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
			if (room) {
				await this.sendButton(room.a, '_Partner found!_', pauthor, null, [['Next', `.next`]], m)
				room.b = m.sender
				room.state = 'CHATTING'
				await this.sendButton(room.b, '_Partner found!_', pauthor, null, [['Next', `.next`]], m)
			} else {
				let id = + new Date
				this.anonymous[id] = {
					id,
					a: m.sender,
					b: '',
					state: 'WAITING',
					check: function (who = '') {
						return [this.a, this.b].includes(who)
					},
					other: function (who = '') {
						return who === this.a ? this.b : who === this.b ? this.a : ''
					},
				}
				await this.sendButton(m.chat, '_Waiting for partners..._', pauthor, null, [['Leave', `.leave`]], m)
			}
			break
		}
	}
}

handler.menufun = ['start', 'leave', 'next']
handler.tagsfun = ['anonim']
handler.command = ['start', 'leave', 'next']

handler.private = true

export default handler
