"use strict";
const { default: makeWASocket, BufferJSON, initInMemoryKeyStore, DisconnectReason, AnyMessageContent, useSingleFileAuthState, makeInMemoryStore, delay, downloadContentFromMessage, jidDecode, generateForwardMessageContent, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@adiwajshing/baileys")
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logg = require('pino')
const clui = require('clui')
const PhoneNumber = require('awesome-phonenumber')
const { Spinner } = clui
const knights = require('knights-canvas')

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif2')
const { serialize, getBuffer, makeid, sleep, reSize } = require("./lib/myfunc");
const { color, FadlyLog } = require("./lib/color");
const _sewa = require("./lib/sewa");
const { isSetWelcome, getTextSetWelcome } = require('./lib/setwelcome');
const { isSetLeft, getTextSetLeft } = require('./lib/setleft');

let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let left = JSON.parse(fs.readFileSync('./database/left.json'));
let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let opengc = JSON.parse(fs.readFileSync('./database/opengc.json'));
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));
let set_open = JSON.parse(fs.readFileSync('./database/set_open.json'));
let set_close = JSON.parse(fs.readFileSync('./database/set_close.json'));

const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')

let setting = JSON.parse(fs.readFileSync('./config.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)

function title() {
    console.log(chalk.bold.green(figlet.textSync(`${setting.botName}`, {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: false
    })))
    console.log(chalk.yellow(`\n${chalk.yellow('[ CREATED BY CodeN ID ]')}\n`))
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
    console.log(`Module ${module} sedang diperhatikan terhadap perubahan`)
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

const connectToWhatsApp = async () => {
    const conn = makeWASocket({
        printQRInTerminal: true,
        logger: logg({ level: 'fatal' }),
        browser: ['Trifty Group','chrome','1.0.0'],
        auth: state
    })
    title()
    store.bind(conn.ev)

    require('./message/help')
    require('./lib/myfunc')
    require('./message/tpgroup')
    nocache('./message/help', module => console.log(chalk.greenBright('[ UPDATED ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
    nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ UPDATED ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
    nocache('./message/tpgroup', module => console.log(chalk.greenBright('[ UPDATED ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))

    conn.multi = true
    conn.nopref = false
    conn.prefa = 'anjing'
    conn.spam = []
    conn.mode = 'public'

    conn.ev.on('messages.upsert', async m => {
        var msg = m.messages[0]
        if (!m.messages) return;
        // msg.message = (Object.keys(msg.message)[0] == "ephemeralMessage") ? msg.message.ephemeralMessage.message : msg.message
        if (msg.key && msg.key.remoteJid == "status@broadcast") return
        msg = serialize(conn, msg)
        msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
        require('./message/tpgroup')(conn, msg, m, setting, store, welcome, left, set_welcome_db, set_left_db, db_respon_list, sewa, opengc, set_proses, set_done, set_open, set_close)
    })

    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            status.stop()
            reconnect.stop()
            starting.stop()
            console.log(FadlyLog('Connect, Welcome Owner'))
            lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
            ? connectToWhatsApp() 
            : console.log(FadlyLog('Connection Lost...'))
        }
    })

    conn.ev.on('group-participants.update', async (data) => {
        const isWelcome = welcome.includes(data.id) ? true : false
        const isLeft = left.includes(data.id) ? true : false
        const metadata = await conn.groupMetadata(data.id)
        const groupName = metadata.subject
        const groupDesc = metadata.desc
        try {
            for (let i of data.participants) {
                try {
                    var pp_user = await conn.profilePictureUrl(i, 'image')
                } catch {
                    var pp_user = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                try {
                    var pp_grup = await conn.profilePictureUrl(data.id, 'image')
                } catch {
                    var pp_grup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                var fexec =  { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(data.id ? { remoteJid: `6285156443023-1614953337@g.us` } : {}) }, message: { "extendedTextMessage": { "text": `${groupName}`, "title": `Hmm`, 'jpegThumbnail': await reSize(pp_grup, 200, 200, []) }}}
                var bupper = await reSize(pp_user, 300, 300, [])
                if (data.action == "add" && isWelcome) {
                    var image = await new knights.Welcome()
                    .setUsername(await conn.getName(i))
                    .setGuildName(groupName)
                    .setGuildIcon(pp_grup)
                    .setMemberCount(metadata.participants.length)
                    .setAvatar(pp_user)
                    .setBackground("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq0uJnQO5Cz3pZUXXbO9BofUL6kiXDyGZU5w&usqp=CAU")
                    .toAttachment()
                    if (isSetWelcome(data.id, set_welcome_db)) {
                        var get_teks_welcome = getTextSetWelcome(data.id, set_welcome_db)
                        var replace_pesan = (get_teks_welcome.replace(/@user/gi, `@${i.split('@')[0]}`))
                        var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
                        conn.sendMessage(data.id, { caption: `${full_pesan}`, image: image.toBuffer(), mentions: [i] }, { quoted: fexec })
                    } else {
                      conn.sendMessage(data.id, { caption: `Welcome @${i.split("@")[0]} in the group ${groupName}`, image: image.toBuffer(), mentions: [i] }, { quoted: fexec })
                    }
                } else if (data.action == "remove" && isLeft) {
                    var image = await new knights.Goodbye()
                    .setUsername(await conn.getName(i))
                    .setGuildName(groupName)
                    .setGuildIcon(pp_grup)
                    .setMemberCount(metadata.participants.length)
                    .setAvatar(pp_user)
                    .setBackground("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq0uJnQO5Cz3pZUXXbO9BofUL6kiXDyGZU5w&usqp=CAU")
                    .toAttachment()
                    if (isSetLeft(data.id, set_left_db)) {
                        var get_teks_left = getTextSetLeft(data.id, set_left_db)
                        var replace_pesan = (get_teks_left.replace(/@user/gi, `@${i.split('@')[0]}`))
                        var full_pesan = (replace_pesan.replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc))
                        conn.sendMessage(data.id, { caption: `${full_pesan}`, image: image.toBuffer(), mentions: [i] }, { quoted: fexec })
                    } else {
                      conn.sendMessage(data.id, { caption: `Sayonara @${i.split("@")[0]}`, image: image.toBuffer(), mentions: [i] }, { quoted: fexec })
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    })

    _sewa.expiredCheck(conn, sewa)

    setInterval(() => {
        for (let i of Object.values(opengc)) {
            if (Date.now() >= i.time) {
                conn.groupSettingUpdate(i.id, "not_announcement")
                .then((res) =>
                conn.sendMessage(i.id, { text: `Sukses, group telah dibuka` }))
                .catch((err) =>
                conn.sendMessage(i.id, { text: 'Error' }))
                delete opengc[i.id]
                fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            }
        }
    }, 1000)

    conn.ev.on('creds.update', () => saveState)

    conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

    conn.ws.on('CB:call', async (json) => {
        const callerId = json.content[0].attrs['call-creator']
        conn.sendMessage(callerId, { text: `Jangan telepon bot!` })
        await sleep(1000)
        await conn.updateBlockStatus(json.content[0].attrs["call-creator"], "block");
    })

    conn.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    conn.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = conn.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    conn.getName = (jid, withoutContact = false) => {
        var id = conn.decodeJid(jid)
        withoutContact = conn.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === conn.decodeJid(conn.user.id) ?
        conn.user :
        (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    conn.setStatus = (status) => {
         conn.query({
             tag: 'iq',
             attrs: {
                 to: '@s.whatsapp.net',
                 type: 'set',
                 xmlns: 'status',
             },
             content: [{
                 tag: 'status',
                 attrs: {},
                 content: Buffer.from(status, 'utf-8')
             }]
         })
         return status
    }

    conn.sendContact = async (jid, kon, quoted = '', opts = {}) => {
        let list = []
        for (let i of kon) {
            list.push({
                lisplayName: await conn.getName(i + '@s.whatsapp.net'),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(i + '@s.whatsapp.net')}\nFN:${await conn.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            })
        }
        return conn.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }

    conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }
        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await conn.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    conn.sendMessageFromContent = async(jid, message, options = {}) => {
        var option = { contextInfo: {}, ...options }
        var prepare = await generateWAMessageFromContent(jid, message, option)
        await conn.relayMessage(jid, prepare.message, { messageId: prepare.key.id })
        return prepare
    }

    conn.groupInspectCode = async(jid) => {
        return require('./lib/inspect')(conn, jid)
    }

    conn.groupGetInviteInfo = async (code) => {
        const results = await groupQuery('@g.us', 'get', [{ tag: 'invite', attrs: { code } }]);
        return (0, exports.extractGroupMetadata)(results);
    }

    conn.downloadAndSaveMediaMessage = async(msg, type_file, path_file) => {
        if (type_file === 'image') {
            var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
            let buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
        } else if (type_file === 'video') {
            var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
            let buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
        } else if (type_file === 'sticker') {
            var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
            let buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
        } else if (type_file === 'audio') {
            var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
            let buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            fs.writeFileSync(path_file, buffer)
            return path_file
        }
    }

    /**
    * @param {*} jid
    * @param {*} path
    * @param {*} quoted
    * @param {*} options
    * @returns
    */
    conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }
        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        .then( response => {
            fs.unlinkSync(buffer)
            return response
        })
    }

    /**
    * @param {*} jid
    * @param {*} path
    * @param {*} quoted
    * @param {*} options
    * @returns
    */
    conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        .then( response => {
            fs.unlinkSync(buffer)
            return response
        })
    }

    return conn
}

connectToWhatsApp()
.catch(err => console.log(err))
