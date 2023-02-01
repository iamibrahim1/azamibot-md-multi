import { aksaraToLatin } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Change Javanese script to Latin\n\nExample:\n*${usedPrefix + command} ꦲꦭ꧀ꦭꦺꦴ​ꦫꦺꦏ꧀*`
	try {
		let anu = await aksaraToLatin(`${text}`)
		m.reply(`*Result :*\n${anu}`)
	} catch (e) {
		console.log(e)
		m.reply(`An error occurred, try again later.`)
	}
}

handler.help = ['tolatin <teks>']
handler.tags = ['tools']
handler.command = /^((aksara)?tolatin)$/i

export default handler
