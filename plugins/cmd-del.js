import db from '../lib/database.js'

let handler = async (m, { text }) => {
	let hash = text
	if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
	if (!hash) throw `Tidak ada hash`
	let sticker = db.data.sticker
	if (sticker[hash] && sticker[hash].locked) throw 'You do not have permission to remove this sticker prompt'
	delete sticker[hash]
	m.reply(`Berhasil!`)
}


handler.menuowner = ['cmddel <teks>']
handler.tagsowner = ['owner']
handler.command = /^(delcmd|cmddel)$/i

handler.owner = true

export default handler
