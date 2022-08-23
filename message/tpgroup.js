"use strict";
const { downloadContentFromMessage } = require("@adiwajshing/baileys")
const Baileys = require("@adiwajshing/baileys")
const translate = require("@vitalets/google-translate-api");
const phoneNum = require("awesome-phonenumber");
const fs = require ("fs");
const cheerio = require("cheerio")
const moment = require("moment-timezone");
const util = require("util");
const qs = require("querystring");
const base64 = require("base64-img");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const axios = require("axios");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");
const toMs = require("ms");
const FormData = require("form-data");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const nou = require('node-os-utils');
const hikki = require('hikki-me');
const yts = require("yt-search");
const acrcloud = require("acrcloud");

// Stick WM || Exif
const Exif = require("../lib/exif")
const exif = new Exif()
const { writeExif } = require("../lib/exif2")

// Library
const { color, bgcolor } = require('../lib/color')
const { serialize, getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, generateProfilePicture, makeid, removeEmojis, calculate_age, bytesToSize, checkBandwidth, reSize } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, cekBalance, addInventoriBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const tictac = require("../lib/tictac");
const { tebakgmbr } = require("../lib/tebakgambar");
const { isSetWelcome, addSetWelcome, changeSetWelcome, removeSetWelcome } = require('../lib/setwelcome');
const { isSetLeft, addSetLeft, removeSetLeft, changeSetLeft } = require('../lib/setleft');
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('../lib/respon-list');
const { addRespons, checkRespons, deleteRespons } = require('../lib/respon');
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('../lib/setproses');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('../lib/setdone');
const { isSetOpen, addSetOpen, removeSetOpen, changeSetOpen, getTextSetOpen } = require("../lib/setopen");
const { isSetClose, addSetClose, removeSetClose, changeSetClose, getTextSetClose } = require("../lib/setclose");
const { isSetBot, addSetBot, removeSetBot, changeSetBot, getTextSetBot } = require('../lib/setbot');
const _prem = require("../lib/premium");
const _sewa = require("../lib/sewa");
const msgFilter = require("../lib/antispam");
const { TelegraPh, UploadFileUgu } = require("../lib/uploader");
const { stalkff, stalkml } = require("../lib/stalker");
const { xnxxsearch, xnxxdl } = require("../lib/xnxx");
const { mediafire } = require("../lib/mediafire");
const { igdl, IgStories, igstalk } = require("../lib/instagram");
const { yta, ytv } = require("../lib/youtube");
const { goLens } = require("../lib/googlens");
const { telesticker } = require("../lib/telestick")
const { pinterest } = require("../lib/pinterest")
const scrape = require("../lib/scraper")
const scrp = require('../lib/scrape')
const { addInventoriDarah, cekDuluJoinAdaApaKagaDiJson, addDarah, kurangDarah, getDarah }  = require('../lib/darah.js')
const { cekInventoryAdaAtauGak, addInventori, addBesi, addEmas, addEmerald, addUmpan, addPotion, kurangBesi, kurangEmas, kurangEmerald, kurangUmpan, kurangPotion, getBesi, getEmas, getEmerald, getUmpan, getPotion } = require('../lib/alat_tukar.js')
const { cekDuluHasilBuruanNya, addInventoriBuruan, addIkan, addAyam, addKelinci, addDomba, addSapi, addGajah, kurangIkan, kurangAyam, kurangKelinci, kurangDomba, kurangSapi, kurangGajah, getIkan, getAyam, getKelinci, getDomba, getSapi, getGajah } = require('../lib/buruan.js')

// Database
let anonymous = JSON.parse(fs.readFileSync('./database/anonymous.json'));
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'));
let mess = JSON.parse(fs.readFileSync('./message/mess.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let modsNumber = JSON.parse(fs.readFileSync('./database/modsNumber.json'));
let set_bot = JSON.parse(fs.readFileSync('./database/set_bot.json'));
let _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'));
let _level = JSON.parse(fs.readFileSync('./database/level.json'));
let _buruan = JSON.parse(fs.readFileSync('./database/hasil_buruan.json'));
let _darahOrg = JSON.parse(fs.readFileSync('./database/darah.json'))

// DB Game
let tictactoe = [];
let tebakgambar = [];
let kuis = [];
let tebaklagu = [];
let casino = [];
let family100 = [];
let asahotak = [];
let susunkata = [];
let caklontong = [];
let siapakahaku = [];
let tebaklirik = [];

let DarahAwal =  100

// Akses Eval
const uss = 'atmin'
const pass = 'okeh'

moment.tz.setDefault("Asia/Jakarta").locale("id");

// Auto Reset Limit
setInterval(function() {
    var jamna = new Date().toLocaleTimeString('en-US', { timeZone: "Asia/Jakarta" });
    var hasilnes = jamna.split(':')[0] < 10 ? '0' + jamna : jamna
    if(hasilnes === '12:00:00 AM') {
        limit.splice('reset')
        fs.writeFileSync('./database/limit.json', JSON.stringify(limit))
        glimit.splice('reset')
        fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit))
        console.log("Limit Sudah Di Reset!")
    }
}, 1000);

