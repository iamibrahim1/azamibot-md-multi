import fs from 'fs'
import * as emoji from 'emoji-api'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!args[0]) throw `Where's the emoji?\n\nExample : *${usedPrefix + command} 🤖*`
	let ztick = fs.readFileSync(`./media/sticker/bronya.webp`)
	try {
		let anu = args[1] ? await emoji.get(args[1]).twemoji() : await emoji.get(args[0]).twemoji()
		const sticker = new Sticker(anu, { pack: packname, author: author, type: StickerTypes.FULL })
		const buffer = await sticker.toBuffer()
		await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m)
	} catch (e) {
		console.log(e)
		await conn.sendFile(m.chat, ztick, 'sticker.webp', '', m)
	}
}

handler.help = ['semoji <emoji>']
handler.tags = ['searching']
handler.command = /^(s(tic?ker)?e?mojix?)$/i

handler.premium = true
handler.limit = true

export default handler
