import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if ((/image/g.test(mime) && !/webp/g.test(mime)) || q.message?.imageMessage) {
		let img = await q.download?.()
		let out = await uploadImage(img)
		let res = await fetch(`https://api.lolhuman.xyz/api/wmit?apikey=${apilol}&img=${out}`)
		if (!res.ok) throw await `Fitur Error!`
		let json = await res.json()
		if (json.status != '200') throw `Fitur Error!`
		if (json.result.length == 0) throw `Failed to detect, try to source the image from the manga page.`
		let get_result = json.result
		let ini_txt = `*RESULT :*`
		for (var x of get_result) {
			ini_txt += `\n\n*Title : ${x.title}*\n`
			ini_txt += `*Part :* ${x.part}\n`
			ini_txt += `*Url :*\n`
			for (var y of x.urls) {
				ini_txt += `*-* ${y}\n`
			}
			ini_txt += `*Similarity : ${x.similarity}%*\n`
			ini_txt += `───────────────────`
		}
		m.reply(ini_txt)
	} else {
		m.reply(`Send pictures with captions *${usedPrefix + command}* or image tags that have already been submitted`)
	}
}

handler.menuanime = ['wmit']
handler.tagsanime = ['search']
handler.command = /^wmit|(whatmanga)$/i

handler.premium = true
handler.limit = true

export default handler