module.exports = async(conn, msg, m, setting, store, welcome, left, set_welcome_db, set_left_db, db_respon_list, sewa, opengc, set_proses, set_done, set_open, set_close) => {
    try {
        let { ownerNumber, ownerName, botName, footer, lolkey, gamewaktu, limitCount, packname, author } = setting
        let { allmenu, donate, sewaBot, daftarPremium } = require('./help')
        let thumb = await reSize(fs.readFileSync(setting.pathimg), 300, 300, [])
        if (msg.mentioned && msg.mentioned.includes('')) { Object.keys(msg.mentioned).forEach((i) => { if (msg.mentioned[i] == '') { msg.mentioned.splice(i, 1) } }) }
        const { type, isQuotedMsg, quotedMsg, now, fromMe, mentioned, isBaileys } = msg
        if (isBaileys) return
        const tanggal = moment().tz("Asia/Jakarta").format("dddd, ll")
        const jam = moment().format("HH:mm:ss z")
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        var fildt = dt == 'pagi' ? dt + '🌝' : dt == 'siang' ? dt + '🌞' : dt == 'sore' ? dt + '🌝' : dt + '🌚'
        const ucapanWaktu = fildt.charAt(0).toUpperCase() + fildt.slice(1)
        const content = JSON.stringify(msg.message)
        const from = msg.key.remoteJid
        var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
        if (chats == undefined) { chats = '' }
        var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
        var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
        const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
        var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
        var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
        const isListMessage = dataListG.length !== 0 ? dataListG : dataList
        const toJSON = j => JSON.stringify(j, null,'\t')
        if (conn.multi) {
            var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
        } else {
            if (conn.nopref) {
                prefix = ''
            } else {
                prefix = conn.prefa
            }
        }
        const args = chats.split(' ')
        const command = chats.toLowerCase().split(' ')[0] || ''
        const q = chats.slice(command.length + 1, chats.length)
        const isCmd = command.startsWith(prefix)
        const isGroup = msg.key.remoteJid.endsWith('@g.us')
        let sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
        const isOwner = ownerNumber.includes(sender)
        const isMods = isOwner ? true : modsNumber.includes(sender) ? true : false
        const pushname = msg.pushName
        const body = chats.startsWith(prefix) ? chats : ''
        const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
        const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const groupOwner = isGroup ? groupMetadata.owner ? groupMetadata.owner : '' : ''
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender)
        const isUser = pendaftar.includes(sender)
        const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)

        const isSewa = _sewa.checkSewaGroup(from, sewa)
        const isAntiLink = antilink.includes(from) ? true : false
        const isAntiWame = antiwame.includes(from) ? true : false
        const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
        const isLeft = isGroup ? left.includes(from) ? true : false : false

        const isLeveling = isGroup ? _leveling.includes(from) ? true : false : false
        const isDarah = cekDuluJoinAdaApaKagaDiJson(sender)
        const isCekDarah = getDarah(sender)
        const isUmpan = getUmpan(sender)
        const isPotion = getPotion(sender)
        const isIkan = getIkan(sender)
        const isAyam = getAyam(sender)
        const isKelinci = getKelinci(sender)
        const isDomba = getDomba(sender)
        const isSapi = getSapi(sender)
        const isGajah = getGajah(sender)
        const isBalance = getBalance(sender, balance)
        const isBesi = getBesi(sender)
        const isEmas = getEmas(sender)
        const isEmerald = getEmerald(sender)
        const isInventory = cekInventoryAdaAtauGak(sender)
        const isInventoriBuruan = cekDuluHasilBuruanNya(sender)
        const isInventoryBalance = cekBalance(sender, balance)
        const ikan = ['🐟','🐠','🐡','🐋','🦈','🐳','🐬']

        const gcounti = setting.gcount
        const gcount = isPremium ? gcounti.prem : gcounti.user

        let timestamp = speed();
        let latensi = speed() - timestamp

        const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByReply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []

        const fkontak = { key: { participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `6285156443023-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${ownerName},;;;\nFN:${ownerName},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': thumb, thumbnail: thumb, sendEphemeral: true }}}

        const ymete =[`application/pdf`,`application/vnd.openxmlformats-officedocument.wordprocessingml.document`,`application/vnd.openxmlformats-officedocument.presentationml.presentation`,`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`]
        const moci = ymete[Math.floor(Math.random() * ymete.length)]

        function hitungmundur(bulan, tanggal) {
            let from = new Date(`${bulan} ${tanggal}, 2023 00:00:00`).getTime();
            let now = Date.now();
            let distance = from - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
        }
        function toRupiah(angka) {
            var balancenyeini = '';
            var angkarev = angka.toString().split('').reverse().join('');
            for (var i = 0; i < angkarev.length; i++)
            if (i % 3 == 0) balancenyeini += angkarev.substr(i, 3) + '.';
            return '' + balancenyeini.split('', balancenyeini.length - 1).reverse().join('');
        }
        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        const isEmoji = (emo) => {
            let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            let regexEmoji = new RegExp(emoji_ranges, 'gi');
            return emo.match(regexEmoji)
        }
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        function monospace(string) {
            return '```' + string + '```'
        }
        function randomNomor(min, max = null) {
            if (max !== null) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
                return Math.floor(Math.random() * min) + 1
            }
        }
        const pickRandom = (arr) => {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        function mentions(teks, mems = [], id) {
            if (id == null || id == undefined || id == false) {
                let res = conn.sendMessage(from, { text: teks, mentions: mems })
                return res
            } else {
                let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
                return res
            }
        }
        const nebal = (angka) => {
            return Math.floor(angka)
        }
        function parseMention(text = '') {
            return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
        }
        const reply = (teks) => {
            return conn.sendMessage(from, { text: teks, mentions: parseMention(teks) }, { quoted: msg })
        }
        const fakeDeface = (from, teks, title, description, img, option = {}) => {
            if (!isUrl(teks)) return 'teks harus mengandung url'
            return conn.sendMessage(from, {
                text: teks,
                title,
                matchedText: isUrl(teks)[0],
                canonicalUrl: isUrl(teks)[0],
                description,
                detectLinks: false,
                jpegThumbnail: img
            }, option)
        }
        const replyDeface = (teks) => {
            return conn.sendMessage(from, {
                text: teks, contextInfo: {
                    externalAdReply: {
                        title: `© ${botName}`,
                        body: `Simple Bot WhatsApp By ${ownerName}`,
                        mediaType: 2,
                        thumbnail: thumb,
                        sourceUrl: `https://instagram.com/${author}`
                    }
                }
            }, { quoted: msg })
        }
        const textImg = (teks) => {
            return conn.sendMessage(from, { text: teks, jpegThumbnail: thumb, mentions: parseMention(teks) }, { quoted: msg })
        }
        const sendMess = (hehe, teks) => {
            return conn.sendMessage(hehe, { text, teks })
        }
        const buttonWithText = (from, text, footer, buttons) => {
            return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
        }
        const getCase = (cases) => {
            return "case prefix+"+`'${cases}'`+fs.readFileSync(__filename).toString().split('case prefix+\''+cases+'\'')[1].split("break")[0]+"break"
        }
        function formatDate(n, locale = 'id') {
            let d = new Date(n)
            return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})
        }
        async function getGcName(groupID) {
            try {
                let data_name = await conn.groupMetadata(groupID)
                return data_name.subject
            } catch (err) {
                return '-'
            }
        }

        async function sendPlay(from, query) {
            try {
                var data = await yts(query)
                data = data.videos[0]
                var button = [
                    { buttonId: prefix+`ytmp3 ${data.url}`, buttonText: { displayText: `🎵 Audio` }, type: 1 },
                    { buttonId: prefix+`ytmp4 ${data.url}`, buttonText: { displayText: `🎥 Video` }, type: 1 }
                ]
                conn.sendMessage(from, { image: await getBuffer(data.thumbnail), caption: `*YOUTUBE-DOWNLOADERS*📁\n\n» Title : ${data.title}\n» Durations : ${data.duration.timestamp}\n» Quality Videos : 360p\n» Quality Audio : 128p\n» Urls : ${data.url}\n\n_Silahkan pilih format yang ada dibawah_`, footer: footer, buttons: button }, { quoted: msg })
            } catch (e) {
                reply(mess.error.api)
                console.log(color('[ PLAY ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `sendPlay ${e}` })
            }
        }

        async function sendStickerFromUrl(from, url, packname1 = packname, author1 = author, options = {}) {
            var names = Date.now() / 10000;
            var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
            exif.create(packname1, author1, `sendstc_${names}`)
            download(url, './sticker/' + names + '.png', async function () {
                let filess = './sticker/' + names + '.png'
                let asw = './sticker/' + names + '.webp'
                exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, async (err) => {
                    exec(`webpmux -set exif ./sticker/sendstc_${names}.exif ${asw} -o ${asw}`, async (error) => {
                        conn.sendMessage(from, { sticker: fs.readFileSync(asw) }, options)
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
                        fs.unlinkSync(`./sticker/sendstc_${names}.exif`)
                    })
                })
            })
        }

        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedImage = isQuotedMsg ? (quotedMsg.type === 'imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? (quotedMsg.type === 'audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? (quotedMsg.type === 'documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? (quotedMsg.type === 'videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? (quotedMsg.type === 'stickerMessage') ? true : false : false

        // Auto Read & Presence Online
        conn.sendReceipt(from, isGroup ? sender : '', [msg.key.id], 'read')
        conn.sendPresenceUpdate('available', from)

        // Mode
        if (conn.mode === 'self') {
            if (!isOwner && !fromMe) return
            if (fromMe && isBaileys) return
        }

        // Anti Link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                .then( done => conn.groupParticipantsUpdate(from, [sender], "remove") )
            }
        }

        // Anti Wame
        if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
            if (chats.match(/(wa.me)/gi)) {
                if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
                reply(`*「 NOMOR LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link nomor, maaf kamu akan di kick`)
                .then( done => conn.groupParticipantsUpdate(from, [sender], "remove") )
            }
        }

        // Auto Registrasi
        if (isCmd && !isUser) {
            pendaftar.push(sender)
            fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
        }

        // Premium
        _prem.expiredCheck(conn, premium)

        // Function for Anti Spam
        msgFilter.ResetSpam(conn.spam)

        const spampm = () => {
            console.log(color('[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            msgFilter.addSpam(sender, conn.spam)
            reply(`Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik`)
        }
        const spamgr = () => {
            console.log(color('[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            msgFilter.addSpam(sender, conn.spam)
            reply(`Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik`)
        }

        if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
        if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
        if (isCmd && args[0].length > 1 && !isOwner && !isPremium) msgFilter.addFilter(sender)

        // Response List Store
        if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
            var get_data_respon = getDataResponList(from, chats, db_respon_list)
            if (get_data_respon.isImage === false) {
                conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
                    quoted: msg
                })
            } else {
                conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
                    quoted: msg
                })
            }
        }

        // Function for Anonymous Chat
        function anonyCheck(who = '', _db) {
            return [_db.a, _db.b].includes(who)
        }
        function anonyOther(who = '', _db) {
            return who == _db.a ? _db.b : who == _db.b ? _db.a : ''
        }

        // Auto Write Database Anonymous Every 30 Second's
        setInterval(async () => {
            fs.writeFileSync('./database/anonymous.json', JSON.stringify(anonymous, null, 2))
        }, 30 * 1000)

        var cekForAnon = isCmd && args[0].length > 1

        // For Action Anonymous Chat
        if (!isGroup && !msg.key.fromMe && !cekForAnon) {
            let rums = Object.values(anonymous).find(room => [room.a, room.b].includes(sender) && room.state == "CHATTING")
            if (rums) {
                var partnerJID = [rums.a, rums.b].find(user => user !== sender)
                if (msg.type == "conversation") {
                    conn.sendMessage(partnerJID, { text: chats })
                } else if (msg.type == "extendedTextMessage") {
                    conn.sendMessage(partnerJID, { text: chats, contextInfo: msg.message["extendedTextMessage"].contextInfo })
                } else {
                    var contextInfo = msg.message[msg.type].contextInfo
                    conn.sendMessageFromContent(partnerJID, msg.message, { contextInfo })
                }
            }
        }

        // Tictactoe
        if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // Suit PVP
        require('../lib/suitpvp')(conn, sender, chats, from, msg, isGroup)

        // To Read Game Answers
        cekWaktuGame(conn, tebakgambar) // Tebak Gambar
        if (isPlayGame(from, tebakgambar) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
                var htgm = randomNomor(100, 150)
                addBalance(sender, htgm, balance)
                conn.sendMessage(from, { text: `*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? klik button dibawah`, footer: footer, buttons: [{ buttonId: prefix+'tebakgambar', buttonText: { displayText: 'Tebak Gambar' }, type: 1 }] }, { quoted: msg })
                tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
            }
        }
        cekWaktuGame(conn, kuis) // Kuis Game
        if (isPlayGame(from, kuis) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, kuis)) {
                var htgm = randomNomor(100, 150)
                addBalance(sender, htgm, balance)
                conn.sendMessage(from, { text: `*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, kuis)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? klik button dibawah`, footer: footer, buttons: [{ buttonId: prefix+'kuis', buttonText: { displayText: 'Kuis' }, type: 1 }] }, { quoted: msg })
                kuis.splice(getGamePosi(from, kuis), 1)
            }
        }
        cekWaktuGame(conn, tebaklagu) // Tebak Lagu
        if (isPlayGame(from, tebaklagu) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, tebaklagu)) {
                var htl = randomNomor(150, 200)
                addBalance(sender, htl, balance)
                conn.sendMessage(from, { text: `*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebaklagu)}\nHadiah : ${htl} balance\n\nIngin bermain lagi? klik button dibawah`, footer: footer, buttons: [{ buttonId: prefix+'tebaklagu', buttonText: { displayText: 'Tebak Lagu' }, type: 1 }] }, { quoted: msg })
                tebaklagu.splice(getGamePosi(from, tebaklagu), 1)
            }
        }
        cekWaktuGame(conn, family100) // Family 100
        if (isPlayGame(from, family100) && isUser) {
            var anjuy = getJawabanGame(from, family100)
            for (let i of anjuy) {
                if (chats.toLowerCase().includes(i)) {
                    var htli = randomNomor(150, 200)
                    addBalance(sender, htli, balance)
                    conn.sendMessage(from, { text: `*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${i}\nHadiah : ${htli} balance` }, { quoted: msg })
                    var anug = anjuy.indexOf(i)
                    anjuy.splice(anug, 1)
                }
            }
            if (anjuy.length < 1) {
                conn.sendMessage(from, { text: `Semua jawaban sudah tertebak\nklik button dibawah`, footer: footer, buttons: [{ buttonId: prefix+'family100', buttonText: { displayText: 'Family 100' }, type: 1 }] }, { quoted: msg })
                family100.splice(getGamePosi(from, family100), 1)
            }
        }
        cekWaktuGame(conn, asahotak) // Asahotak
        if (isPlayGame(from, asahotak) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, asahotak)) {
                var htgm = randomNomor(100, 150)
                addBalance(sender, htgm, balance)
                conn.sendMessage(from, { text: `*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, asahotak)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? klik button dibawah`, footer: footer, buttons: [{ buttonId: prefix+'asahotak', buttonText: { displayText: 'Asahotak' }, type: 1 }] }, { quoted: msg })
                asahotak.splice(getGamePosi(from, asahotak), 1)
            }
        }
        cekWaktuGame(conn, susunkata) // Susunkata
        if (isPlayGame(from, susunkata) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, susunkata)) {
                var htgm = randomNomor(100, 150)
                addBalance(sender, htgm, balance)
                conn.sendMessage(from, { text: `*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, susunkata)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? klik button dibawah`, footer: footer, buttons: [{ buttonId: prefix+'susunkata', buttonText: { displayText: 'Susun Kata' }, type: 1 }] }, { quoted: msg })
                susunkata.splice(getGamePosi(from, susunkata), 1)
            }
        }
        cekWaktuGame(conn, caklontong) // Caklontong
        if (isPlayGame(from, caklontong) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, caklontong)) {
                var htgm = randomNomor(100, 150)
                addBalance(sender, htgm, balance)
                conn.sendMessage(from, { text: `*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, caklontong)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? klik button dibawah`, footer: footer, buttons: [{ buttonId: prefix+'caklontong', buttonText: { displayText: 'Cak Lontong' }, type: 1 }] }, { quoted: msg })
                caklontong.splice(getGamePosi(from, caklontong), 1)
            }
        }
        cekWaktuGame(conn, siapakahaku) // Siapakahaku
        if (isPlayGame(from, siapakahaku) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, siapakahaku)) {
                var htgm = randomNomor(100, 150)
                addBalance(sender, htgm, balance)
                conn.sendMessage(from, { text: `*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, siapakahaku)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? klik button dibawah`, footer: footer, buttons: [{ buttonId: prefix+'siapakahaku', buttonText: { displayText: 'Siapakah Aku' }, type: 1 }] }, { quoted: msg })
                siapakahaku.splice(getGamePosi(from, siapakahaku), 1)
            }
        }
        cekWaktuGame(conn, tebaklirik) // Tebaklirik
        if (isPlayGame(from, tebaklirik) && isUser) {
            if (chats.toLowerCase() == getJawabanGame(from, tebaklirik)) {
                var htgm = randomNomor(100, 150)
                addBalance(sender, htgm, balance)
                conn.sendMessage(from, { text: `*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebaklirik)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? klik button dibawah`, footer: footer, buttons: [{ buttonId: prefix+'tebaklirik', buttonText: { displayText: 'Tebak Lirik' }, type: 1 }] }, { quoted: msg })
                tebaklirik.splice(getGamePosi(from, tebaklirik), 1)
            }
        }

        // Function for Casino
        const isPlayCasino = (from, casino) => {
            var status = false
            Object.keys(casino).forEach((i) => {
                if (casino[i].session == from) {
                    status = true
                }
            })
            return status
        }
        const getCasino = (from, casino) => {
            var posi = null
            Object.keys(casino).forEach((i) => {
                if (casino[i].session == from) {
                    posi = i
                }
            })
            return posi
        }
        const setCasino = (chatId, player1, player2, nominal, _db) => {
            if (!isPlayCasino(chatId, _db)) {
                var obj = {
                    status: true,
                    session: chatId,
                    turn: 'Z',
                    Z: player1,
                    Y: player2,
                    nominal: nominal,
                    expired: setTimeout(() => {
                        var teksc = `Waktu casino habis, tidak ada jawaban dari @${player2.split("@")[0]}`
                        conn.sendMessage(chatId, { text: teksc, mentions: [player2+'@s.whatsapp.net'] })
                        _db.splice(getCasino(chatId, _db), 1)
                    }, 30000)
                }
                _db.push(obj)
            }
        }
        const deleteCasino = (from, _db) => {
            if (isPlayCasino(from, _db)) {
                _db.splice(getCasino(from, _db), 1)
                return true
            } else {
                return false
            }
        }
        const sesiCasino = (from, casino) => {
            return casino[getCasino(from, casino)]
        }

        // To determine the winner of the Casino
        if (isPlayCasino(from, casino)) {
            var casinoo = sesiCasino(from, casino)
            if (sender == `${casinoo.Y}@s.whatsapp.net` && chats.toLowerCase() == 'n') {
                conn.sendMessage(from, { text: `「 Game Casino Rejected 」\n\n• @${casinoo.Y} Membatalkan Game`, mentions: [casinoo.Y+"@s.whatsapp.net"] }, {quoted: msg })
                clearTimeout(casinoo.expired)
                deleteCasino(from, casino)
            } else if (sender == `${casinoo.Y}@s.whatsapp.net` && chats.toLowerCase() == 'y') {
                clearTimeout(casinoo.expired)
                var angka1 = await randomNomor(10, 20)
                var angka2 = await randomNomor(10, 20)
                if (angka1 > angka2) {
                    starGame =  `🎰 Casino Game 💰

• @${casinoo.Z} --> ${angka1} 👑
• @${casinoo.Y} --> ${angka2} 🥈

Pemenangnya adalah [ @${casinoo.Z} ]
Mendapatkan: $ ${nebal(casinoo.nominal)}`
                    conn.sendMessage(from, { text: starGame, mentions: [casinoo.Z + "@s.whatsapp.net",  casinoo.Y + "@s.whatsapp.net"]}, {quoted: msg })
                    await addBalance(`${casinoo.Z}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                    await kurangBalance(`${casinoo.Y}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                    deleteCasino(from, casino)
                } else if (angka1 < angka2) {
                    starGame =  `🎰 Casino Game 💰

• @${casinoo.Z} --> ${angka1} 🥈
• @${casinoo.Y} --> ${angka2} 👑

Pemenangnya adalah [ @${casinoo.Y} ]
Mendapatkan: $ ${nebal(casinoo.nominal)}`
                    conn.sendMessage(from, { text: starGame, mentions: [casinoo.Z + "@s.whatsapp.net",  casinoo.Y + "@s.whatsapp.net"] }, {quoted: msg })
                    await addBalance(`${casinoo.Y}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                    await kurangBalance(`${casinoo.Z}@s.whatsapp.net`, nebal(casinoo.nominal), balance)
                    deleteCasino(from, casino)
                } else if (angka1 = angka2) {
                    starGame =  `🎰 Casino Game 💰

• @${casinoo.Z} --> ${angka1} 📍
• @${casinoo.Y} --> ${angka2} 📍

Games Draw, Tidak Ada Pemenang`
                    conn.sendMessage(from, { text: starGame, mentions: [casinoo.Z + "@s.whatsapp.net",  casinoo.Y + "@s.whatsapp.net" ]}, { quoted: msg })
                    deleteCasino(from, casino)
                }
            }
        }

        // Leveling
        const getLevelingXp = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
           }
        }

        const getLevelingLevel = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getLevelingId = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].jid
            }
        }

        const addLevelingXp = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./database/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingLevel = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./database/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (userId) => {
            const obj = {jid: userId, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./database/level.json', JSON.stringify(_level))
        }

        const getUserRank = (userId) => {
            let position = null
            let found = false
            _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                    found = true
                }
            })
            if (found === false && position === null) {
                const obj = { id: userId, xp: 0, level: 1 }
                _level.push(obj)
                fs.writeFileSync('./database/level.json', JSON.stringify(_level))
                return 99
            } else {
                return position + 1
            }
        }

        const xpGain = new Set()

        const isGained = (userId) => {
            return !!xpGain.has(userId)
        }

        const addCooldown = (userId) => {
            xpGain.add(userId)
            setTimeout(() => {
                return xpGain.delete(userId)
            }, 60000)
        }

        var levelRole = getLevelingLevel(sender)
        var role = 'Copper V'
        if (levelRole <= 5) {
            role = 'Copper IV'
        } else if (levelRole <= 10) {
            role = 'Copper III'
        } else if (levelRole <= 15) {
            role = 'Copper II'
        } else if (levelRole <= 20) {
            role = 'Copper I'
        } else if (levelRole <= 25) {
            role = 'Silver V'
        } else if (levelRole <= 30) {
            role = 'Silver IV'
        } else if (levelRole <= 35) {
            role = 'Silver III'
        } else if (levelRole <= 40) {
            role = 'Silver II'
        } else if (levelRole <= 45) {
            role = 'Silver I'
        } else if (levelRole <= 50) {
            role = 'Gold V'
        } else if (levelRole <= 55) {
            role = 'Gold IV'
        } else if (levelRole <= 60) {
            role = 'Gold III'
        } else if (levelRole <= 65) {
            role = 'Gold II'
        } else if (levelRole <= 70) {
            role = 'Gold I'
        } else if (levelRole <= 75) {
            role = 'Platinum V'
        } else if (levelRole <= 80) {
            role = 'Platinum IV'
        } else if (levelRole <= 85) {
            role = 'Platinum III'
        } else if (levelRole <= 90) {
            role = 'Platinum II'
        } else if (levelRole <= 95) {
            role = 'Platinum I'
        } else if (levelRole < 100) {
            role = 'Exterminator'
        }

        var levelRoles = getLevelingLevel(sender)
        var roles = 'Cop V'
        if (levelRoles <= 5) {
            roles = 'Cop IV'
        } else if (levelRoles <= 10) {
            roles = 'Cop III'
        } else if (levelRoles <= 15) {
            roles = 'Cop II'
        } else if (levelRoles <= 20) {
            roles = 'Cop I'
        } else if (levelRoles <= 25) {
            roles = 'Sil V'
        } else if (levelRoles <= 30) {
            roles = 'Sil IV'
        } else if (levelRoles <= 35) {
            roles = 'Sil III'
        } else if (levelRoles <= 40) {
            roles = 'Sil II'
        } else if (levelRoles <= 45) {
            roles = 'Sil I'
        } else if (levelRoles <= 50) {
            roles = 'Gol V'
        } else if (levelRoles <= 55) {
            roles = 'Gol IV'
        } else if (levelRoles <= 60) {
            roles = 'Gol III'
        } else if (levelRoles <= 65) {
            roles = 'Gol II'
        } else if (levelRoles <= 70) {
            roles = 'Gol I'
        } else if (levelRoles <= 75) {
            roles = 'Plat V'
        } else if (levelRoles <= 80) {
            roles = 'Plat IV'
        } else if (levelRoles <= 85) {
            roles = 'Plat III'
        } else if (levelRoles <= 90) {
            roles = 'Plat II'
        } else if (levelRoles <= 95) {
            roles = 'Plati I'
        } else if (levelRoles < 100) {
            roles = 'Exter'
        }
        // Functions Leveling
        if (isGroup && isLeveling && isUser && conn.mode) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                addCooldown(sender)
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 200
                const requiredXp = 200 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    var teks = `*──「 LEVEL UP 」──*\n\n❑ *Name*:  @${sender.split("@")[0]}\n❑ *XP*: ${getLevelingXp(sender)}\n❑ *Level*: ${getLevel} -> ${getLevelingLevel(sender)}\n❑ *Role*: ${role} \n\nCongrats!! 🎉`
                    conn.sendMessage(from, { text: teks, mentions:[sender] }, { quoted:msg })
                }
            } catch (err) {
                console.error(err)
            }
        }
        if (prefix && command) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 30
                const requiredXp = 30 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                }
            } catch (err) {
                console.error(err)
            }
        }

        const getLevel = getLevelingLevel(sender)
        const getXp = getLevelingXp(sender)
        const reqXp  = 200 * (Math.pow(2, getLevelingLevel(sender)) - 1)

        if (chats.startsWith("> ") && isMods) {
            console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
            const ev = (sul) => {
                var sat = JSON.stringify(sul, null, 2)
                var bang = util.format(sat)
                if (sat == undefined) {
                    bang = util.format(sul)
                }
                return reply(bang)
            }
            try {
                reply(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
            } catch (e) {
                reply(util.format(e))
            }
        } else if (chats.startsWith("$ ") && isMods) {
            console.log(color('[ EXEC ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
            exec(chats.slice(2), (err, stdout) => {
                if (err) return reply(`${err}`)
                if (stdout) reply(`${stdout}`)
            })
        } else if (chats.startsWith("x ") && isMods) {
            console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
            try {
                let evaled = await eval(chats.slice(2))
                if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
                reply(`${evaled}`)
            } catch (err) {
                reply(`${err}`)
            }
        }

        // Logs
		if (!isGroup && isCmd && !fromMe) {
		    addBalance(sender, randomNomor(20), balance)
		    console.log(color('[ CMD ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
		    addBalance(sender, randomNomor(20), balance)
		    console.log(color('[ CMD ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}

        switch (command) {
        case prefix+'menu': case prefix+'help':
            let mundur = hitungmundur(8, 17)
            var { download, upload } = await checkBandwidth();
            conn.sendMessage(from, { image: thumb, caption: allmenu(ucapanWaktu, sender, mundur, upload, download, totalGb, usedGb, freeGb, ownerName, botName, jam, tanggal, runtime, pushname, isOwner, isPremium, limitCount, limit, gcount, glimit, toRupiah, balance, prefix), footer: footer, buttons: [ { buttonId: prefix+'stats', buttonText: {displayText: 'Statistic 📊' }, type: 1 },{ buttonId: prefix+'owner', buttonText: { displayText: 'Owner 👑' }, type: 1 } ] }, { quoted: fkontak })
            break
        case prefix+'stat': case prefix+'stats': case prefix+'statistik': case prefix+'statistic':
            var { totalGb, usedGb, freeGb } = await nou.drive.info()
            var { download, upload } = await checkBandwidth()
            var allgrup = await conn.groupFetchAllParticipating().then(res => Object.values(res))
            var allchat = await store.chats.all()
            var tmp = speed(); var tmps = speed() - tmp
            var sesize = bytesToSize(fs.statSync(`./${setting.sessionName}.json`).size)
            var stat = `*STATISTIC BOT*

*Speed :* ${tmps.toFixed(4)} s
*Runtime :* ${runtime(process.uptime())}
*Total Chat :* ${allchat.length}
*Private Chat :* ${allchat.length - allgrup.length}
*Group Chat :* ${allgrup.length}

*Download :* ${download}
*Upload :* ${upload}
*Total Storage :* ${totalGb} GB
*Used :* ${usedGb} GB
*Free :* ${freeGb} GB
*Session Size :* ${sesize}`
            reply(stat)
            break
        case prefix+'runtime':
            reply(runtime(process.uptime()))
            break
        case prefix+'speed': case prefix+'ping':
            reply(`${latensi.toFixed(4)} Second`)
            break
        case prefix+'owner': case prefix+'creator': case prefix+'dev': case prefix+'author':
            var number = ownerNumber.replace(/[^0-9]/g, '')
            var vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:' + ownerName + '\n'
            + 'ORG:;\n'
            + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
            + 'END:VCARD'
            conn.sendMessage(from, { contacts: { displayName: ownerName, contacts: [{ vcard }] }},{ quoted: msg })
            break
        case prefix+'donasi': case prefix+'donate':
            conn.sendMessage(from, { image: fs.readFileSync('./media/qris.jpg'), caption: donate(pushname, ownerNumber) }, { quoted: msg })
            break
        case prefix+'sewa': case prefix+'sewabot': case prefix+'hargasewa': case prefix+'rentalbot':
            var butsewa = [ { urlButton: { displayText: `Contact Owners`, url : `https://wa.me/${ownerNumber.split('@')[0]}?text=kak+mau+sewa+bot` } } ]
            conn.sendMessage(from, { text: sewaBot(prefix), footer: footer, templateButtons: butsewa })
            break
        case prefix+'premium': case prefix+'daftarprem': case prefix+'daftarpremium': case prefix+'joinprem': case prefix+'joinpremium':
            var butprem = [ { urlButton: { displayText: `Contact Owner`, url : `https://wa.me/${ownerNumber.split('@')[0]}?text=kak+mau+beli+premium+bot` } } ]
            conn.sendMessage(from, { text: daftarPremium(prefix), footer: footer, templateButtons: butprem })
            break
        case prefix+'cekprem': case prefix+'cekpremium': case prefix+'checkprem': case prefix+'checkpremium':
            if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            if (isOwner) return reply(`Lu owner bego!`)
            if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
            let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
            let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
            reply(premiumnya)
            break
        case prefix+'listprem': case prefix+'listpremium':
            let txt = `*List Premium*\nJumlah : ${premium.length}\n\n`
            let men = [];
            for (let i of premium) {
                men.push(i.id)
                txt += `*ID :* @${i.id.split("@")[0]}\n`
                if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    txt += `*Expire :* PERMANENT\n\n`
                } else {
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                }
            }
            mentions(txt, men, true)
            break
        case prefix+'listsewa':
            let list_sewa_list = `*LIST SEWA GROUP*\n\n*Total:* ${sewa.length}\n\n`
            let data_array = [];
            for (let x of sewa) {
                list_sewa_list += `*Name:* ${await getGcName(x.id)}\n*ID :* ${x.id}\n`
                let ceksewa = ms(x.expired - Date.now())
                list_sewa_list += `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s) ${ceksewa.seconds} second(s)\n\n`
            }
            reply(list_sewa_list)
            break
        case prefix+'profile': case prefix+'profil': case prefix+'prof': case prefix+'myprofile':
            var jidnya;
            if (isGroup) {
                if (mentioned.length !== 0) {
                    jidnya = mentioned[0]
                } else {
                    jidnya = sender
                }
            } else {
                jidnya = sender
            }
            
            var isAngmins = groupAdmins.includes(jidnya)
            var isOngner = ownerNumber.includes(jidnya)
            var isPrem = isOngner ? true : _prem.checkPremiumUser(jidnya, premium)
            var gcunt = isPrem ? setting.gcount.prem : setting.gcount.user
            var nme1 = await conn.getName(jidnya)
            var pungname = nme1 !== undefined ? nme1 : 'Not detected'
            var pp_user = await conn.profilePictureUrl(jidnya, 'image').catch((e) => 'https://telegra.ph/file/147b449559f73dc248d0b.jpg')
            var limit_user = getLimit(jidnya, limitCount, limit)
            var glimit_user = cekGLimit(jidnya, gcunt, glimit)
            try {
                var data_bio = await conn.fetchStatus(jidnya)
            } catch {
                var data_bio = null
            }
            var bio_date = data_bio !== null ? `\n*📆Bio Date :* ${moment(data_bio.setAt).tz('Asia/Jakarta').format('ddd DD MMM YYYY')}` : ''
            var info_jabatan = isGroup ? `\n*🏅Position :* ${groupOwner === jidnya ? 'Owner Group' : isAngmins ? 'Admin' : 'Member Biasa'}` : ''
            var data_c_id = await phoneNum('+'+jidnya.split("@")[0])
            var teks = `*YOUR PROFILE*\n\n*👤Name :* ${pungname}\n*☎️Number :* ${data_c_id.g.number.international}\n*📚Bio :* ${data_bio !== null ? data_bio.status : null}${bio_date}\n*💳Daily Limit :* ${isPrem ? 'Unlimited' : limit_user}\n*🎮Game Limit :* ${isOngner ? 'Unlimited' : glimit_user}${info_jabatan}\n*💎Status :* ${isOngner ? 'Owner' : isPrem ? 'Premium' : 'Free'}\n\n*❤️Darah kamu* : ${getDarah(jidnya)}\n*◻️️Besi kamu* : ${getBesi(jidnya)}\n*🌟Emas Kamu* : ${getEmas(jidnya)}\n*💎Emerald Kamu* : ${getEmerald(jidnya)}\n*🧪Potion Kamu* : ${getPotion(jidnya)}\n\n*HASIL BURUAN*\n*🐟Ikan* : ${getIkan(jidnya)}\n*🐔Ayam* : ${getAyam(jidnya)}\n*🐇Kelinci* : ${getKelinci(jidnya)}\n*🐑Domba* : ${getDomba(jidnya)}\n*🐄Sapi* : ${getSapi(jidnya)}\n*🐘Gajah* : ${getGajah(jidnya)}`
            conn.sendMessage(from, { image: { url: pp_user }, caption: teks }, { quoted: msg })
            break

        // Tools Menu
        case prefix+'sticker': case prefix+'stiker': case prefix+'s':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (isImage || isQuotedImage) {
                var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
                var buffer = Buffer.from([])
                for await(const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                var rand1 = 'sticker/'+getRandom('.jpg')
                var rand2 = 'sticker/'+getRandom('.webp')
                fs.writeFileSync(`./${rand1}`, buffer)
                ffmpeg(`./${rand1}`)
                .on("error", console.error)
                .on("end", () => {
                    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                        conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                        limitAdd(sender, limit)
                        fs.unlinkSync(`./${rand1}`)
                        fs.unlinkSync(`./${rand2}`)
                    })
                })
                .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
                .toFormat('webp')
                .save(`${rand2}`)
            } else if (isVideo && msg.message.videoMessage.seconds < 10 || isQuotedVideo && quotedMsg.videoMessage.seconds < 10) {
                reply(mess.wait)
                var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
                var buffer = Buffer.from([])
                for await(const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                var rand1 = 'sticker/'+getRandom('.mp4')
                var rand2 = 'sticker/'+getRandom('.webp')
                fs.writeFileSync(`./${rand1}`, buffer)
                ffmpeg(`./${rand1}`)
                .on("error", console.error)
                .on("end", () => {
                    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                        conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                        limitAdd(sender, limit)
                        fs.unlinkSync(`./${rand1}`)
                        fs.unlinkSync(`./${rand2}`)
                    })
                })
                .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
                .toFormat('webp')
                .save(`${rand2}`)
            } else {
                reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
            }
            break
        case prefix+'smeme': case prefix+'stikermeme': case prefix+'stickermeme': case prefix+'memestiker':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            var atas = q.includes('|') ? q.split('|')[0] ? q.split('|')[0] : q : '-'
            var bawah = q.includes('|') ? q.split('|')[1] ? q.split('|')[1] : '' : q
            var opt = { packname, author }
            if (isImage || isQuotedImage) {
                try {
                    if (args.length < 2) return reply(`Gunakan dengan cara ${command} *teks atas|teks bawah*\n\n_Contoh_\n\n${command} beliau|awikwok banget`)
                    reply(mess.wait)
                    var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender+Date.now()}.jpg`)
                    var media_url = (await UploadFileUgu(media)).url
                    var meme_url = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${media_url}`
                    conn.sendImageAsSticker(from, meme_url, msg, opt)
                    limitAdd(sender, limit)
                    fs.unlinkSync(media)
                } catch (e) {
                    reply(mess.error.api)
                }
            } else if (isQuotedSticker) {
                try {
                    if (args.length < 2) return reply(`Gunakan dengan cara ${command} *teks atas|teks bawah*\n\n_Contoh_\n\n${command} beliau|awikwok banget`)
                    reply(mess.wait)
                    var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${sender+Date.now()}.webp`)
                    var media_url = (await UploadFileUgu(media)).url
                    var meme_url = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${media_url}`
                    conn.sendImageAsSticker(from, meme_url, msg, opt)
                    limitAdd(sender, limit)
                    fs.unlinkSync(media)
                } catch (err) {
                    reply(mess.error.api)
                }
            } else {
                reply(`Kirim Gambar atau balas Sticker dengan caption ${command} teks atas|teks bawah`)
            }
            break
        case prefix+'swm': case prefix+'wm': case prefix+'take': case prefix+'takestiker': case prefix+'stikerwm': case prefix+'stickerwm': case prefix+'takesticker':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            const name_exif = q.split('|')[0] ? q.split('|')[0] : q
            const author_exif = q.split('|')[1] ? q.split('|')[1] : ''
            if (isImage || isQuotedImage) {
                reply(mess.wait)
                await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender}.webp`)
                exif.create(name_exif, author_exif, `stickerwm_${sender}`)
                await ffmpeg(`./sticker/${sender}.webp`)
                .input(`./sticker/${sender}.webp`)
                .on('start', function(cmd) {
                    console.log(`Started : ${cmd}`)
                })
                .on('error', function(err) {
                    console.log(`Error : ${err}`)
                    if (fs.existsSync(`./sticker/${sender}.webp`)) fs.unlinkSync(`./sticker/${sender}.webp`)
                    reply(mess.error.api)
                })
                .on('end', function() {
                    console.log('Finish')
                    exec(`webpmux -set exif ./sticker/stickerwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                        if (error) return reply(mess.error.api)
                        await conn.sendMessage(from, { sticker: { url: `./sticker/${sender}.webp`}}, {quoted: msg})
                        if (fs.existsSync(`./sticker/${sender}.webp`)) fs.unlinkSync(`./sticker/${sender}.webp`)
                        if (fs.existsSync(`./sticker/stickerwm_${sender}.exif`)) fs.unlinkSync(`./sticker/stickerwm_${sender}.exif`)
                        limitAdd(sender, limit)
                    })
                })
                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                .toFormat('webp')
                .save(`./sticker/${sender}.webp`)
            } else if (isVideo && msg.message.videoMessage.fileLength < 10000000 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000) {
                reply(mess.wait)
                await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${sender}.mp4`)
                exif.create(name_exif, author_exif, `stickerwm_${sender}`)
                await ffmpeg(`./sticker/${sender}.mp4`)
                .input(`./sticker/${sender}.mp4`)
                // .inputFormat(`./sticker/${sender}.webp`.split('.')[4])
                .on('start', function(cmd) {
                    console.log(`Started : ${cmd}`)
                })
                .on('error', function(err) {
                    console.log(`Error : ${err}`)
                    if (fs.existsSync(`./sticker/${sender}.mp4`)) fs.unlinkSync(`./sticker/${sender}.mp4`)
                    reply('Err')
                })
                .on('end', function() {
                    exec(`webpmux -set exif ./sticker/stickerwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                        if (error) return reply(mess.error.api)
                        await conn.sendMessage(from, { sticker: { url: `./sticker/${sender}.webp`}}, {quoted: msg})
                        if (fs.existsSync(`./sticker/${sender}.webp`)) fs.unlinkSync(`./sticker/${sender}.webp`)
                        if (fs.existsSync(`./sticker/${sender}.mp4`)) fs.unlinkSync(`./sticker/${sender}.mp4`)
                        if (fs.existsSync(`./sticker/stickerwm_${sender}.exif`)) fs.unlinkSync(`./sticker/stickerwm_${sender}.exif`)
                        limitAdd(sender, limit)
                    })
                })
                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                .toFormat('webp')
                .save(`./sticker/${sender}.webp`)
            } else if (isQuotedSticker) {
                reply(mess.wait)
                await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${sender}.webp`)
                exif.create(name_exif, author_exif, `stickerwm_${sender}`)
                exec(`webpmux -set exif ./sticker/stickerwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                    if (error) return reply(mess.error.api)
                    await conn.sendMessage(from, { sticker: { url: `./sticker/${sender}.webp`}}, {quoted: msg})
                    if (fs.existsSync(`./sticker/${sender}.webp`)) fs.unlinkSync(`./sticker/${sender}.webp`)
                    if (fs.existsSync(`./sticker/stickerwm_${sender}.exif`)) fs.unlinkSync(`./sticker/stickerwm_${sender}.exif`)
                    limitAdd(sender, limit)
                })
            } else {
                reply(`Kirim/Balas gambar/video/sticker dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
            }
            break
        case prefix+'toimg': case prefix+'toimage': case prefix+'tovid': case prefix+'tovideo':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!isQuotedSticker) return reply(`Reply stikernya!`)
            var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
            var buffer = Buffer.from([])
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk])
            }
            var rand1 = 'sticker/'+getRandom('.webp')
            var rand2 = 'sticker/'+getRandom('.png')
            fs.writeFileSync(`./${rand1}`, buffer)
            if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                reply(mess.wait)
                exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                    fs.unlinkSync(`./${rand1}`)
                    if (err) return reply(mess.error.api)
                    conn.sendMessage(from, { image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                    limitAdd(sender, limit)
                    fs.unlinkSync(`./${rand2}`)
                })
            } else {
                reply(mess.wait)
                webp2mp4File(`./${rand1}`).then(async(data) => {
                    fs.unlinkSync(`./${rand1}`)
                    conn.sendMessage(from, { video: await getBuffer(data.data) }, { quoted: msg })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'tomp3': case prefix+'toaudio':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (isVideo || isQuotedVideo) {
                let media = await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${Date.now()}.mp4`)
                reply(mess.wait)
                let ran = './sticker/'+getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
                    fs.unlinkSync(media)
                    if (err) { fs.unlinkSync(ran); return reply('Gagal :V') }
                    conn.sendMessage(from, { audio: fs.readFileSync(ran),  mimetype: 'audio/mp4', fileName: `${sender.split("@")[0]}ToMp3`, ptt: args[1] == '--ptt' ? true : false }, { quoted: msg })
                    limitAdd(sender, limit)
                    fs.unlinkSync(ran)
                })
            } else {
                reply(`Kirim/reply video dengan caption ${command} atau ${command} --ptt`)
            }
            break
        case prefix+'attp':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} yunusd`)
            if (q.length > 75) return reply(`Teksnya terlalu panjang`)
            var data = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
            var rand2 = 'sticker/'+getRandom('.webp')
            fs.writeFileSync(`./${rand2}`, data)
            exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
                conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                limitAdd(sender, limit)
                fs.unlinkSync(`./${rand2}`)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ ATTP ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'ttp':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *teks*\n\n_Contoh_\n\n${command} yunusd`)
            if (q.length > 75) return reply(`Teksnya kepanjangan`)
            getBuffer(`https://api.xteam.xyz/ttp?file&text=${encodeURIComponent(q)}`)
            .then( res => {
                if (res == undefined) return reply(mess.error.api)
                conn.sendImageAsSticker(from, res, msg, { packname, author })
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ TTP ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'emojimix': case prefix+'mixemoji':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *emoji1+emoji2*\n\n_Contoh_\n\n${command} 😅+😝`)
            var emo1 = q.split("+")[0]
            var emo2 = q.split("+")[1]
            if (!isEmoji(emo1) || !isEmoji(emo2)) return reply(`Itu bukan emoji!`)
            fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emo1)}_${encodeURIComponent(emo2)}`)
            .then(data => {
                sendStickerFromUrl(from, data.results[0]. url, packname, author, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ EMOJIMIX ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'nulis':
            reply(`*Pilihan Fitur Nulis*

1. ${prefix}nuliskiri
2. ${prefix}nuliskanan
3. ${prefix}foliokiri
4. ${prefix}foliokanan

Contoh:
${prefix}nuliskiri Jangan Lupa Donasi`)
            break
        case prefix+'nuliskiri': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\n_Contoh_\n\n${command} yunusd`)
            reply(mess.wait)
            const tulisan = body.slice(11)
            const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
            spawn('convert', [
                './media/nulis/images/buku/sebelumkiri.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '22',
                '-interline-spacing',
                '2',
                '-annotate',
                '+140+153',
                fixHeight,
                './media/nulis/images/buku/setelahkiri.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    conn.sendMessage(from, { caption: 'Jangan males pak...', image: fs.readFileSync('./media/nulis/images/buku/setelahkiri.jpg') }, { quoted: msg, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'nuliskanan': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\n_Contoh_\n\n${command} yunusd`)
            reply(mess.wait)
            const tulisan = body.slice(12)
            const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
            spawn('convert', [
                './media/nulis/images/buku/sebelumkanan.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '2',
                '-annotate',
                '+128+129',
                fixHeight,
                './media/nulis/images/buku/setelahkanan.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    conn.sendMessage(from, { caption: 'Jangan males pak...', image: fs.readFileSync('./media/nulis/images/buku/setelahkanan.jpg') }, { quoted: msg, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'foliokiri': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\n_Contoh_\n\n${command} yunusd`)
            reply(mess.wait)
            const tulisan = body.slice(11)
            const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
            spawn('convert', [
                './media/nulis/images/folio/sebelumkiri.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '1720x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '4',
                '-annotate',
                '+48+185',
                fixHeight,
                './media/nulis/images/folio/setelahkiri.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    conn.sendMessage(from, { caption: 'Jangan males pak...', image: fs.readFileSync('./media/nulis/images/folio/setelahkiri.jpg') }, { quoted: msg, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'foliokanan': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} text\n\n_Contoh_\n\n${command} yunusd`)
            reply(mess.wait)
            const tulisan = body.slice(12)
            const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
            spawn('convert', [
                './media/nulis/images/folio/sebelumkanan.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '3',
                '-annotate',
                '+89+190',
                fixHeight,
                './media/nulis/images/folio/setelahkanan.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    conn.sendMessage(from, { caption: 'Jangan males pak...', image: fs.readFileSync('./media/nulis/images/folio/setelahkanan.jpg') }, { quoted: msg, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'upload': case prefix+'tourl': case prefix+'tolink':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            var media = null
            if (isQuotedSticker) {
                var fileName = 'sticker'+makeid(10)+'.webp'
                var media = await conn.downloadAndSaveMediaMessage(msg, 'sticker', `./sticker/${fileName}`)
            } else if (isImage || isQuotedImage) {
                var fileName = 'image'+makeid(10)+'.jpg'
                var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${fileName}`)
            } else if (isVideo || isQuotedVideo) {
                var fileName = 'video'+makeid(10)+'.mp4'
                var media = await conn.downloadAndSaveMediaMessage(msg, 'video', `./sticker/${fileName}`)
            } else if (isQuotedAudio) {
                var fileName = 'audio'+makeid(10)+'.mp3'
                var media = await conn.downloadAndSaveMediaMessage(msg, 'audio', `./sticker/${fileName}`)
            } else {
                return reply(`Kirim atau balas Sticker/Foto/Video/Audio yang ingin dijadikan url dengan caption ${command}`)
            }
            if (media !== null) {
                reply(mess.wait)
                var { name, url, size } = await UploadFileUgu(media)
                size = bytesToSize(size)
                var teks = `*UPLOAD SUCCES*\n\n*Url :* ${url}\n*Name :* ${name}\n*Size :* ${size}`
                reply(teks)
                limitAdd(sender, limit)
                fs.unlinkSync(media)
            } else {
                reply(mess.error.api)
                fs.unlinkSync(media)
            }
            break
        case prefix+'listbahasa':
            var clear = ["auto", "isSupported", "getCode"]
            var teks = `*List Bahasa Yang Tersedia*\n\n`
            for (let i in translate.languages) {
                if (!clear.includes(i)) {
                    teks += `*${i}* untuk ${translate.languages[i]}\n`
                }
            }
            reply(teks)
            break
        case prefix+'translate': case prefix+'tr':{
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunaka  dengan cara ${command} *kodebahasa teks* atau ${command} *kodebahasa <reply message>*\n\n_Contoh_\n\n${command} id Hello World`)
            if (isQuotedMsg) {
                let bahasanya = args[1].toString()
                const trans = await translate(quotedMsg.chats, {
                    to: bahasanya
                })
                .then((res) => reply(res.text))
                .catch((err) => {
                    reply(`Kode bahasa salah, ketik ${prefix}listbahasa untuk melihat bahasa yang tersedia!`)
                })
                trans
                limitAdd(sender, limit)
            } else {
                if (args.length < 3) return reply(`Gunaka  dengan cara ${command} *kodebahasa teks* atau ${command} *kodebahasa <reply message>*\n\n_Contoh_\n\n${command} id Hello World`)
                let bahasanya = args[1].toString()
                let textnya = q.slice(args[1].length + 1, q.length)
                const trans = await translate(textnya, {
                    to: bahasanya
                })
                .then((res) => reply(res.text))
                .catch((err) => {
                    reply(`Kode bahasa salah, ketik ${prefix}listbahasa untuk melihat bahasa yang tersedia!`)
                })
                trans
                limitAdd(sender, limit)
            }
            }
            break

        // Store Menu
        case prefix+'list':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    })
                }
            }
            var listMsg = {
                text: `${ucapanWaktu} @${sender.split("@")[0]}`,
                buttonText: 'Click Here!',
                footer: `*List ${groupName}*\n\n⏳ ${jam}\n📆 ${tanggal}`,
                mentions: [sender],
                sections: [{
                    title: groupName, rows: arr_rows
                }]
            }
            conn.sendMessage(from, listMsg)
            break
        case prefix+'addlist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]                
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
            if (isImage || isQuotedImage) {
                let media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Sukses set list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses set list message dengan key : *${args1}*`)
            }
            break
        case prefix+'dellist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            delResponList(from, q, db_respon_list)
            reply(`Sukses delete list message dengan key *${q}*`)
            break
        case prefix+'updatelist': case prefix+'update':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
            if (isImage || isQuotedImage) {
                let media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        updateResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Sukses update list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses update respon list dengan key *${args1}*`)
            }
            break
        case prefix+'jeda': {
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length < 2) return reply(`kirim ${command} waktu\nContoh: ${command} 30m\n\nlist waktu:\ns = detik\nm = menit\nh = jam\nd = hari`)
            opengc[from] = { id: from, time: Date.now() + toMs(args[1]) }
            fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            conn.groupSettingUpdate(from, "announcement")
            .then((res) => reply(`Sukses, group akan dibuka ${args[1]} lagi`))
            .catch((err) => reply('Error'))
            }
            break

        // Kalkulator
        case prefix+'tambah':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one + nilai_two}`)
            break
        case prefix+'kurang':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one - nilai_two}`)
            break
        case prefix+'kali':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one * nilai_two}`)
            break
        case prefix+'bagi':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one / nilai_two}`)
            break

        // Proses & Done
        case 'p': case 'proses':
            if (!isGroup) return
            if (!isOwner && !isGroupAdmins) return
            if (!isQuotedMsg) return
            let proses = `「 *TRANSACTION-PENDING* 」\n\n✅ STATUS? *PROCESS*\n📆 ${tanggal}\n🕐 ${jam}\n\n📌 Pesanan :\n${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split('@')[0]} sedang diproses, silahkan tunggu sebentar`
            const getTextP = getTextSetProses(from, set_proses);
            if (getTextP !== undefined) {
                mentions(getTextP.replace('@pesan', quotedMsg.chats).replace('@nama', quotedMsg.sender.split("@")[0]).replace('@jam', jam).replace('@tanggal', tanggal), [quotedMsg.sender], true);
            } else {
                mentions(proses, [quotedMsg.sender], true)
            }
            break
        case 'd': case 'done':
            if (!isGroup) return
            if (!isOwner && !isGroupAdmins) return
            if (!isQuotedMsg) return
            let sukses = `「 *TRANSACTION-SUCCESS* 」\n\n✅ STATUS? *DONE*\n📆 ${tanggal}\n🕐 ${jam}\n\n📌 Pesanan :\n${quotedMsg.chats}\n\nTerimakasih @${quotedMsg.sender.split('@')[0]} sudah order di ${groupName}\nDitunggu next ordernya🙏`
            const getTextD = getTextSetDone(from, set_done);
            if (getTextD !== undefined) {
                mentions(getTextD.replace('@pesan', quotedMsg.chats).replace('@nama', quotedMsg.sender.split("@")[0]).replace('@jam', jam).replace('@tanggal', tanggal), [quotedMsg.sender], true);
            } else {
                mentions(sukses, [quotedMsg.sender], true)
            }
            break
        case prefix+'setproses': case prefix+'setp':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_p*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama`)
            if (isSetProses(from, set_proses)) return reply(`Set proses already active`)
            addSetProses(q, from, set_proses)
            reply(`Successfully set proses!`)
            break
        case prefix+'changeproses': case prefix+'changep':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_p*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama`)
            if (isSetProses(from, set_proses)) {
                changeSetProses(q, from, set_proses)
                reply(`Sukses change set proses teks!`)
            } else {
                addSetProses(q, from, set_proses)
                reply(`Sukses change set proses teks!`)
            }
            break
        case prefix+'delsetproses': case prefix+'delsetp':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetProses(from, set_proses)) return reply(`Belum ada set proses di sini..`)
            removeSetProses(from, set_proses)
            reply(`Sukses delete set proses`)
            break
        case prefix+'setdone': case prefix+'setd':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_d*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama`)
            if (isSetDone(from, set_done)) return reply(`Set done already active`)
            addSetDone(q, from, set_done)
            reply(`Successfully set done!`)
            break
        case prefix+'changedone': case prefix+'changed':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_d*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama`)
            if (isSetDone(from, set_done)) {
                changeSetDone(q, from, set_done)
                reply(`Sukses change set done teks!`)
            } else {
                addSetDone(q, from, set_done)
                reply(`Sukses change set done teks!`)
            }
            break
        case prefix+'delsetdone': case prefix+'delsetd':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetDone(from, set_done)) return reply(`Belum ada set done di sini..`)
            removeSetDone(from, set_done)
            reply(`Sukses delete set done`)
            break

        // Set Bot
        case 'bot':
            var bot = `Iya kak, Ada yang bisa ${botName} bantu?\nKetik ${prefix}menu untuk menampilkan list menu`
            const getTextB = getTextSetBot(from, set_bot);
            if (getTextB !== undefined) {
                var pull_pesan = (getTextB.replace('@bot', botName).replace('@owner', ownerName).replace('@jam', jam).replace('@tanggal', tanggal))
                conn.sendMessage(from, { text: `${pull_pesan}` }, { quoted: msg })
            } else {
                conn.sendMessage(from, { text: bot }, { quoted: msg })
            }
            break
        case prefix+'setbot':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_bot*\n\n_Contoh_\n\n${command} bot name @bot, owner name @owner`)
            if (isSetBot(from, set_bot)) return reply(`Set bot already active`)
            addSetBot(q, from, set_bot)
            reply(`Successfully set bot!`)
            break
        case prefix+'changebot':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_p*\n\n_Contoh_\n\n${command} pesanan @pesan, tag orang @nama`)
            if (isSetBot(from, set_bot)) {
                changeSetBot(q, from, set_bot)
                reply(`Sukses change set bot teks!`)
            } else {
                addSetBot(q, from, set_bot)
                reply(`Sukses change set bot teks!`)
            }
            break
        case prefix+'delsetbot':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetBot(from, set_bot)) return reply(`Belum ada set Bot di sini..`)
            removeSetBot(from, set_bot)
            reply(`Sukses delete set bot`)
            break

        // Open & Close
        case prefix+'open': case prefix+'buka':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            conn.groupSettingUpdate(from, 'not_announcement')
            .then((res) => {
                const textOpen = getTextSetOpen(from, set_open);
                if (textOpen !== undefined) {
                    reply(textOpen);
                } else {
                    reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
                }
            })
            .catch((err) => reply('Error'))
			break
        case prefix+'close': case prefix+'tutup':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
		    conn.groupSettingUpdate(from, 'announcement')
		    .then((res) => {
                const textClose = getTextSetClose(from, set_close);
                if (textClose !== undefined) {
                    reply(textClose);
                } else {
                    reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
                }
            })
            .catch((err) => reply('Error'))
		    break
        case prefix+'setopen':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_open*\n\n_Contoh_\n\n${command} Group telah di buka`)
            if (isSetOpen(from, set_open)) return reply(`Set Open already active`)
            addSetOpen(q, from, set_open)
            reply(`Successfully set Open!`)
            break
        case prefix+'changeopen':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_open*\n\n_Contoh_\n\n${command} Group telah di buka`)
            if (isSetOpen(from, set_open)) {
                changeSetOpen(q, from, set_open)
                reply(`Sukses change set Open teks!`)
            } else {
                addSetOpen(q, from, set_open)
                reply(`Sukses change set Open teks!`)
            }
            break
        case prefix+'delsetopen':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetOpen(from, set_open)) return reply(`Belum ada set Open di sini..`)
            removeSetOpen(from, set_open)
            reply(`Sukses delete set Open`)
            break
        case prefix+'setclose':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_close*\n\n_Contoh_\n\n${command} Group telah di tutup`)
            if (isSetClose(from, set_close)) return reply(`Set Close already active`)
            addSetClose(q, from, set_close)
            reply(`Successfully set Close!`)
            break
        case prefix+'changeclose':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_close*\n\n_Contoh_\n\n${command} Group telah di tutup`)
            if (isSetClose(from, set_close)) {
                changeSetClose(q, from, set_close)
                reply(`Sukses change set Close teks!`)
            } else {
                addSetClose(q, from, set_close)
                reply(`Sukses change set Close teks!`)
            }
            break
        case prefix+'delsetclose':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetClose(from, set_close)) return reply(`Belum ada set Close di sini..`)
            removeSetClose(from, set_close)
            reply(`Sukses delete set Close`)
            break

        // Stalker Menu
        case prefix+'ffid':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 646675175`)
            stalkff(args[1]).then( data => {
                let epep = `*🔎 CHECK NICK FREE FIRE 🔍*

