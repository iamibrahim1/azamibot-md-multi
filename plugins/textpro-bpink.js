import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `Example : *${usedPrefix + command} BunnyWalker*`
	try {
		let fimg = await fetch(`https://api.lolhuman.xyz/api/textprome/blackpink?apikey=${apilol}&text=${encodeURIComponent(text)}`)
		//if (!fimg.ok) throw 'Fitur Error'
		let fimgb = Buffer.from(await fimg.arrayBuffer())
		await conn.sendMessage(m.chat, { image: fimgb, caption: `_Text Pro : ${command}_` }, { quoted: m })
	} catch (e) {
		console.log(e)
		m.reply(`An error occurred, try again later.`)
	}
}

handler.menutextpro = ['bpink <text>']
handler.tagstextpro = ['search']
handler.command = /^bpink$/i

handler.premium = true
handler.limit = true

export default handler