ID : ${data.id}
Nick : ${data.nickname}`
                reply(epep)
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ NICKFF ]', 'red'), err)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'mlid':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            var args1 = q.split("/")[0]
            var args2 = q.split("/")[1]
            if (!q.includes("/")) return reply(`Gunakan dengan cara ${command} *id/server*\n\n_Contoh_\n\n${command} 617243212/8460`)
            stalkml(args1, args2).then( data => {
                let emel = `*🔎 CHECK NICK MOBILE LEGENDS 🔍*

ID : ${data.id}
ZoneID : ${data.zoneId}
Nick : ${data.nickname}`
                reply(emel)
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ NICKML ]', 'red'), err)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'pubgid':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 5217933016`)
            axios.get(`https://api.lolhuman.xyz/api/pubg/${args[1]}?apikey=${lolkey}`)
            .then((data) => {
                let pubg = `*🔎 CHECK NICK PUBG 🔍*

ID : ${args[1]}
Nick : ${data.data.result}`
                reply(pubg)
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ PUBG ]', 'red'), err)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'higgsid':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 291756557`)
            axios.get(`https://api.lolhuman.xyz/api/higghdomino/${args[1]}?apikey=${lolkey}`)
            .then((data) => {
                let domino = `*🔎 CHECK NICK HIGGS DOMINO 🔍*

ID : ${args[1]}
Nick : ${data.data.result}`
                reply(domino)
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ HDI ]', 'red'), err)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'codmid':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 6290150021186841472`)
            fetchJson(`https://zenzapis.xyz/stalker/nickcod?apikey=948e636b5d&query=${args[1]}`)
            .then((data) => {
                let cod = `*🔎 CHECK NICK CALL OF DUTY 🔍*

ID : ${data.result.gameId}
Nick : ${data.result.userName}`
                reply(cod)
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ CODM ]', 'red'), err)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'pbid':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} riio46`)
            fetchJson(`https://zenzapis.xyz/stalker/nickpb?apikey=948e636b5d&query=${args[1]}`)
            .then((data) => {
                let pb = `*🔎 CHECK NICK POINTBLANK 🔍*

ID : ${data.result.gameId}
Nick : ${data.result.userName}`
                reply(pb)
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ PB ]', 'red'), err)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'aovid':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 293306941441181`)
            fetchJson(`https://zenzapis.xyz/stalker/nickaov?apikey=948e636b5d&query=${args}`)
            .then((data) => {
                let aov = `*🔎 CHECK NICK ARENA OF VALOR 🔍*

ID : ${data.result.gameId}
Nick : ${data.result.userName}`
                reply(aov)
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ AOV ]', 'red'), err)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'sausageid':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 7fs17x`)
            fetchJson(`https://zenzapis.xyz/stalker/nicksausage?apikey=948e636b5d&query=${args[1]}`)
            .then((data) => {
                let sosis = `*🔎 CHECK NICK SAUSAGE MAN 🔍*

ID : ${data.result.gameId}
Nick : ${data.result.userName}`
                reply(sosis)
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ SAUSAGE ]', 'red'), err)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'zepetoid':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} zepeto`)
            fetchJson(`https://zenzapis.xyz/stalker/nickzepeto?apikey=948e636b5d&query=${args[1]}`)
            .then((data) => {
                let zpto = `*🔎 CHECK NICK ZEPETO 🔍*

ID : ${data.result.gameId}
Nick : ${data.result.userName}`
                reply(zpto)
                limitAdd(sender, limit)
            })
            .catch((err) => {
                console.log(color('[ ZEPETO ]', 'red'), err)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'igstalk':{
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *username*\n\n_Contoh_\n\n${command} iamyunusdid_`)
            reply(mess.wait)
            igstalk(args[1]).then( data => {
                var text_ig = `*INSTAGRAM-STALKER*\n\n• Username : ${args[1]}\n• Fullname : ${data.data.fullname !== undefined ? data.data.fullname : '-'}\n• Followers : ${data.data.follower}\n• Followings : ${data.data.following}\n• Timeline : ${data.data.timeline}\n\n*BIOGRAPHY*\n${data.data.bio}\n\n*ACCOUNT-INFO*\n• Private : ${data.data.private}\n• Verified : ${data.data.verified}\n\n*URL*\nhttps://instagram.com/${args[1]}`
                conn.sendMessage(from, { image: { url: data.profile.high }, caption: text_ig }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((err) => {
                reply(mess.error.api)
                console.log(color('[ IGSTALK ]', 'red'), err)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            }
            break
        case prefix+'youtubestalk': case prefix+'ytstalk':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *nama_ch*\n\n_Contoh_\n\n${command} yunusd ID`)
            reply(mess.wait)
            var { image, subCount, subCountLabel, videoCount, name } = (await yts(q)). channels[0]
            conn.sendMessage(from, { text: `*YOUTUBE-STALK*\n\nNama : ${name}\nSubscribers : ${subCountLabel !== undefined ? subCountLabel : 'Tidak Terdeteksi'}\nVideo Count : ${videoCount}` }, { quoted: msg })
            limitAdd(sender, limit)
            break
        case prefix+'githubstalk': case prefix+'ghstalk':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *username*\n\n_Contoh_\n\n${command} yunusd`)
            reply(mess.wait)
            require('../lib/ghstalk')(args[1]).then( data => {
                var { avatar_url, html_url, type, site_admin, name, company, blog, location, email, bio, twitter_username, public_repos, public_gists, followers, following, created_at, updated_at } = data
                var txt_gh = `*GITHUB-STALKER*

• Name : ${name}
• Username : ${args[1]}
• Avatar : ${avatar_url}
• Company : ${company}
• Location : ${location}
• Email : ${email}
• Twitter Username : ${twitter_username}
• Blog : ${blog}
• Site Admins : ${site_admin}
• Public Repository : ${public_repos}
• Public Gists : ${public_gists}
• Followers : ${followers}
• Followings : ${following}

*BIOGRAPHY*
${bio ? bio : '-'}

*ACCOUNT-INFO*
• Type : ${type}
• Created At : ${created_at}
• Updated At : ${updated_at}

${html_url}`
                conn.sendMessage(from, { image: { url: avatar_url }, caption: txt_gh }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((err) => {
                reply(mess.error.api)
                console.log(color('[ GITHUBSTALK ]', 'red'), err)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'twitterstalk': case prefix+'twtstalk':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *username*\n\n_Contoh_\n\n${command} jokowi`)
            require('../lib/twitterstalk')(args[1]).then( data => {
                var { name, username, followers, following, media, statuses, description } = data
                var txt_twit = `*TWITTER STALKER*\n\n• Name : ${name}\n• Username : ${username}\n• Followers : ${followers}\n• Following : ${following}\n• Media : ${media}\n• Statuses : ${statuses}\n• Description : ${description}`
                conn.sendMessage(from, { image: { url: data.pp_user }, caption: txt_twit }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ TWITTER STALK ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'tiktokstalk': case prefix+'tiktokstalker':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *username*\n\n_Contoh_\n\n${command} yunusdid404`)
            reply(mess.wait)
            require('../lib/tiktokstalk').TiktokStalk(args[1]).then( data => {
                var ts = `*TIKTOK STALK*\n\n• Username : ${data.user.username}\n• Fullname : ${data.user.fullname}\n• Followers : ${data.user.follower}\n\n*BIOGRAPHY*\n${data.user.bio ? data.user.bio : '-'}`
                conn.sendMessage(from, { image: { url: data.user.profilepic }, caption: ts }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ TIKTOK STALK ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break

        // Anonymous Chat
        case prefix+'anonymous':
            if (isGroup) return reply(mess.OnlyPM)
            var but = [
                { urlButton: { displayText: "Instagram", url: "https://instagram.com/${author}" }},
                { quickReplyButton: { displayText: "SEARCH", id: prefix+'start' }}
            ]
            var teks = `Hai ${pushname !== undefined ? pushname : 'Kak'} Selamat Datang di Anonymous Chat\n\nKetik ${prefix}search untuk mencari Teman Chat anda, atau bisa pencet tombol Search dibawah`
            conn.sendMessage(from, { text: teks, footer: `${footer}`, templateButtons: but })
            break
        case prefix+'start': case prefix+'search':
            if (isGroup) return reply(mess.OnlyPM)
            var rumss = Object.values(anonymous).find(room => anonyCheck(sender, room))
            var rooms = Object.values(anonymous).find(room => anonyCheck(sender, room) && room.state == 'CHATTING')
                if (rooms) {
                    var but = [
                        { buttonId: prefix+'stop', buttonText: { displayText: "STOP" }, type: 1 },
                        { buttonId: prefix+'skip', buttonText: { displayText: "NEXT" }, type: 1 }
                    ]
                    var teks = `[⚠️] Kamu masih dalam sesi chat dengan partner! ❌`
                    return conn.sendMessage(from, { text: teks, footer: `${footer}`, buttons: but })
                } else if (rumss) {
                    var teks = `[🔎] Mohon tunggu sedang mencari teman chat`
                    var but = [ { buttonId: prefix+'stop', buttonText: { displayText: "STOP" }, type: 1 } ]
                    return conn.sendMessage(from, { text: teks, footer: `${footer}`, buttons: but })
                }
                var roomm = Object.values(anonymous).find(room => room.state == "WAITING" && !anonyCheck(sender, room))
                if (roomm) {
                    var but = [
                        { buttonId: prefix+'stop', buttonText: { displayText: "STOP" }, type: 1 },
                        { buttonId: prefix+'skip', buttonText: { displayText: "NEXT" }, type: 1 }
                    ]
                    roomm.b = sender
                    roomm.state = "CHATTING"
                    var teks = `_Pasangan Ditemukan 🐼_\n${prefix}skip -- _cari pasangan baru_\n${prefix}stop -- _hentikan dialog ini_`
                    await conn.sendMessage(roomm.a, { text: teks, footer: `${footer}`, buttons: but })
                    await conn.sendMessage(roomm.b, { text: teks, footer: `${footer}`, buttons: but })
                } else if (!rooms) {
                    let id = + new Date
                    anonymous[id] = {
                        id,
                        a: sender,
                        b: '',
                        state: "WAITING"
                    }
                    var but = [
                        { buttonId: prefix+'stop', buttonText: { displayText: "STOP" }, type: 1 }
                    ]
                    var teks = `[🔎] Mohon tunggu sedang mencari teman chat`
                    await conn.sendMessage(from, { text: teks, footer: `${footer}`, buttons: but })
                }
            break
        case prefix+'stop':
            if (isGroup) return reply(mess.OnlyPM)
            var roomo = Object.values(anonymous).find(room => anonyCheck(sender, room))
            if (!roomo) {
                var but = [
                    { buttonId: prefix+'start', buttonText: { displayText: "SEARCH" }, type: 1 }
                ]
                var teks = `[⚠️] Kamu belum pernah mulai chat! ❌`
                await conn.sendMessage(from, { text: teks, footer: `${footer}`, buttons: but })
            } else {
                var but = [
                    { buttonId: prefix+'start', buttonText: { displayText: "SEARCH" }, type: 1 }
                ]
                var teks = `[✅] Berhasil memberhentikan chat`
                var teks2 = `[⚠️] Sesi chat ini telah diberhentikan oleh teman chat kamu`
                await conn.sendMessage(from, { text: teks, footer: `${footer}`, buttons: but })
                let other = anonyOther(sender, roomo)
                if (other) await conn.sendMessage(other, { text: teks2, footer: `${footer}`, buttons: but })
                delete anonymous[roomo.id]
            }
            break
        case prefix+'next': case prefix+'skip':
            if (isGroup) return reply(mess.OnlyPM)
            let romeo = Object.values(anonymous).find(room => anonyCheck(sender, room))
            var but = [
                { buttonId: prefix+'start', buttonText: { displayText: "SEARCH" }, type: 1 }
            ]
            if (!romeo) {
                var teks = `[⚠️] Kamu belum pernah memulai chat! ❌`
                return await conn.sendMessage(from, { text: teks, footer: `${footer}`, buttons: but })
            } else {
                let other = anonyOther(sender, romeo)
                var teks1 = `[⚠️] Sesi chat ini telah diberhentikan oleh teman chat kamu! ❌`
                if (other) await conn.sendMessage(other, { text: teks1, footer: `${footer}`, buttons: but })
                delete anonymous[romeo.id]
            }
            let room = Object.values(anonymous).find(room => room.state == "WAITING" && !anonyCheck(sender, room))
            if (room) {
                var but = [
                    { buttonId: prefix+'stop', buttonText: { displayText: "STOP" }, type: 1 },
                    { buttonId: prefix+'skip', buttonText: { displayText: "NEXT" }, type: 1 }
                ]
                room.b = sender
                room.state = "CHATTING"
                var teks = `_Pasangan Ditemukan 🐼_\n${prefix}skip -- _cari pasangan baru_\n${prefix}stop -- _hentikan dialog ini_`
                await conn.sendMessage(room.a, { text: teks, footer: `${footer}`, buttons: but })
                await conn.sendMessage(room.b, { text: teks, footer: `${footer}`, buttons: but })
            } else {
                let id = + new Date
                anonymous[id] = {
                    id,
                    a: sender,
                    b: '',
                    state: "WAITING"
                }
                var but = [
                    { buttonId: prefix+'stop', buttonText: { displayText: "STOP" }, type: 1 }
                ]
                var teks = `[🔎] Mohon tunggu sedang mencari teman chat`
                await conn.sendMessage(from, { text: teks, footer: `${footer}`, buttons: but })
            }
            break
        case prefix+'sendprofile': case prefix+'sendprofil':
            if (isGroup) return reply(mess.OnlyPM)
            let romoe = Object.values(anonymous).find(room => anonyCheck(sender, room) && room.state == 'CHATTING')
            var but = [
                { buttonId: prefix+'start', buttonText: { displayText: "SEARCH" }, type: 1 }
            ]
            if (!romoe) {
                var teks = `[⚠️] Kamu belum pernah memulai chat! ❌`
                await conn.sendMessage(from, { text: teks, footer: `${footer}`, buttons: but })
            } else {
                let rms = Object.values(anonymous).find(room => [room.a, room.b].includes(sender) && room.state == "CHATTING")
                var partnerJID = anonyOther(sender, rms)
                var res = await conn.sendContact(partnerJID, [sender.split("@")[0]])
                conn.sendMessage(from, { text: '[✅] Berhasil mengirim profil ke teman chat anda!' }, { quoted: msg })
                conn.sendMessage(partnerJID, { text: '[👨👩] Teman chat kamu memberikan kontak profil nya!' }, { quoted: res })
            }
            break

        // Downloaders Menu
        case prefix+'play':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *query*\n_Contoh_\n\n${command} monokrom`)
            reply(mess.wait)
            await sendPlay(from, q)
            limitAdd(sender, limit)
            break
        case prefix+'ytmp4':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://youtu.be/J9YG0LxpSqM`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            args[1] = args[1].includes('shorts') ? args[1].replace('https://youtube.com/shorts/', 'https://youtu.be/') : args[1]
            ytv(args[1]).then(async(data) => {
                var teks = `*YOUTUBE-DOWNLOADERS*📁\n\n» Title : ${data.title}\n» Quality : 360p\n» Size : ${data.filesizeF}\n» Urls : ${args[1]}\n\n_Wait a minute, the media will be sent soon_`
                if (Number(data.filesize) >= 30000) {
                    var res = await axios.get(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
                    var lrge = `*YOUTUBE-DOWNLOADERS*📁\n\n» Title : ${data.title}\n» Quality : 360p\n» Size : ${data.filesizeF}\n» Urls : ${args[1]}\n» Downloads ${res.data}\n\n_for larger sizes, presented in the form of a link_`
                    conn.sendMessage(from, { image: { url: data.thumb }, caption: lrge }, { quoted: msg })
                    limitAdd(sender, limit)
                } else {
                    conn.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                    conn.sendMessage(from, { video: await getBuffer(data.dl_link) }, { quoted: msg })
                    limitAdd(sender, limit)
                }
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ YTMP4 ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'ytmp3':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url\n\n_Contoh_\n\n${command} https://youtu.be/J9YG0LxpSqM`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            args[1] = args[1].includes('shorts') ? args[1].replace('https://youtube.com/shorts/', 'https://youtu.be/') : args[1]
            yta(args[1]).then(async(data) => {
                var teks = `*YOUTUBE-DOWNLOADERS*📁\n\n» Title : ${data.title}\n» Quality : 128p\n» Size : ${data.filesizeF}\n» Urls : ${args[1]}\n\n_Wait a minute, the media will be sent soon_`
                if (Number(data.filesize) >= 30000) {
                    var res = await axios.get(`https://tinyurl.com/api-create.php?url=${data.dl_link}`)
                    var lrge = `*YOUTUBE-DOWNLOADERS*📁\n\n» Title : ${data.title}\n» Quality : 360p\n» Size : ${data.filesizeF}\n» Urls : ${args[1]}\n» Downloads ${res.data}\n\n_for larger sizes, presented in the form of a link_`
                    conn.sendMessage(from, { image: { url: data.thumb }, caption: lrge }, { quoted: msg })
                    limitAdd(sender, limit)
                } else {
                    conn.sendMessage(from, { image: { url: data.thumb }, caption: teks }, { quoted: msg })
                    conn.sendMessage(from, { audio: await getBuffer(data.dl_link), mimetype: 'audio/mp4' }, { quoted: msg })
                    limitAdd(sender, limit)
                }
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ YTMP3 ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'ig': case prefix+'igdl': case prefix+'instagram':{
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://www.instagram.com/p/CWR_S4BF0mt/?utm_medium=copy_link`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('instagram.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            require('../lib/downloaderAll').downloaderAll(args[1]).then(async(data) => {
                for (var i of data.media) {
                    if (i.extension == 'mp4') {
                        conn.sendMessage(from, { video: { url: i.url }, caption: data.title }, { quoted: msg })
                    } else if (i.extension == 'jpg') {
                        conn.sendMessage(from, { image: { url: i.url }, caption: data.title }, { quoted: msg })
                    }
                }
                limitAdd(sender, limit)
            }).catch((e) => {
                console.log(color('[ IGDL ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            }
            break
        case prefix+'igstory': case prefix+'igs': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *username*\n\n_Contoh_\n\n${command} hosico_cat`)
            reply(mess.wait)
            if (args[1].startsWith("@")) args[1] = args[1].replace("@", "")
            IgStories(args[1]).then(async(data) => {
                for (let i of data) {
                    var medias = await getBuffer(i.url)
                    if (i.type == "101") {
                        conn.sendMessage(from, { video: medias })
                    } else {
                        conn.sendMessage(from, { image: medias })
                    }
                }
                limitAdd(sender, limit)
            }).catch((err) => {
                reply(mess.error.api)
                console.log(color('[ IGSTORY ]', 'red'), err)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            }
            break
        case prefix+'tiktok': case prefix+'ttdl': case prefix+'tiktokdl': case prefix+'tt': case prefix+'tiktoknowm': case prefix+'ttnowm':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://vt.tiktok.com/ZSduDmwCq/?k=1`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('tiktok.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            scrp.Tiktok(args[1]).then(async(data) => {
                var bt = [ { buttonId: `${prefix}ttmp3 ${args[1]}`, buttonText: { displayText: "🎧 Audio" }, type: 1 } ]
                conn.sendMessage(from, { video: { url: data.nowm }, caption: `*TIKTOK-DOWNLOADERS*\n\n• Title : ${data.title}\n• Author : ${data.author}`, footer: 'Click the button below to change the video to audio', buttons: bt }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ TIKTOK ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'tiktokaudio': case prefix+'ttmp3': case prefix+'tiktokmusic': case prefix+'tiktokmp3':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://vt.tiktok.com/ZSduDmwCq/?k=1`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('tiktok.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            scrp.Tiktok(args[1]).then(async(data) => {
                conn.sendMessage(from, { audio: { url: data.nowm }, mimetype: 'audio/mp4' }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ TIKTOKMP3 ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'twitter': case prefix+'twitterdl': case prefix+'twtdl': case prefix+'twt':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://twitter.com/LucuLucuVideo/status/1542123908052045825?s=20`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('twitter.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            scrape.twitter(args[1]).then( data => {
                var butwt = [ { buttonId: prefix+`twtmp3 ${args[1]}`, buttonText: { displayText: '🎧 Audio' }, type: 1 } ]
                conn.sendMessage(from, { video: { url: data.quality_720 }, caption: data.caption, footer: footer, buttons: butwt }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((err) => {
                reply(mess.error.api)
                console.log(color('[ TWITTER ]', 'red'), err)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'twtmp3': case prefix+'twitteraudio': case prefix+'twittermusic':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://twitter.com/LucuLucuVideo/status/1542123908052045825?s=20`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('twitter.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            scrape.twitter(args[1]).then( data => {
                conn.sendMessage(from, { audio: { url: data.quality_720 }, mimetype: 'audio/mp4', ptt: true }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((err) => {
                reply(mess.error.api)
                console.log(color('[ TWITTER ]', 'red'), err)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'facebook': case prefix+'fbdl': case prefix+'fb':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix} limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://www.facebook.com/groups/1013627429578268/permalink/1110672193207124/?app=fbl`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('facebook.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            scrape.facebook(args[1]).then( data => {
                var but_fb = [ { buttonId: prefix+'fbmp3 ' + args[1], buttonText: { displayText: '🎧 Audio' }, type: 1 } ]
                conn.sendMessage(from, { video: { url: data.sd }, caption: data.title, footer: 'click the button below to change the video to audio', buttons: but_fb }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ FACEBOOK ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'facebookaudio': case prefix+'facebookmusic': case prefix+'fbmp3':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix} limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://www.facebook.com/groups/1013627429578268/permalink/1110672193207124/?app=fbl`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('facebook.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            scrape.facebook(args[1]).then( data => {
                conn.sendMessage(from, { audio: { url: data.hd }, mimetype: 'audio/mp4' }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ FACEBOOK ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'spotify': case prefix+'spoti':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix} limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *judul*\n\n_Contoh_\n\n${command} badut`)
            reply(mess.wait)
            var data = await fetchJson(`https://mooncake-ihsanazay.cloud.okteto.net/search?query=${q}`)
            require('../lib/spotify')(data.result[0].track).then( dl => {
                var tx = `*SPOTIFY PLAY*\n\n• Judul : ${data.result[0].judul}\n• Artists : ${dl.artists}\n• Albums : ${dl.album_name}\n• Release Date : ${data.result[0].release_date}\n• Popularity : ${data.result[0].popularity}\n• Track : ${data.result[0].track}`
                conn.sendMessage(from, { image: { url: data.result[0].thumbnail }, caption: tx }, { quoted: msg })
                .then((res) => conn.sendMessage(from, { audio: dl.mp3, mimetype: 'audio/mp4' }, { quoted: res }))
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ SPOTIFY ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
        case prefix+'spotifydl': case prefix+'spotidl':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix} limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://open.spotify.com/track/5oDymvDdBB5vHpgHHo9CRY`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('spotify.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            require('../lib/spotify')(args[1]).then( data => {
                var { name, artists, album_name, release_date, cover_url, mp3 } = data
                var ttl = `*SPOTIFY DOWNLOADERS*\n\n• Title : ${name}\n• Artist: ${artists}\n• Album Name : ${album_name}\n• Release : ${release_date}`
                conn.sendMessage(from, { image: { url: cover_url }, caption: ttl }, { quoted: msg })
                .then((res) => conn.sendMessage(from, { audio: mp3, mimetype: 'audio/mp4' }, { quoted: res }))
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ SPOTIFYDL ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'cocofundl': case prefix+'cocofun':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix} limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://www.icocofun.com/share/post/457616496291?lang=id&pkg=id&share_to=copy_link&m=c6d95b35bbbbf91ce3da574262388117&d=f7445b55ca8eb354536296f34f9c2a878ccc7704deeb8e2840eed6641f41c5d7&nt=4`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('cocofun.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            scrp.cocofun(args[1]).then( data => {
                var { caption, play, like, share, no_watermark } = data
                conn.sendMessage(from, { video: { url: no_watermark }, caption: `*COCOFUN DOWNLOADS*\n\n• Caption : ${caption}\n• Playing : ${play}\n• Likes : ${like}\n• Shared : ${share}`, footer: 'click the button below to change the video to audio', buttons: [ { buttonId: prefix+'cocomp3 ' + args[1], buttonText: { displayText: '🎧 Audio' }, type: 1 } ] }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ COCOFUN ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'cocomp3': case prefix+'cocofunmusic': case prefix+'cocofunaudio':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix} limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://www.icocofun.com/share/post/457616496291?lang=id&pkg=id&share_to=copy_link&m=c6d95b35bbbbf91ce3da574262388117&d=f7445b55ca8eb354536296f34f9c2a878ccc7704deeb8e2840eed6641f41c5d7&nt=4`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('cocofun.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            scrp.cocofun(args[1]).then( data => {
                conn.sendMessage(from, { audio: { url: data.no_watermark }, mimetype: 'audio/mp4' }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ COCOFUN ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'mediafire': case prefix+'mfdl':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix} limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://www.mediafire.com`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('mediafire.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            mediafire(args[1]).then(async(data) => {
                data.nama = decodeURIComponent(data.nama)
                var media = await getBuffer(data.link)
                if (data.mime.includes('mp4')) {
                    conn.sendMessage(from, { document: media, fileName: data.nama, mimetype: 'video/mp4' }, { quoted: msg })
                } else if (data.mime.includes('mp3')) {
                    conn.sendMessage(from, { document: media, fileName: data.nama, mimetype: 'audio/mp3' }, { quoted: msg })
                } else {
                    conn.sendMessage(from, { document: media, fileName: data.nama, mimetype: 'application/'+data.mime }, { quoted: msg })
                }
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ MEDIAFIRE ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'telestick': case prefix+'telesticker':
            if (!isPremium) return reply(mess.OnlyPrem)
            if (isGroup) return reply(`Untuk menghindari Spam, fitur ${command} hanya bisa digunakan di Chat Pribadi`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://t.me/addstickers/Nekonyaaaa`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('t.me')) return reply(mess.error.Iv)
            reply(mess.wait)
            telesticker(args[1]).then(async(data) => {
                for (let i of data) {
                    if (i.status == 200) {
                        sendStickerFromUrl(from, i.url)
                        await sleep(1000)
                    } else {
                        conn.sendMessage(from, { text: 'Salah satu sticker error!' })
                    }
                    limitAdd(sender, limit)
                }
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ TELESTICK ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'pindl': case prefix+'pinterestdl':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://pin.it/xyHalNF`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('pin')) return reply(mess.error.Iv)
            reply(mess.wait)
            require('../lib/pindl').pindl(args[1]).then(async(res) => {
                var mime;
                var a = await axios.head(res)
                mime = a.headers["content-type"]
                if (mime == "image/gif") {
                    conn.sendMessage(from, { video: { url: res }, mimetype: "video/mp4", gifPlayback: true }, { quoted: msg })
                    limitAdd(sender, limit)
                } else if (mime == "video/mp4") {
                    conn.sendMessage(from, { video: { url: res } }, { quoted: msg })
                    limitAdd(sender, limit)
                } else {
                    conn.sendMessage(from, { image: { url: res } }, { quoted: msg })
                    limitAdd(sender, limit)
                }
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ PINDL ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'xnxxdl':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!isPremium && !isMods && !fromMe) return reply(mess.OnlyPrem)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://www.xnxx.com/video-ljqph07/a_big_tits_japan_oral_sex_and_fucking_with_hot_asian_girl_kyouka_mizusawa`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('xnxx.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            xnxxdl(args[1]).then( data => {
                conn.sendMessage(from, { video: { url: data.result.files.high }, caption: data.result.title }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((err) => {
                reply(mess.error.api)
                console.log(color('[ XNXXDL ]', 'red'), err)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'gitclone':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            var regx = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://github.com/yunusdelano/botcoden`)
            if (!regx.test(args[1])) return reply('Linknya salah')
            reply(mess.wait)
            var [, usr, repo] = args[1].match(regx) || []
            var repos = repo.replace(/.git$/, '')
            var hasdl = `https://api.github.com/repos/${usr}/${repos}/zipball`
            var namafile = (await fetch(hasdl, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
            conn.sendMessage(from, { document: { url: hasdl }, mimetype: 'application/zip', fileName: namafile }, { quoted: msg })
            limitAdd(sender, limit)
            break
        case prefix+'googledrive': case prefix+'gdrive': case prefix+'drive':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://drive.google.com/file/d/blabla/view`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            if (!args[1].includes('drive.google.com')) return reply(mess.error.Iv)
            reply(mess.wait)
            require('../lib/gdrive').gdrive(args[1]).then( data => {
                var { downloadUrl, fileName, fileSize, mimetype } = data
                conn.sendMessage(from, { text: `*GOOGLE DRIVE DOWNLOADS*\n\n• File Name : ${fileName}\n• Size : ${fileSize}` }, { quoted: msg })
                .then((res) => conn.sendMessage(from, { document: { url: downloadUrl }, fileName: fileName, mimetype: mimetype }, { quoted: res }))
                limitAdd(sender, limit)
            }).catch((e) => {
                reply(mess.error.api)
                console.log(color('[ GDRIVE ]', 'red'), e)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'mp4': {
            if (args.length < 2) return reply("Linknya mana kak?")
            try {
                conn.sendMessage(from, { video: { url: args[1] }, caption: 'Success' }, { quoted: msg })
            } catch {
                reply("Linknya Error")
            }
            }
            break
        case prefix+'jpeg': case prefix+'jpg': {
            if (args.length < 2) return reply("Linknya mana kak?")
            try {
                conn.sendMessage(from, { image: { url: args[1] }}, { quoted: msg })
            } catch {
                reply("Linknya Error")
            }
            }
            break
        case prefix+'mp3': case prefix+'audio': case prefix+'music': case prefix+'musik': {
            if (args.length < 2) return reply("Linknya mana kak?")
            try {
                conn.sendMessage(from, { audio: { url: args[1] }, mimetype: 'application/mp4' }, { quoted: msg })
            } catch {
                reply("Linknya Error")
            }
            }
            break

        // Search Menu
        case prefix+'yts': case prefix+'ytsearch':{
			if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *query*\n\n_Contoh_\n\n${command} Bila Nanti`)
            reply(mess.wait)
            var search = await yts(q)
            var listSerch = []
            for (let i of search.all) {
                listSerch.push({
                    title: i.title, rowId: `${prefix}play ${i.url}`, description: `• Channel : ${i.author.name}\n• Duration : ${i.timestamp}`
                })
            }
            var listSearch = {
                text: `*YOUTUBE-SEARCH*\n\nResult for *${q}*`,
                footer: footer,
                buttonText: "Click Here!",
                sections: [{
                   title: "Total Search " + search.all.length, rows: listSerch
                }]
            }
            conn.sendMessage(from, listSearch, { quoted: fkontak })
            limitAdd(sender, limit)
            }
            break
        case prefix+'tiktoktrend': case prefix+'tiktoktrending': case prefix+'tttrend':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            var tts = await scrp.tiktoktrend()
            var listTiktok = []
            for (let i of tts.result) {
                listTiktok.push({
                    title: `${i.username} - ${i.caption}`, rowId: prefix+`mp4 ${i.video}`, description: `• Views : ${i.views}\n• Like : ${i.like}\n• Comment : ${i.comment}\n• Share : ${i.share}\n• Uploads Time : ${i.upload_time}`
                })
            }
            var listMessagee = {
                text: `*TIKTOK-TREND*\n\nRequest By @${sender.split("@")[0]}`,
                footer: footer,
                buttonText: "Click Here!",
                mentions: [sender],
                sections: [{
                    title: "Tiktok Trend : " + tts.result.length, rows: listTiktok
                }]
            }
            conn.sendMessage(from, listMessagee, { quoted: fkontak })
            limitAdd(sender, limit)
            break
        case prefix+'spotifysearch': case prefix+'spotisearch':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *query*\n\n_Contoh_\n\n${command} badut`)
            var spoti = await fetchJson(`https://mooncake-ihsanazay.cloud.okteto.net/search?query=${q}`)
            var list_spoti = []
            for (let i of spoti.result) {
                list_spoti.push({
                    title: i.judul, rowId: prefix+`spotifydl ${i.track}`, description: `• Release : ${i.release_date}\n• Popularity : ${i.popularity}\n• Track : ${i.track}`
                })
            }
            var listMessage = {
                text: `*SPOTIFY SEARCH*\n\nResult for *${q}*`,
                footer: footer,
                buttonText: 'Click Here!',
                sections: [{
                    title: 'Result Dandelion : ' + spoti.result.length, rows: list_spoti
                }]
            }
            conn.sendMessage(from, listMessage, { quoted: fkontak })
            limitAdd(sender, limit)
            break
        case prefix+'pinterest':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *query* atau ${command} *query --jumlah*\n\n_Contoh_\n\n${command} cecan atau ${command} cecan --10`)
            var jumlah;
            if (q.includes('--')) jumlah = q.split('--')[1]
            if (jumlah > 20) return reply(`Maksimal 20`)
            reply(mess.wait)
            pinterest(q.replace('--'+jumlah, '')).then(async(data) => {
                if (q.includes('--')) {
                    if (data.result.length < jumlah) {
                        jumlah = data.result.length
                        reply(`Hanya ditemukan ${data.result.length}, foto segera dikirim`)
                    }
                    for (let i = 0; i < jumlah; i++) {
                        conn.sendMessage(from, { image: { url: data.result[i] }})
                    }
                    limitAdd(sender, limit)
                } else {
                    var but = [{ buttonId: command+ ' '+q, buttonText: { displayText: `Next Photo` }, type: 1 }]
                    conn.sendMessage(from, { caption: `Hasil pencarian dari ${q}`, image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
                    limitAdd(sender, limit)
                }
            }).catch((err) => {
                reply(mess.error.api)
                console.log(color('[ PINTEREST ]', 'red'), err)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'googlelens': case prefix+'glens': case prefix+'searchbyimage': case prefix+'golens': case prefix+'searchbyimg':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (isImage || isQuotedImage) {
                reply(mess.wait)
                var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `./sticker/glens${sender}.jpg`)
                var mediaLink = (await UploadFileUgu(media)).url
                var data = await goLens(mediaLink)
                var teks = `*Data Berhasil Di Dapatkan!*\n\n*Url Photo :* ${data.imgUrl}\n\nPencet Tombol "Menuju Pencarian" atau "Copy Link" di bawah untuk menuju ke pencarian yang anda Cari!`
                var but = [{ urlButton: { displayText: 'Menuju Pencarian', url: `${data.url}` } }, { urlButton: { displayText: 'Copy Link',  url: `https://www.whatsapp.com/otp/copy/ ${data.url}`} }]
                conn.sendMessage(from, { caption: teks, image: fs.readFileSync(media) }, { quoted: msg })
                .then( res => {
                    conn.sendMessage(from, { text: 'Created By @iamyunusdid_', templateButtons: but })
                    fs.unlinkSync(media)
                    limitAdd(sender, limit)
                })
            } else {
                reply(`Kirim/Balas gambar yang ingin dicari!`)
            }
            break
        case prefix+'whatmusic': case prefix+'whatmusik':
            if (!isPremium) return reply(mess.OnlyPrem)
            if (isVideo || isQuotedVideo || isQuotedAudio) {
                if (isQuotedAudio && quotedMsg.id.endsWith('TL')) return reply(`Gaboleh curang cuy!`)
                reply(mess.wait)
                try {
                    var media;
                    if (isVideo || isQuotedVideo) {
                        media = await conn.downloadAndSaveMediaMessage(msg, 'video', './sticker/a'+sender+'.mp3')
                    } else if (isQuotedAudio) {
                        media = await conn.downloadAndSaveMediaMessage(msg, 'audio', './sticker/a'+sender+'.mp3')
                    }
                    const acr = new acrcloud({
                        host: "identify-eu-west-1.acrcloud.com",
                        access_key: "1598f147ee841b02dc18821a1be79fae",
                        access_secret: "FLMLqyIMv19PHb8L4Xgy86YeD1K2qrHQFnL3muYO"
                    });
                    var sampleq = fs.readFileSync('./sticker/a'+sender+'.mp3')
                    var metadata = await acr.identify(sampleq)
                    console.log(metadata)
                    conn.reply(from, `*「 Berhasil Ditemukan 」*\n\n• Judul Lagu : ${metadata.metadata.music[0].title}\n• Artis : ${metadata.metadata.music[0].artists[0].name}\n• Album : ${metadata.metadata.music[0].album.name}\n• Rilis : ${metadata.metadata.music[0].release_date}`, msg)
                    fs.unlinkSync('./sticker/a'+sender+'.mp3')
                } catch (e) {
                    fs.unlinkSync('./sticker/a'+sender+'.mp3')
                    reply(`Lagu tidak dapat ditemukan, atau ukuran lagu yang terlalu besar!`)
                }
            } else {
                reply(`Reply video/audio dan sertakan caption ${prefix}whatmusic`)
            }
            break
        case prefix+'xnxxsearch':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!isPremium && !isMods && !fromMe) return reply(mess.OnlyPrem)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *query*\n\n_Contoh_\n\n${command} japan`)
            var srch = await xnxxsearch(q)
            var list = []
            for (let i of srch.result) {
                list.push({
                    title: i.title, rowId: `${prefix}xnxxdl ${i.link}`, description: i.info
                })
            }
            var listsrch = {
                text: `*XNXX-SEARCH*\n\nResult from *${q}*`,
                footer: footer,
                buttonText: 'Click Here!',
                sections: [{
                    title: 'Total search '+ srch.result.length, rows: list
                }]
            }
            conn.sendMessage(from, listsrch, { quoted: fkontak }).catch((err) => reply(mess.error.api))
            limitAdd(sender, limit)
            break

        // Random Waifu
        case prefix+'waifu': case prefix+'neko': case prefix+'trap': case prefix+'blowjob':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!isPremium && !isOwner && !fromMe) return reply(mess.OnlyPrem)
            fetchJson(`https://api.waifu.pics/nsfw/${command.slice(1)}`).then((data) => {
                var wibu = [ { buttonId: prefix+command.slice(1), buttonText: { displayText: 'Next Image' }, type: 1 } ]
                conn.sendMessage(from, { image: { url: data.url }, caption: 'jangan dijadiin bacol bang:v', footer: footer, buttons: wibu }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((err) => {
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break
        case prefix+'shinobu': case prefix+'megumin': case prefix+'bully': case prefix+'cuddle': case prefix+'cry':
        case prefix+'hug': case prefix+'awoo': case prefix+'kiss': case prefix+'lick': case prefix+'pat':
        case prefix+'smug': case prefix+'bonk': case prefix+'yeet': case prefix+'blush': case prefix+'smile':
        case prefix+'wave': case prefix+'highfive': case prefix+'handhold': case prefix+'nom': case prefix+'bite':
        case prefix+'glomp': case prefix+'slap': case prefix+'kill': case prefix+'happy': case prefix+'wink':
        case prefix+'poke': case prefix+'dance': case prefix+'cringe':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!isPremium && !isOwner && !fromMe) return reply(mess.OnlyPrem)
            fetchJson(`https://api.waifu.pics/sfw/${command.slice(1)}`).then((data) => {
                var wibu = [ { buttonId: prefix+command.slice(1), buttonText: { displayText: 'Next Image' }, type: 1 } ]
                conn.sendMessage(from, { image: { url: data.url }, caption: 'jangan dijadiin bacol bang:v', footer: footer, buttons: wibu }, { quoted: msg })
                limitAdd(sender, limit)
            }).catch((err) => {
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            break

        // Random Menu
        case prefix+'meme': case prefix+'memeindo':
		    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
		    reply(mess.wait)
		    getBuffer(`https://api.zacros.my.id/randomimg/meme`).then( meme => {
		        conn.sendMessage(from, { image: meme, caption: 'Ancrit', footer: 'Click the button below to view the next image', buttons: [{ buttonId: prefix+'meme', buttonText: { displayText: 'Next Photo' }, type: 1 }] }, { quoted: msg })
		        limitAdd(sender, limit)
		    }).catch((e) => {
                console.log(color('[ MEME ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
		    break
        case prefix+'dark': case prefix+'darkjoke': case prefix+'darkjokes':
		    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
		    reply(mess.wait)
		    getBuffer(`https://api.zacros.my.id/randomimg/darkjokes`).then( dark => {
		        conn.sendMessage(from, { image: dark, caption: 'Ancrit', footer: 'Click the button below to view the next image', buttons: [{ buttonId: prefix+'dark', buttonText: { displayText: 'Next Photo' }, type: 1 }] }, { quoted: msg })
		        limitAdd(sender, limit)
		    }).catch((e) => {
                console.log(color('[ DARK ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
		    break
        case prefix+'couple': case prefix+'kapel': case prefix+'ppcp': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            fetchJson(`https://api.zacros.my.id/randomimg/ppcouple`).then( anu => {
                conn.sendMessage(from, { image: { url: anu.male }, caption: 'Cowo' }, { quoted: msg } )
                .then((res) => conn.sendMessage(from, { image: { url: anu.female }, caption: 'Cewe' }, { quoted: res }))
            }).catch((err) => {
                console.log(color('[ PPCP ]', 'red'), err)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${err}` })
            })
            limitAdd(sender, limit)
            }
            break

        // Menu Textpro
        case prefix+'blackpink':
        case prefix+'neon':
        case prefix+'greenneon':
        case prefix+'advanceglow':
        case prefix+'futureneon':
        case prefix+'sandwriting':
        case prefix+'sandsummer':
        case prefix+'sandengraved':
        case prefix+'metaldark':
        case prefix+'neonlight':
        case prefix+'holographic':
        case prefix+'text1917':
        case prefix+'minion':
        case prefix+'deluxesilver':
        case prefix+'newyearcard':
        case prefix+'bloodfrosted':
        case prefix+'halloween':
        case prefix+'jokerlogo':
        case prefix+'fireworksparkle':
        case prefix+'natureleaves':
        case prefix+'bokeh':
        case prefix+'toxic':
        case prefix+'strawberry':
        case prefix+'box3d':
        case prefix+'roadwarning':
        case prefix+'breakwall':
        case prefix+'icecold':
        case prefix+'luxury':
        case prefix+'cloud':
        case prefix+'summersand':
        case prefix+'horrorblood':
        case prefix+'thunder': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Penggunaan ${command} text\n\n_Contoh_\n\n${command} yunusd`)
            reply(mess.wait)
            conn.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/textprome/${command.slice(1)}?apikey=${lolkey}&text=${q}` }}).catch(() => reply(mess.error.api))
            limitAdd(sender, limit)
            }
            break
        case prefix+'pornhub':
        case prefix+'glitch':
        case prefix+'avenger':
        case prefix+'space':
        case prefix+'ninjalogo':
        case prefix+'marvelstudio':
        case prefix+'lionlogo':
        case prefix+'wolflogo':
        case prefix+'steel3d':
        case prefix+'wallgravity': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Penggunaan ${command} text1|text2\n\n_Contoh_\n\n${command} yunusd|ID`)
            if (!q.includes("|")) return reply(`Penggunaan ${command} text1|text2\n\n_Contoh_\n\n${command} yunusd|ID`)
            reply(mess.wait)
            conn.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/textprome2/${command.slice(1)}?apikey=${lolkey}&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}` }}).catch(() => reply(mess.error.api))
            limitAdd(sender, limit)
            }
            break

        // Menu Photooxy
        case prefix+'shadow':
        case prefix+'cup':
        case prefix+'cup1':
        case prefix+'romance':
        case prefix+'smoke':
        case prefix+'burnpaper':
        case prefix+'lovemessage':
        case prefix+'undergrass':
        case prefix+'love':
        case prefix+'coffe':
        case prefix+'woodheart':
        case prefix+'woodenboard':
        case prefix+'summer3d':
        case prefix+'wolfmetal':
        case prefix+'nature3d':
        case prefix+'underwater':
        case prefix+'golderrose':
        case prefix+'summernature':
        case prefix+'letterleaves':
        case prefix+'glowingneon':
        case prefix+'fallleaves':
        case prefix+'flamming':
        case prefix+'harrypotter':
        case prefix+'carvedwood': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Penggunaan ${command} text\n\n_Contoh_\n\n${command} yunusd`)
            reply(mess.wait)
            conn.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/photooxy1/${command.slice(1)}?apikey=${lolkey}&text=${q}` }}).catch(() => reply(mess.error.api))
            limitAdd(sender, limit)
            }
            break
        case prefix+'arcade8bit':
        case prefix+'battlefield4':
        case prefix+'pubg': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Penggunaan ${command} text1|text2\n\n_Contoh_\n\n${command} yunusd|ID`)
            if (!q.includes("|")) return reply(`Penggunaan ${command} text1|text2\n\n_Contoh_\n\n${command} yunusd|ID`)
            reply(mess.wait)
            conn.sendMessage(from, { image: { url: `https://api.lolhuman.xyz/api/photooxy2/${command.slice(1)}?apikey=${lolkey}&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}` }}).catch(() => reply(mess.error.api))
            limitAdd(sender, limit)
            }
            break

        // Group Menu
        case prefix+'leveling':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === "enable") {
                if (isLeveling) return reply(`Udah aktif`)
                _leveling.push(from)
                fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling, null, 2))
                reply('Sukses mengaktifkan leveling di grup ini')
            } else if (args[1].toLowerCase() === "disable") {
                var posi = _leveling.indexOf(from)
                _leveling.splice(posi, 1)
                fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling, null, 2))
                reply('Sukses menonaktifkan leveling di grup ini')
            } else {
                reply(`Pilih enable atau disable`)
            }
            break
        case prefix+'welcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === "enable") {
                if (isWelcome) return reply(`Udah aktif`)
                welcome.push(from)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                reply('Sukses mengaktifkan welcome di grup ini')
            } else if (args[1].toLowerCase() === "disable") {
                var posi = welcome.indexOf(from)
                welcome.splice(posi, 1)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                reply('Sukses menonaktifkan welcome di grup ini')
            } else {
                reply(`Pilih enable atau disable`)
            }
            break
        case prefix+'left':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === "enable") {
                if (isLeft) return reply(`Udah aktif`)
                left.push(from)
                fs.writeFileSync('./database/left.json', JSON.stringify(left, null, 2))
                reply('Sukses mengaktifkan left di grup ini')
            } else if (args[1].toLowerCase() === "disable") {
                var posi = left.indexOf(from)
                left.splice(posi, 1)
                fs.writeFileSync('./database/left.json', JSON.stringify(left, null, 2))
                reply('Sukses menonaktifkan left di grup ini')
            } else {
                reply(`Pilih enable atau disable`)
            }
            break
        case prefix+'setwelcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
            if (isSetWelcome(from, set_welcome_db)) return reply(`Set welcome already active`)
            addSetWelcome(q, from, set_welcome_db)
            reply(`Successfully set welcome!`)
            break
        case prefix+'changewelcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
            if (isSetWelcome(from, set_welcome_db)) {
                changeSetWelcome(q, from, set_welcome_db)
                reply(`Sukses change set welcome teks!`)
            } else {
                addSetWelcome(q, from, set_welcome_db)
                reply(`Sukses change set welcome teks!`)
            }
            break
        case prefix+'delsetwelcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetWelcome(from, set_welcome_db)) return reply(`Belum ada set welcome di sini..`)
            removeSetWelcome(from, set_welcome_db)
            reply(`Sukses delete set welcome`)
            break
        case prefix+'setleft':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Halo @user, Selamat tinggal dari @group`)
            if (isSetLeft(from, set_left_db)) return reply(`Set left already active`)
            addSetLeft(q, from, set_left_db)
            reply(`Successfully set left!`)
            break
        case prefix+'changeleft':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Halo @user, Selamat tinggal dari @group`)
            if (isSetLeft(from, set_left_db)) {
                changeSetLeft(q, from, set_left_db)
                reply(`Sukses change set left teks!`)
            } else {
                addSetLeft(q, from, set_left_db)
                reply(`Sukses change set left teks!`)
            }
            break
        case prefix+'delsetleft':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetLeft(from, set_left_db)) return reply(`Belum ada set left di sini..`)
            removeSetLeft(from, set_left_db)
            reply(`Sukses delete set left`)
            break
        case prefix+'linkgroup': case prefix+'grouplink': case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
            url = 'https://chat.whatsapp.com/'+url
            reply(url)
            break
        case prefix+'setppgroup': case prefix+'setppgrup': case prefix+'setppgc':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (isImage || isQuotedImage) {
            var media = await conn.downloadAndSaveMediaMessage(msg, 'image', `ppgc${from}.jpeg`)
            if (args[1] == '\'panjang\'') {
            	var { img } = await generateProfilePicture(media)
            	await conn.query({
                    tag: 'iq',
                    attrs: {
                        to: from,
                        type:'set',
                        xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    } 
                    ]
                })
                fs.unlinkSync(media)
            	reply(`Sukses`)
            } else {
                await conn.updateProfilePicture(from, { url: media })
                .then( res => {
                    reply(`Sukses`)
                    fs.unlinkSync(media)
                }).catch(() => reply(mess.error.api))
            }
            } else {
			    reply(`Kirim/balas gambar dengan caption ${command}`)
            }
            break
        case prefix+'setnamegroup': case prefix+'setnamegrup': case prefix+'setnamegc':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} Support ${ownerName}`)
            await conn.groupUpdateSubject(from, q)
            .then( res => {
                reply(`Sukses`)
            }).catch(() => reply(mess.error.api))
            break
        case prefix+'setdesc': case prefix+'setdescription':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *text*\n\n_Contoh_\n\n${command} New Description by ${ownerName}`)
            await conn.groupUpdateDescription(from, q)
            .then( res => {
                reply(`Sukses`)
            }).catch(() => reply(mess.error.api))
            break
        case prefix+'antilink':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === 'enable'){
                if (isAntiLink) return reply(`Udah aktif`)
                antilink.push(from)
                fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                reply('Successfully Activate Antilink In This Group')
            } else if (args[1].toLowerCase() === 'disable'){
                if (!isAntiLink) return reply(`Udah nonaktif`)
                let anu = antilink.indexOf(from)
                antilink.splice(anu, 1)
                fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                reply('Successfully Disabling Antilink In This Group')
            } else {
                reply(`Pilih enable atau disable`)
            }
            break
        case prefix+'antiwame':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === 'enable'){
                if (isAntiWame) return reply(`Udah aktif`)
                antilink.push(from)
                fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
                reply('Successfully Activate Antiwame In This Group')
            } else if (args[1].toLowerCase() === 'disable'){
                if (!isAntiWame) return reply(`Udah nonaktif`)
                let anu = antiwame.indexOf(from)
                antiwame.splice(anu, 1)
                fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 2))
                reply('Successfully Disabling Antiwame In This Group')
            } else {
                reply(`Pilih enable atau disable`)
            }
            break
        case prefix+'add':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (groupMembers.length == 513) return reply(`Anda tidak dapat menambah peserta, karena Grup sudah penuh!`)
            var mems = []
            groupMembers.map( i => mems.push(i.id) )
            var number;
            if (args.length > 1) {
                number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
                var cek = await conn.onWhatsApp(number)
                if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                conn.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                var cek = await conn.onWhatsApp(number)
                if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                conn.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan`)
            }
            break
        case prefix+'kick':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var number;
			if (mentionUser.length !== 0) {
                number = mentionUser[0]
                conn.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                conn.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
            }
            break
        case prefix+'promote': case prefix+'pm':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
                .catch(() => reply(mess.error.api))
            } else if (isQuotedMsg) {
                conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
                .catch(() => reply(mess.error.api))
            } else {
                reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
            }
            break
        case prefix+'demote': case prefix+'dm':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
                .catch(() => reply(mess.error.api))
            } else if (isQuotedMsg) {
                conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
                .catch(() => reply(mess.error.api))
            } else {
                reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
            }
            break
        case prefix+'revoke':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            await conn.groupRevokeInvite(from)
            .then( res => {
                reply(`Sukses menyetel tautan undangan grup ini`)
            }).catch(() => reply(mess.error.api))
            break
        case prefix+'hidetag': case prefix+'h': case prefix+'ht':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            let mem = [];
            groupMembers.map( i => mem.push(i.id) )
            conn.sendMessage(from, { text: q ? q : '', mentions: mem }, { quoted: fkontak })
            break
        case prefix+'delete': case prefix+'del': case prefix+'d':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isQuotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
            if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
            conn.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
            break
        case prefix+'checksewa': case prefix+'ceksewa':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isSewa) return reply(`Bot tidak di sewa group ini!`)
            let ceksewa = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
            let sewanya = `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s)`
            reply(sewanya)
            break

        // Baileys
        case prefix+'nowa':
            if (!isPremium) return reply(mess.OnlyPrem)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *number*\n\n_Contoh_\n\n${command} 628515644xxxx`)
            var teks = args[1]
            if (!teks.includes('x')) return reply('lah?')
            reply(mess.wait)
            function countInstances(string, word) {
                return string.split(word).length - 1;
            }
            var nomer0 = teks.split('x')[0]
            var nomer1 = teks.split('x')[countInstances(teks, 'x')] ? teks.split('x')[countInstances(teks, 'x')] : ''
            var random_length = countInstances(teks, 'x')

            var random;
            if (random_length == 1) {
                random = 10
            } else if (random_length == 2) {
                random = 100
            } else if (random_length == 3) {
                random = 1000
            }

            var nomerny = `List Number\n\nPunya Bio/status/info\n`
            var no_bio = `\nTanpa Bio/status/info || \nHey there! I am using WhatsApp.\n`
            var no_watsap = `\nTidak Terdaftar\n`

            for (let i = 0; i < random; i++) {
                var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
                var dom1 = nu[Math.floor(Math.random() * nu.length)]
                var dom2 = nu[Math.floor(Math.random() * nu.length)]
                var dom3 = nu[Math.floor(Math.random() * nu.length)]
                var dom4 = nu[Math.floor(Math.random() * nu.length)]

                var rndm;
                if (random_length == 1) {
                    rndm = `${dom1}`
                } else if (random_length == 2) {
                    rndm = `${dom1}${dom2}`
                } else if (random_length == 3) {
                    rndm = `${dom1}${dom2}${dom3}`
                } else if (random_length == 4) {
                    rndm = `${dom1}${dom2}${dom3}${dom4}`
                }

                var anu = await conn.onWhatsApp(`${nomer0}${i}${nomer1}@s.whatsapp.net`);
                var anuu = anu.length !== 0 ? anu : false

                try {
                    try {
                        var anu1 = await conn.fetchStatus(anu[0].jid)
                    } catch {
                        var anu1 = '401'
                    }
                    if (anu1 == '401' || anu1.status.length == 0) {
                        no_bio += `wa.me/${anu[0].jid.split("@")[0]}\n`
                        console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [REGISTERED]`, 'green'))
                    } else {
                        nomerny += `wa.me/${anu[0].jid.split("@")[0]}\nBio Name : ${anu1.status}\nTahun : ${moment(anu1.setAt).tz('Asia/Jakarta').format('ddd DD MMM YYYY')}\n\n`
                        console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [REGISTERED]`, 'green'))
                    }
                } catch {
                    no_watsap += `${nomer0}${i}${nomer1}\n`
                    console.log(`-${i}) ${nomer0}${i}${nomer1}`, color(` [NOT REGISTERED]`, 'red'))
                }
            }
            reply(`${nomerny}${no_bio}${no_watsap}`)
            break
        case prefix+'towame':
            if (isQuotedMsg) {
                if (quotedMsg.chats.length > 1) {
                    var all = quotedMsg.chats.split('\n')
                    var teks = ''
                    for (let i of all) {
                        var a = i.replace(/[+| |(|)|.|-]/gi, "")
                        var b = parseInt(a)
                        if (!b) teks += `${i} fail`
                        teks += `wa.me/`+b+'\n'
                    }
                    reply(teks.trim())
                } else {
                    var a = quotedMsg.chats.replace(/[+| |(|)|.|-]/gi, "")
                    var b = parseInt(a)
                    if (!b) return reply("Pastikan hanya reply angka")
                    reply("wa.me/"+b)
                }
            } else if (args.length > 1) {
                if (q.split('\n').length > 1) {
                    var all = q.split('\n')
                    var teks = ''
                    for (let i of all) {
                        var a = i.replace(/[+| |(|)|.|-]/gi, "")
                        var b = parseInt(a)
                        if (!b) teks += `${i} fail`
                        teks += `wa.me/`+b+'\n'
                    }
                    reply(teks.trim())
                } else {
                    var a = q.replace(/[+| |(|)|.|-]/gi, "")
                    var b = parseInt(a)
                    if (!b) return reply("Pastikan hanya angka")
                    reply("wa.me/"+b)
                }
            } else {
                reply(`Kirim perintah ${command} nomer atau balas pesan nomernya dengan caption ${command}`)
            }
            break
        case prefix+'q': case prefix+'getquotedmsg': case prefix+'getquoted': case prefix+'quoted':
            if (!isPremium) return reply(mess.OnlyPrem)
            if (!isQuotedMsg) return reply(`Balas Pesannya!`)
            var data = await store.loadMessage(from, quotedMsg.id)
            data = serialize(conn, data)
            if (data.isQuotedMsg !== true) return reply(`The message you replied to contained no reply`)
            var typ = Object.keys(data.message)[0]
            if (data.message[typ].contextInfo.quotedMessage.conversation) {
                reply(`${data.message[typ].contextInfo.quotedMessage.conversation}`)
            } else {
                var anu = data.message[typ].contextInfo.quotedMessage
                conn.sendMessageFromContent(from, anu)
            }
            break
        case prefix+'fakehidetag':
            if (!isPremium) return reply(mess.OnlyPrem)
            if (!isGroup) return reply(mess.OnlyGrup)
            if (args.length < 2) return mentions(`Gunakan dengan cara ${command} *@tag|teks*\n\n_Contoh_\n\n${command} @${ownerNumber.split('@')[0]}|Hai`, [ownerNumber], true)
            var org = q.split("|")[0]
            var teks = q.split("|")[1];
            if (!org.startsWith('@')) return reply('Tag orangnya')
            var mem2 = []
            groupMembers.map( i => mem2.push(i.id) )
            var mens = parseMention(target)
            var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${prefix}hidetag ${teks}`, contextInfo: { mentionedJid: mens }}}}
            var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${prefix}hidetag ${teks}` }}
            conn.sendMessage(from, { text: teks ? teks : '', mentions: mem2 }, { quoted: mens.length > 2 ? msg1 : msg2 })
            break
        case prefix+'react':
            if (!isMods) return reply(mess.OnlyOwner)
            if (!isQuotedMsg) return reply(`Balas pesannya`)
            if (args.length < 2) return reply(`Masukkan 1 emoji`)
            if (!isEmoji(args[1])) return reply(`Itu bukan emoji!`)
            if (isEmoji(args[1]).length > 1) return reply(`Satu aja emojinya`)
            var reactMsg = { reactionMessage: {
                key: {
                    remoteJid: from,
                    fromMe: quotedMsg.fromMe,
                    id: quotedMsg.id,
                    participant: quotedMsg.sender
                },
                text: args[1]
            }
            }
            conn.sendMessageFromContent(from, reactMsg)
            break
        case prefix+'inspect':
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *link_group*\n\n_Contoh_\n\n${command} https://chat.whatsapp.com/`)
            var regx = /chat.whatsapp.com\/([\w\d]*)/g;
            var cek = args[1].match(regx)
            if (cek == null) return reply(`No invite url detected `)
            cek = cek[0].replace('chat.whatsapp.com/', '')
            conn.groupInspectCode(cek).then( data => {
                if (data.msg) return reply(`Maaf terjadi kesalahan, silahkan coba link lain!`)
                var { id, subject, creator, creation, size, desc, participants } = data
                var teks = `*GROUP INSPECT LINK*\n
*Id Group :* ${id}
*Subjek :* ${subject}
*Owner :* ${creator !== undefined ? '@'+creator.split("@")[0] : id.includes('-') ? '@'+id.split('-')[0] : 'Not detected'}
*Di Buat Pada :* ${formatDate(creation * 1000)}
*Total Member :* ${size}\n
*Teman yang diketahui join :* ${participants ? '\n' + participants.map((user, i) => ++i + '. @' + user.id.split(`@`)[0]).join('\n').trim() : 'Tidak ada'}\n
*Deskripsi :* ${desc !== undefined ? desc : ""}`
                reply(teks)
            })
            break
        case prefix+'bugpc':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} number|amount spam|timer\n\n_Contoh_\n\n${command} 62888|1|10s\n\ns = Second/Detik`)
            var num = q.split('|')[0]+'@s.whatsapp.net'
            var jumlah = q.split('|')[1]
            var waktu = q.split('|')[2]
            for (let i = 0; i < jumlah; i++) {
                conn.sendMessage(from, { react: { key: msg.key, text: '😶‍🌫'}}).then( res => conn.sendMessage(num, { text: 'NT' }, { quoted: res }))
                await sleep(toMs(waktu))
            }
            var tek = `Success Send Bug To: ${await conn.getName(num)}\nAmount Spam: ${jumlah}\nTimer: ${waktu}`
            reply(tek)
            break
        case prefix+'buggc':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} number|amount spam|timer\n\n_Contoh_\n\n${command} 62888|1|10s\n\ns = Second/Detik`)
            var gece = q.split('|')[0]
            var jumlah = q.split('|')[1]
            var waktu = q.split('|')[2]
            for (let i = 0; i < jumlah; i++) {
                conn.sendMessage(from, { react: { key: msg.key, text: '😶‍🌫'}}).then( res => conn.sendMessage(gece, { text: 'NT' }, { quoted: res }))
                await sleep(toMs(waktu))
            }
            var tek = `Success Send Bug To: ${await getGcName(gece)}\nAmount Spam: ${jumlah}\nTimer: ${waktu}`
            reply(tek)
            break

        // Fun Menu
        case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':
            if (!isGroup)return reply(mess.OnlyGrup)
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *@tag*\n\n_Contoh_\n\n${command} @${ownerNumber.split('@')[0]}`)
            if (mentioned.length !== 1) {
                if (mentioned[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
                if (mentioned[0] === sender) return reply(`Sad amat main ama diri sendiri`)
                var hadiah = randomNomor(100, 150)
                mentions(monospace(`@${sender.split('@')[0]} menantang @${mentioned[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/N) untuk bermain\n\nHadiah : ${hadiah} balance`), [sender, mentioned[0]], false)
                tictactoe.push({
                    id: from,
                    status: null,
                    hadiah: hadiah,
                    penantang: sender,
                    ditantang: mentioned[0],
                    waktu: setTimeout(() => {
                        if (isTicTacToe(from, tictactoe)) conn.sendMessage(from, { text: `Waktu TicTacToe Habis, Tidak ada balasan dari @${mentioned[0].split("@")[0]}`, mentions: [mentioned[0]] })
                        var posi = getPosTic(from, tictactoe)
                        tictactoe.splice(posi, 1)
                    }, 30000),
                    timeout: 60000,
                    TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                })
                gameAdd(sender, glimit)
            } else {
                reply(`Gunakan dengan cara ${command} *@tag*\n\n_Contoh_\n\n${command} @${ownerNumber.split('@')[0]}`)
            }
            break
        case prefix+'delttt': case prefix+'delttc':
            if (!isGroup)return reply(mess.OnlyGrup)
            if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
            var posi = getPosTic(from, tictactoe)
            if (tictactoe[posi].penantang.includes(sender)) {
                tictactoe.splice(posi, 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
            } else if (tictactoe[posi].ditantang.includes(sender)) {
                tictactoe.splice(posi, 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
            } else if (isGroupAdmins) {
                tictactoe.splice(posi, 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
            } else if (isOwner) {
                tictactoe.splice(posi, 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
            } else {
                reply(`Anda tidak bisa menghapus sesi tictactoe, karena bukan pemain!`)
            }
            break
        case prefix+'tebakgambar': case prefix+'tg':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, tebakgambar)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(from, tebakgambar)].msg)
            var data = { image: '', jawaban: '' }
            try {
                var anu2 = await tebakgmbr()
                data.image = anu2.image
                data.jawaban = anu2.jawaban.split('Jawaban ').join('')
                var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Petunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                conn.sendMessage(from, { image: { url: data.image }, caption: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TG' })
                .then( res => {
                    var jawab = data.jawaban.toLowerCase()
                    addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
                    gameAdd(sender, glimit)
                })
            } catch (e) {
                console.log(color('[ TEBAKGAMBAR ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            }
            break
        case prefix+'kuis':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, kuis)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, kuis[getGamePosi(from, kuis)].msg)
            fetchJson(`https://api.lolhuman.xyz/api/tebak/jenaka?apikey=${lolkey}`).then( data => {
                var { question, answer } = data.result
                var teks = `*KUIS GAME*\n\n`+monospace(`Soal : ${question}\nPetunjuk : ${answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'KS' })
                .then( res => {
                    var jawab = answer.toLowerCase()
                    addPlayGame(from, 'Kuis Game', jawab, gamewaktu, res, kuis)
                    gameAdd(sender, glimit)
                })
            }).catch((e) => {
                console.log(color('[ KUIS ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'tebaklagu': case prefix+'tl':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, tebaklagu)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebaklagu[getGamePosi(from, tebaklagu)].msg)
            require('../lib/tebaklagu').tebaklagu().then( data => {
                conn.sendPresenceUpdate('recording', from)
                var { preview, title} = data.result
                var teks = `*TEBAK LAGU*\n\n`+monospace(`Petunjuk : ${title.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
                conn.sendMessage(from, { audio: { url: preview }, mimetype: 'audio/mp4', ptt: true }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TL' })
                .then( res => {
                    conn.sendMessage(from, { text: teks }, { quoted: res })
                    var jawab = title.toLowerCase()
                    addPlayGame(from, 'Tebak Lagu', jawab, gamewaktu, res, tebaklagu)
                    gameAdd(sender, glimit)
                })
            }).catch((e) => {
                console.log(color('[ TEBAKLAGU ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'family100':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, family100)) return conn.reply(from, `Masih ada soal yang belum diselesaikan`, family100[getGamePosi(from, family100)].msg)
            var data = await fetchJson(`https://raw.githubusercontent.com/xdlyy404/database/master/games/family100.json`)
            var anu = data[Math.floor(Math.random() * data.length)]
            var teks = `*FAMILY 100*\n\n*Soal :* ${anu.soal}\n*Total Jawaban :* ${anu.jawaban.length}\n\nWaktu : ${gamewaktu}s`
            conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'FML' })
            .then( res => {
                let rgfds = []
                for (let i of anu.jawaban) {
                    let fefs = i.split('/') ? i.split('/')[0] : i
                    let iuhbb = fefs.startsWith(' ') ? fefs.replace(' ', '') : fefs
                    let axsf = iuhbb.endsWith(' ') ? iuhbb.replace(iuhbb.slice(-1), '') : iuhbb
                    rgfds.push(axsf.toLowerCase())
                }
                addPlayGame(from, 'Family 100', rgfds, gamewaktu, res, family100)
                gameAdd(sender, glimit)
            }).catch((e) => {
                console.log(color('[ Family 100 ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'asahotak':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, asahotak)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, asahotak[getGamePosi(from, asahotak)].msg)
            var data = await fetchJson(`https://raw.githubusercontent.com/xdlyy404/database/master/games/asahotak.json`)
            var result = data[Math.floor(Math.random() * data.length)]
            var { soal, jawaban } = result
            var teks = `*ASAH OTAK*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
            conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'AO' })
            .then( res => {
                var jawab = jawaban.toLowerCase()
                addPlayGame(from, 'Asah Otak', jawab, gamewaktu, res, asahotak)
                gameAdd(sender, glimit)
            }).catch((e) => {
                console.log(color('[ Asah Otak ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'susunkata':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, susunkata)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, susunkata[getGamePosi(from, susunkata)].msg)
            var data = await fetchJson(`https://raw.githubusercontent.com/xdlyy404/database/master/games/susunkata.json`)
            var result = data[Math.floor(Math.random() * data.length)]
            var { soal, tipe, jawaban } = result
            var teks = `*SUSUN KATA*\n\n`+monospace(`Soal : ${soal}\nTipe : ${tipe}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
            conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'SK' })
            .then( res => {
                var jawab = jawaban.toLowerCase()
                addPlayGame(from, 'Susun Kata', jawab, gamewaktu, res, susunkata)
                gameAdd(sender, glimit)
            }).catch((e) => {
                console.log(color('[ Susun Kata ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'caklontong':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, caklontong)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, caklontong[getGamePosi(from, caklontong)].msg)
            var data = await fetchJson(`https://raw.githubusercontent.com/xdlyy404/database/master/games/caklontong.json`)
            var result = data[Math.floor(Math.random() * data.length)]
            var { soal, jawaban } = result
            var teks = `*CAK LONTONG*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
            conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'CL' })
            .then( res => {
                var jawab = jawaban.toLowerCase()
                addPlayGame(from, 'Cak Lontong', jawab, gamewaktu, res, caklontong)
                gameAdd(sender, glimit)
            }).catch((e) => {
                console.log(color('[ Cak Lontong ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'siapakahaku': case prefix+'siapaaku':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, siapakahaku)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, siapakahaku[getGamePosi(from, siapakahaku)].msg)
            var data = await fetchJson(`https://raw.githubusercontent.com/xdlyy404/database/master/games/siapakahaku.json`)
            var result = data[Math.floor(Math.random() * data.length)]
            var { soal, jawaban } = result
            var teks = `*SIAPAKAH AKU*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
            conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'SA' })
            .then( res => {
                var jawab = jawaban.toLowerCase()
                addPlayGame(from, 'Siapakah Aku', jawab, gamewaktu, res, siapakahaku)
                gameAdd(sender, glimit)
            }).catch((e) => {
                console.log(color('[ Siapakah Aku ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'tebaklirik':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (isPlayGame(from, tebaklirik)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebaklirik[getGamePosi(from, tebaklirik)].msg)
            var data = await fetchJson(`https://raw.githubusercontent.com/xdlyy404/database/master/games/tebaklirik.json`)
            var result = data[Math.floor(Math.random() * data.length)]
            var { soal, jawaban } = result
            var teks = `*TEBAK LIRIK*\n\n`+monospace(`Soal : ${soal}\nPetunjuk : ${jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
            conn.sendMessage(from, { text: teks }, { quoted: msg, messageId: 'BAE5'+makeid(10).toUpperCase()+'TLK' })
            .then( res => {
                var jawab = jawaban.toLowerCase()
                addPlayGame(from, 'Tebak Lirik', jawab, gamewaktu, res, tebaklirik)
                gameAdd(sender, glimit)
            }).catch((e) => {
                console.log(color('[ TEBAKLIRIK ]', 'red'), e)
                reply(mess.error.api)
                conn.sendMessage(ownerNumber, { text: `${command} error : ${e}` })
            })
            break
        case prefix+'delgame': case prefix+'deletegame': case prefix+'dellgame': case prefix+'nyerah':
            if (!isQuotedMsg) return reply(`Balas pesan soal game yang ingin dihapus`)
            if (quotedMsg.id.endsWith('TG')) {
                var tg = getGamePosi(from, tebakgambar)
                if (tg == undefined) return reply(`Game tersebut sudah selesai`)
                if (tebakgambar[tg].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                reply(`*Tebak Gambar*\nJawaban : ${tebakgambar[tg].jawaban}`)
                tebakgambar.splice(tg, 1)
            } else if (quotedMsg.id.endsWith('KS')) {
                var ks = getGamePosi(from, kuis)
                if (ks == undefined) return reply(`Game tersebut sudah selesai`)
                if (kuis[ks].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                reply(`*Kuis Game*\nJawaban : ${kuis[ks].jawaban}`)
                kuis.splice(ks, 1)
            } else if (quotedMsg.id.endsWith('TL')) {
                var tl = getGamePosi(from, tebaklagu)
                if (tl == undefined) return reply(`Game tersebut sudah selesai`)
                if (tebaklagu[tl].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                reply(`*Tebak Lagu*\nJawaban : ${tebaklagu[tl].jawaban}`)
                tebaklagu.splice(tl, 1)
            } else if (quotedMsg.id.endsWith('FML')) {
                var fml = getGamePosi(from, family100)
                if (fml == undefined) return reply(`Game tersebut sudah selesai`)
                if (family100[fml].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                reply(`*Family 100*\nJawaban : ${family100[fml].jawaban}`)
                family100.splice(fml, 1)
            } else if (quotedMsg.id.endsWith('AO')) {
                var ao = getGamePosi(from, asahotak)
                if (ao == undefined) return reply(`Game tersebut sudah selesai`)
                if (asahotak[ao].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                reply(`*Asah Otak*\nJawaban : ${asahotak[ao].jawaban}`)
                asahotak.splice(ao, 1)
            } else if (quotedMsg.id.endsWith('SK')) {
                var sk = getGamePosi(from, susunkata)
                if (sk == undefined) return reply(`Game tersebut sudah selesai`)
                if (susunkata[sk].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                reply(`*Susun Kata*\nJawaban : ${susunkata[sk].jawaban}`)
                susunkata.splice(sk, 1)
            } else if (quotedMsg.id.endsWith('CL')) {
                var cl = getGamePosi(from, caklontong)
                if (cl == undefined) return reply(`Game tersebut sudah selesai`)
                if (caklontong[cl].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                reply(`*Cak Lontong*\nJawaban : ${caklontong[cl].jawaban}`)
                caklontong.splice(cl, 1)
            } else if (quotedMsg.id.endsWith('SA')) {
                var sa = getGamePosi(from, siapakahaku)
                if (sa == undefined) return reply(`Game tersebut sudah selesai`)
                if (siapakahaku[sa].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                reply(`*Siapakah Aku*\nJawaban : ${siapakahaku[sa].jawaban}`)
                siapakahaku.splice(sa, 1)
            } else if (quotedMsg.id.endsWith('TLK')) {
                var tlk = getGamePosi(from, tebaklirik)
                if (tlk == undefined) return reply(`Game tersebut sudah selesai`)
                if (tebaklirik[tlk].msg.key.id !== quotedMsg.id) return reply(`Game tersebut sudah selesai`)
                reply(`*Tebak Lirik*\nJawaban : ${tebaklirik[tlk].jawaban}`)
                tebaklirik.splice(tlk, 1)
            } else {
                reply(`Balas soal game!`)
            }
            break
        case prefix+'casino':
            if (!isGroup)return reply(mess.OnlyGrup)
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal`)
            if (mentionUser.length == 0) return reply(`Tag Lawan Yang Ingin Diajak Bermain Game`)
            if (mentionUser.length > 2) return reply('Hanya bisa dengan 1 orang')
            if (mentionUser[0] === sender) return reply(`Sad amat main sama diri sendiri`)
            if (mentionUser[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
            if (getCasino(from, casino) !== null) return reply(`Sedang Ada Sesi, tidak dapat dijalankan secara bersamaan\nKetik *${prefix}delcasino*, untuk menghapus sesi`)
            if (args.length == 2) return reply('Masukan Nominal Nya')
            if (args[2].includes('-')) return reply(`Jangan menggunakan -`)
            if (isNaN(parseInt(args[2]))) return reply('Nominal Harus Berupa Angka!')
            var anu = getBalance(sender, balance)
            var ani = getBalance(mentionUser[0], balance)
            if (anu < args[2] || anu == 'undefined') return reply(`Balance Tidak Mencukupi, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
            if (ani < args[2] || ani == 'undefined') return reply(`Balance Lawan Tidak Mencukupi Untuk Bermain Denganmu\nKetik ${prefix}balance @tag untuk mengecek Balance lawanmu`)
            setCasino(from, sender.split("@")[0], mentioned[0].split("@")[0], Number(args[2]), casino)
            gameAdd(sender, glimit)
            var starGame = `🎰 Memulai Game Casino 💰\n\n• @${sender.replace("@s.whatsapp.net", "")} Menantang ${args[1]}, dengan Nominal: *$ ${parseInt(args[2])}*\n• Ketik Y/N untuk menerima atau menolak Permainan!\n• Jika 30 detik tidak ada Jawaban dari lawan, maka pertandingan otomatis dihapus`
            conn.sendMessage(from, { text: starGame, mentions: [sender, args[1].replace("@", "") + "@s.whatsapp.net"] }, { quoted: msg })
            break
        case prefix+'delcasino':
            if (isPlayCasino(from, casino)) {
                var csn = sesiCasino(from, casino)
                if (csn.Z.includes(sender)) {
                    clearTimeout(csn.expired)
                    deleteCasino(from, casino)
                    reply('Berhasil Menghapus Sesi Casino')
                } else if (csn.Y.includes(sender)) {
                    clearTimeout(csn.expired)
                    deleteCasino(from, casino)
                    reply('Berhasil Menghapus Sesi Casino')
                } else if (isGroupAdmins) {
                    clearTimeout(csn.expired)
                    deleteCasino(from, casino)
                    reply('Berhasil Menghapus Sesi Casino')
                } else if (isOwner) {
                    clearTimeout(csn.expired)
                    deleteCasino(from, casino)
                    reply('Berhasil Menghapu Sesi Casino')
                } else {
                    reply('Anda tidak bisa menghapus sesi casino, karena bukan pemain!')
                }
            } else {
                reply('Tidak ada sesi yang berlangsung')
            }
            break
        case prefix+'suitpvp': case prefix+'suit':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            conn.suit = conn.suit ? conn.suit : {}
            if (!isGroup) return reply("Command ini khusus group.");
            if (args.length < 2) return reply("Tag lawanmu.\n\nex : #suitpvp @tag");
            if (Object.values(conn.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(sender))) return reply("Selesaikan game mu yang sebelumnya terlebih dahulu.");
            if (!msg.mentioned[0]) return reply("Tag lawanmu.\n\nex : #suitpvp @tag");
            if (mentioned[0] === sender) return reply("Tidak bisa bermain dengan dirimu sendiri.");
            if (mentioned[0] === botNumber) return reply("Tidak bisa bermain dengan bot.");
            if (Object.values(conn.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(mentioned[0]))) reply("Orang yang kamu tag/tantang sedang bermain dengan yang lain.")
            let timeout = 60000
            let id = 'suit_' + new Date() * 1
            let caption = `\`\`\`@${sender.split`@`[0]} menantang @${msg.mentioned[0].split`@`[0]} untuk bermain suit.

Silahkan @${msg.mentioned[0].split`@`[0]} untuk ketik terima/tolak.\`\`\``
            conn.sendMessage(from, {text: caption, mentions: [sender, msg.mentioned[0]] })
            conn.suit[id] = {
                id: id,
                p: sender,
                p2: msg.mentioned[0],
                status: 'wait',
                waktu: setTimeout(() => {
                    if (conn.suit[id]) conn.sendMessage(from, {text: `waktu suit habis, game berakhir.`})
                    delete conn.suit[id]
                }, 30000), 
                timeout: timeout
            }
            gameAdd(sender, glimit)
            break
        case prefix+'shot': {
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            var listShot = ["🟢","🔴"]
            var randShot = listShot[Math.floor(Math.random() * listShot.length)];
            var objekShot3 = args[1] === "3" ? randShot : "⚫"
            var objekShot2 = args[1] === "2" ? randShot : "⚫"
            var objekShot1 = args[1] === "1" ? randShot : "⚫"
            var tekShot = `「 🎯 | *SHOT GAMES* | 🎯 」
─────────────

   ${objekShot1}       ${objekShot2}        ${objekShot3}

─────────────
「 🎯 | *SHOT GAMES* | 🎯 」

Keterangan : Jika objek berwarna hijau berarti anda menang

Contoh : ⚫  🟢  ⚫`
            if (args.length < 2) return reply('Example :\n .shot 1\n\nTebak Angkanya Dan Dapatkan Balance!')
            if (3 < args[1]) return reply(`Hanya bisa menebak angka 1 - 3`)
            if (isNaN(args[1])) return reply(`Nominal harus berupa angka!`)
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            var htgm = randomNomor(100, 150)
            var anu = getBalance(sender, balance)
            if (objekShot1 === "🟢" ? true : objekShot2 === "🟢" ? true : objekShot3 === "🟢" ? true : false) {
                reply(tekShot).then(res => {
                    addBalance(sender, htgm, balance)
                    reply(`Selamat @${sender.split("@")[0]} kamu telah memenangkan game shot & mendapatkan ${htgm} balance`)
                })
            } else {
                reply(tekShot).then(res => {
                    kurangBalance(sender, htgm, balance)
                    reply(`Maaf kak @${sender.split("@")[0]} tembakan salah sasaran, balance dikurangin sebesar ${htgm}`)
                })
            }
            gameAdd(sender, glimit)
            }
            break
        case prefix+'apakah':
            if (!q) return reply(`Gunakan dengan cara ${command} text\n\n_Contoh_\n\n${command} kamu lonteh`)
            const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Betul','Bisa Jadi Tidak']
            const kah = apa[Math.floor(Math.random() * apa.length)]
            conn.sendMessage(from, { text: `Pertanyaan : apakah ${q}\nJawaban : ${kah}` }, { quoted: msg })
            break
        case prefix+'bisakah': case prefix+'bisa': case prefix+'bisagak':
            if (!q) return reply(`Gunakan dengan cara ${command} text\n\n_Contoh_\n\n${command} saya punya cewe`)
            const bisa = ['Bisa','Gak Bisa','Gak Bisa Ajg Awokwokak','TENTU PASTI KAMU BISA!!!!','TENTU, PASTI KAMU *TIDAK* BISA!!']
            const ga = bisa[Math.floor(Math.random() * bisa.length)]
            conn.sendMessage(from, { text: `Pertanyaan : bisakah ${q}\nJawaban : ${ga}` }, { quoted: msg })
            break
        case prefix+'kapankah': case prefix+'kapan':
            if (!q) return reply(`Gunakan dengan cara ${command} Pertanyaan\n\n_Contoh_\n\n${command} saya punya cewe`)
            const kapan = ['5 Hari Lagi', '10 Hari Lagi', '15 Hari Lagi','20 Hari Lagi', '25 Hari Lagi','30 Hari Lagi','35 Hari Lagi','40 Hari Lagi','45 Hari Lagi','50 Hari Lagi','55 Hari Lagi','60 Hari Lagi','65 Hari Lagi','70 Hari Lagi','75 Hari Lagi','80 Hari Lagi','85 Hari Lagi','90 Hari Lagi','100 Hari Lagi','5 Bulan Lagi', '10 Bulan Lagi', '15 Bulan Lagi','20 Bulan Lagi', '25 Bulan Lagi','30 Bulan Lagi','35 Bulan Lagi','40 Bulan Lagi','45 Bulan Lagi','50 Bulan Lagi','55 Bulan Lagi','60 Bulan Lagi','65 Bulan Lagi','70 Bulan Lagi','75 Bulan Lagi','80 Bulan Lagi','85 Bulan Lagi','90 Bulan Lagi','100 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','Besok','Lusa',`Abis Ini Juga Lu ${q}`]
            const kapankah = kapan[Math.floor(Math.random() * kapan.length)]
            conn.sendMessage(from, { text: `Pertanyaan : kapankah ${q}\nJawaban : *${kapankah}*` }, { quoted: msg })
            break
        case prefix+'bagaimanakah': case prefix+'gimanakah': case prefix+'gimana':
            if (!q) return reply(`Gunakan dengan cara ${command} text\n\n_Contoh_\n\n${command} cara punya cewe`)
            const gimana = ['Ga Gimana2', 'Sulit Itu Bro', 'Maaf Bot Tidak Bisa Menjawab', 'Coba Deh Cari Di Gugel','Astaghfirallah Beneran???','Pusing ah','Ooh Gitu','Yang Sabar Ya Bos','Gimana yeee']
            const ya = gimana[Math.floor(Math.random() * gimana.length)]
            conn.sendMessage(from, { text: `Pertanyaan : bagaimanakah ${q}\nJawaban : ${ya}` }, { quoted: msg })
            break
        case prefix+'rate': case prefix+'nilai':
            if (!q) return reply(`Gunakan dengan cara ${command} text\n\n_Contoh_\n\n${command} kebesaran titit sy`)
            const ra = ['5', '10', '15' ,'20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
            const te = ra[Math.floor(Math.random() * ra.length)]
            conn.sendMessage(from, { text: `Rate : ${q}\nJawaban : *${te}%*` }, { quoted: msg })
            break
        case prefix+'gantengcek': case prefix+'cekganteng':
            if (!q) return reply(`Gunakan dengan cara ${command} Nama\n\n_Contoh_\n\n${command} yunusd`)
            const gan = ['5', '10', '15' ,'20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
            const teng = gan[Math.floor(Math.random() * gan.length)]
            conn.sendMessage(from, { text: `Nama : ${q}\nJawaban : *${teng}%*` }, { quoted: msg })
            break
        case prefix+'cantikcek': case prefix+'cekcantik':
            if (!q) return reply(`Gunakan dengan cara ${command} Nama\n\n_Contoh_\n\n${command} ${pushname}`)
            const can = ['5', '10', '15' ,'20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
            const tik = can[Math.floor(Math.random() * can.length)]
            conn.sendMessage(from, { text: `Nama : ${q}\nJawaban : *${tik}%*` }, { quoted: msg })
            break
        case prefix+'sangecek': case prefix+'ceksange': case prefix+'gaycek': case prefix+'cekgay': case prefix+'lesbicek': case prefix+'ceklesbi':
            if (!q) return reply(`Gunakan dengan cara ${command} Nama\n\n_Contoh_\n\n${command} ${pushname}`)
            const sangeh = ['5', '10', '15','20', '25','30','35','40','45','50','55','60','65','70','75','80','85','90','100']
            const sange = sangeh[Math.floor(Math.random() * sangeh.length)]
            conn.sendMessage(from, { text: `Nama : ${q}\nJawaban : *${sange}%*` }, { quoted: msg })
            break
        case prefix+'cekbapak':
            const bapak = ['Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda', 'Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v', 'Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : yunusd ID']
            const bapack = bapak[Math.floor(Math.random() * bapak.length)]
            conn.sendMessage(from, { text: bapack }, { quoted: msg })
            break
        case prefix+'jadian':{
            var parti = groupMetadata.participants.map(v => v.id)
            var participanteg = parti[Math.floor(Math.random() * parti.length)]
            var participantegg = parti[Math.floor(Math.random() * parti.length)]
            conn.sendMessage(from, { text: `Ciee yang jadian💖 jangan lupa pajak jadiannya🐤\n\n@${participanteg.split('@')[0]} ❤️ @${participantegg.split('@')[0]}`, footer: footer, buttons: [ { buttonId: prefix+'jadian', buttonText: { displayText: 'Jadian' }, type: 1 } ], mentions: [participanteg, participantegg] })
            }
            break
        case prefix+'jodohku':{
            var parti = groupMetadata.participants.map(v => v.id)
            var participanteg = parti[Math.floor(Math.random() * parti.length)]
            conn.sendMessage(from, { text: `👫 Jodohmu adalah\n\n@${sender.split('@')[0]} ❤️ @${participanteg.split('@')[0]}`, footer: footer, buttons: [ { buttonId: prefix+'jodohku', buttonText: { displayText: 'Jodohku' }, type: 1 } ], mentions: [sender, participanteg] })
            }
            break
        case prefix+'musuhku':{
            var parti = groupMetadata.participants.map(v => v.id)
            var participanteg = parti[Math.floor(Math.random() * parti.length)]
            conn.sendMessage(from, { text: `☠️ Musuhmu adalah\n\n@${sender.split('@')[0]} 🤜🏻🤛🏻 @${participanteg.split('@')[0]}\n\nJangan lupa adu jotos kalo beneran musuhan😎`, footer: footer, buttons: [ { buttonId: prefix+'musuhku', buttonText: { displayText: 'Musuhku' }, type: 1 } ], mentions: [sender, participanteg] })
            }
            break

        

        // Bank Menu
        case prefix+'topglobal':{
            balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
            let top = '*── 「 TOPGLOBAL BALANCE 」 ──*\n\n'
            let arrTop = []
            var total = 10
            if (balance.length < 10) total = balance.length
            for (let i = 0; i < total; i ++){
                top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                arrTop.push(balance[i].id)
            }
            mentions(top, arrTop, true)
            }
            break
        case prefix+'toplocal':{
            if (!isGroup)return reply(mess.OnlyGrup)
            balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
            let top = '*── 「 TOPLOCAL BALANCE 」 ──*\n\n'
            let arrTop = []
            var total = 10
            if (balance.length < 10) total = balance.length
            let anggroup = groupMembers.map(a => a.id)
            for (let i = 0; i < total; i ++){
                if (anggroup.includes(balance[i].id)) {
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
            }
            mentions(top, arrTop, true)
            }
            break
        case prefix+'buylimit':{
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *jumlah limit yang ingin dibeli*\n\n_Contoh_\n\n${command} 15\n\nNote :\nHarga 1 limit = $50 balance`)
            if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
            if (isNaN(args[1])) return reply(`Harus berupa angka`)
            if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
            let ane = Number(parseInt(args[1]) * 50)
            if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
            kurangBalance(sender, ane, balance)
            giveLimit(sender, parseInt(args[1]), limit)
            reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Uang : Rp ${toRupiah(getBalance(sender, balance))}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
            break
        case prefix+'buygamelimit': case prefix+'buyglimit':{
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *jumlah game limit yang ingin dibeli*\n\n_Contoh_\n\n${command} 15\n\nNote :\nHarga 1 limit = $50 balance\nPajak $1 / $10`)
            if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
            if (isNaN(args[1])) return reply(`Harus berupa angka`)
            if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
            let ane = Number(parseInt(args[1]) * 50)
            if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
            kurangBalance(sender, ane, balance)
            givegame(sender, parseInt(args[1]), glimit)
            reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Uang : Rp ${toRupiah(getBalance(sender, balance))}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
            break
        case prefix+'transfer': case prefix+'tf':{
            if (args.length < 2) return mentions(`Gunakan dengan cara ${command} *@tag nominal*\n\n_Contoh_\n\n${command} @${ownerNumber.split('@')[0]} 2000`, [ownerNumber], true)
            if (mentionUser.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
            if (!args[2]) return reply(`Masukkan nominal nya!`)
            if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
            if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
            if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
            var anu = getBalance(sender, balance)
            if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
            kurangBalance(sender, parseInt(args[2]), balance)
            addBalance(mentionUser[0], parseInt(args[2]), balance)
            mentions(`Sukses transfer balance sebesar $${args[2]} kepada @${mentionUser[0].split("@")[0]}`, [mentionUser[0]], true)
            }
            break
        case prefix+'limit': case prefix+'balance': case prefix+'ceklimit': case prefix+'cekbalance':
            if (mentionUser.length !== 0){
                var Ystatus = ownerNumber.includes(mentionUser[0])
                var isPrim = Ystatus ? true : _prem.checkPremiumUser(mentionUser[0], premium)
                var ggcount = isPrim ? gcounti.prem : gcounti.user
                var limitMen = `${getLimit(mentionUser[0], limitCount, limit)}`
                reply(`💳 Limit : ${isPrim ? 'Unlimited' : limitMen+'/'+limitCount}\n🕹️ Limit Game : ${cekGLimit(mentionUser[0], ggcount, glimit)}/${ggcount}\n🏦 Balance : Rp ${toRupiah(getBalance(mentionUser[0], balance))}\n\nKamu dapat membeli limit dengan ${prefix}buylimit *jumlah* dan ${prefix}buyglimit *jumlah* untuk membeli game limit\n\n*Example :*\n${prefix}buylimit 1\n${prefix}buyglimit 1\n\n*Note :*\n• Harga 1 limit = $50 balance`)
            } else {
                var limitPrib = `${getLimit(sender, limitCount, limit)}/${limitCount}`
                reply(`💳 Limit : ${isPremium ? 'Unlimited' : limitPrib+'/'+limitCount}\n🕹️ Limit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}\n🏦 Balance : Rp ${toRupiah(getBalance(sender, balance))}\n\nKamu dapat membeli limit dengan ${prefix}buylimit *jumlah* dan ${prefix}buyglimit *jumlah* untuk membeli game limit\n\n*Example :*\n${prefix}buylimit 1\n${prefix}buyglimit 1\n\n*Note :*\n• Harga 1 limit = $50 balance`)
            }
            break

        // Owner Menu
        case prefix+'exif':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            var namaPack = q.split('|')[0] ? q.split('|')[0] : q
            var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
            exif.create(namaPack, authorPack)
            reply(`Sukses membuat exif`)
            break
        case prefix+'join':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *link_group*\n\n_Contoh_\n\n${command} https://chat.whatsapp.com/`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            var url = args[1]
            url = url.split('https://chat.whatsapp.com/')[1]
            var data = await conn.groupAcceptInvite(url)
            reply(jsonformat(data))
            break
        case prefix+'leave':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!isGroup) return reply(mess.OnlyGrup)
            conn.groupLeave(from)
            break
        case prefix+'self':{
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            conn.mode = 'self'
            reply('Berhasil berubah ke mode self')
            }
            break
        case prefix+'publik': case prefix+'public':{
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            conn.mode = 'public'
            reply('Berhasil berubah ke mode public')
            }
            break
        case prefix+'setprefix':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Masukkan prefix\nOptions :\n=> multi\n=> nopref`)
            if (q === 'multi') {
                conn.multi = true
                reply(`Berhasil mengubah prefix ke ${q}`)
            } else if (q === 'nopref') {
                conn.multi = false
                conn.nopref = true
                reply(`Berhasil mengubah prefix ke ${q}`)
            } else {
                conn.multi = false
                conn.nopref = false
                conn.prefa = `${q}`
                reply(`Berhasil mengubah prefix ke ${q}`)
            }
            break
        case prefix+'setpp': case prefix+'setppbot':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (isImage || isQuotedImage) {
                var media = await conn.downloadAndSaveMediaMessage(msg, 'image', 'ppbot.jpeg')
                if (args[1] == '\'panjang\'') {
                    var { img } = await generateProfilePicture(media)
                    await conn.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type:'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [
                        {
                            tag: 'picture',
                            attrs: { type: 'image' },
                            content: img
                        }
					    ]
                    })
					fs.unlinkSync(media)
					reply(`Sukses`)
				} else {
					var data = await conn.updateProfilePicture(botNumber, { url: media })
			        fs.unlinkSync(media)
				    reply(`Sukses`)
				}
            } else {
                reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
            }
            break
        case prefix+'broadcast': case prefix+'bc':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *teks*\n\n_Contoh_\n\n${command} feature updated`)
            var data = await store.chats.all()
            for (let i of data) {
                var butBc = [{ urlButton: { displayText: 'Copy Link Group', url: "https://www.whatsapp.com/otp/copy/https://chat.whatsapp.com/"+await conn.groupInviteCode("120363022649759651@g.us") } }]
                conn.sendMessage(i.id, { text: q, footer: 'BROADCAST', templateButtons: butBc })
                await sleep(1000)
            }
            reply(`Successfully sent a broadcast message to ${data.length} chat`)
            break
        case prefix+'bcshare':{
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *teks*\n\n_Contoh_\n\n${command} feature updated`)
            var bece = await store.chats.all()
            for (let x of bece) {
                var bc = [{ urlButton: { displayText: 'Share Bot', url: 'https://wa.me/?text=Hai+sekarang+whatsapp+ada+botnya+loh,+Yuk+bergabung+menjadi+user+di+bot+kami+https://api.whatsapp.com/send?phone='+ botNumber.split('@')[0] } }]
                conn.sendMessage(x.id, { location: { jpegThumbnail: thumb }, caption: q, footer: 'BROADCAST', templateButtons: bc })
                await sleep(1000)
            }
            reply(`Successfully sent a broadcast message to ${bece.length} chat`)
            }
            break
        case prefix+'bcsewa': {
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!q) return reply("Masukkan teks")
            for (let i of sewa){
                await conn.sendMessage(i.id, { text: q })
                await sleep(3000) // delay 3 detik
            }
                reply(`Successfully sent a broadcast message to ${sewa.length} group`)
            }
            break
        case prefix+'addprem': case prefix+'addpremium':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara :\n${command} *@tag waktu*\n${command} *nomor waktu*\n\n_Contoh_\n\n${command} @tag 30d\n${command} 62895xxxxxxxx 30d`)
            if (!args[2]) return reply(`Mau yang berapa hari?`)
            if (mentionUser.length !== 0) {
                _prem.addPremiumUser(mentionUser[0], args[2], premium)
                reply('Sukses')
            } else {
                var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                _prem.addPremiumUser(args[1]+'@s.whatsapp.net', args[2], premium)
                reply('Sukses')
            }
            break
        case prefix+'delprem': case prefix+'delpremium':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara :\n${command} *@tag*\n${command} *nomor*\n\n_Contoh_\n\n${command} @tag\n${command} 62895xxxxxxxx`)
            if (mentionUser.length !== 0){
                premium.splice(_prem.getPremiumPosition(mentionUser[0], premium), 1)
                fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                reply('Sukses!')
            } else {
                var cekpr = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                if (cekpr.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                reply('Sukses!')
            }
            break
        case prefix+'addsewa':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *link waktu*\n\n_Contoh_\n\n${command} https://chat.whatsapp.com/Hjv5qt195A2AcwkbswwoMQ 30d`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            var url = args[1]
            url = url.split('https://chat.whatsapp.com/')[1]
            if (!args[2]) return reply(`Waktunya?`)
            var data = await conn.groupAcceptInvite(url)
            if (_sewa.checkSewaGroup(data, sewa)) return reply(`Bot sudah disewa oleh grup tersebut!`)
            _sewa.addSewaGroup(data, args[2], sewa)
            reply(`Success Add Sewa Group Berwaktu!`)
            break
        case prefix+'delsewa':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            /*if (!isGroup) return reply(`Perintah ini hanya bisa dilakukan di Grup yang menyewa bot`)
            if (!isSewa) return reply(`Bot tidak disewa di Grup ini`)*/
            sewa.splice(_sewa.getSewaPosition(args[1] ? args[1] : from, sewa), 1)
            fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
            reply(`Sukses`)
            break
        case prefix+'culik':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!isGroup) return reply(mess.OnlyGroup)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *id group*\n\n_Contoh_\n\n${command} 6282387804410-1610364932@g.us`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            var url = args[1]
            url = url.split('https://chat.whatsapp.com/')[1]
            var data = await conn.groupAcceptInvite(url)
            var { participants } = await conn.groupMetadata(data)
            for (let i of participants) {
                await conn.groupParticipantsUpdate(from, [i.id], "add")
            }
            break

        // Akses Eval
        case prefix+'akseseval':
	        if (isOwner) return reply(`Lu owner vangke!`)
	        if (isMods) return reply(`Kamu sudah terdaftar dalam database mods`)
	        if (isGroup) return reply(mess.OnlyPM)
	        if (args.length < 2) return reply(`Masukkan parameter Username dan Password\nContoh: ${command} username|password`)
	        var user = q.split("|")[0]
	        var pw = q.split("|")[1]
	        if (!user) return reply(`Masukkan parameter Username dan Password\nContoh: ${command} username|password`)
            if (!pw) return reply(`Masukkan parameter Username dan Password\nContoh: ${command} username|password`)
            if (user !== uss) return reply(`Login failed. Invalid username or password`)
	        if (pw !== pass) return reply(`Login failed. Invalid username or password`)
	        modsNumber.push(sender)
	        fs.writeFileSync('./database/modsNumber.json', JSON.stringify(modsNumber, null, 2))
            reply(`Login accepted!`)
	        conn.sendMessage(ownerNumber, { text: `wa.me/${sender.split("@")[0]} Join access eval on ${jam}` })
	        break
	    case prefix+'delakses':
	        if (!isOwner) return
            var number = null
	        if (mentionUser[0]) {
                number = mentionUser[0]
            } else if (args[1].length === 1 && !isNaN(args[1])) {
                if (args[1] > modsNumber.length) return reply(`Hanya terdaftar sebanyak ${modsNumber.length}, ketik ${prefix}listmods`)
                number = modsNumber[args[1] - 1]
	        } else if (args[1].length > 1 && !isNaN(args[1])) {
	            var data = await conn.onWhatsApp(args[1]+'@s.whatsapp.net')
	            if (data === undefined) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
	            number = args[1]+'@s.whatsapp.net'
            } else {
                 reply(`Kirim perintah ${command} @tag atau nomor yang ingin di hapus dari list mods`)
            }
	        var posi = null
	        Object.keys(modsNumber).forEach((i) => {
	            if (modsNumber[i] === number) {
	                posi = i
                }
            })
            if (posi !== null) {
                modsNumber.splice(posi, 1)
                fs.writeFileSync('./database/modsNumber.json', JSON.stringify(modsNumber, null, 2))
                reply(`Sukses`)
            } else {
                reply(`Nomer tersebut tidak terdaftar di dalam database!`)
            }
	        break
	    case prefix+'listmods':
	        if (!isOwner && !fromMe) return
	        var no = 1
            var teks = `List Mods ${botName}\n\n`
	        for (let i of modsNumber) {
	            teks += `*${no++}.* @${i.split("@")[0]}\n`
	        }
	        teks += `\nKetik ${prefix}delakses num/@tag untuk menghapus <Only Owner>`
	        reply(teks)
	        break

default:
}
    } catch (err) {
        console.log(color('[ ERROR ]', 'red'), err)
        conn.sendMessage(setting.ownerNumber, { text: `${err}` })
    }
}
