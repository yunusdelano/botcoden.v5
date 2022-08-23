const fs = require("fs");

let setting = JSON.parse(fs.readFileSync('./config.json'))
const { getLimit, getBalance, cekGLimit } = require("../lib/limit")

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
    x = x.toString()
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
    return x;
}

exports.allmenu = (ucapanWaktu, sender, mundur, upload, download, totalGb, usedGb, freeGb, ownerName, botName, jam, tanggal, runtime, pushname, isOwner, isPremium, limitCount, limit, gcount, glimit, toRupiah, balance, prefix) => {
	return `${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}

 *HITUNG MUNDUR HARI KEMERDEKAAN*
  ${mundur}

 *STATISTIC*
  • Upload : ${upload}
  • Downloads : ${download}
  • Total : ${totalGb} GB
  • Used : ${usedGb} GB
  • Free : ${freeGb} GB

 *INFO-BOT*
  • Creator : ${ownerName}
  • Bot Name : ${botName}
  • Time : ${jam}
  • Date : ${tanggal}
  • Runtime :
  ${runtime(process.uptime())}

 *INFO-USER*
  • Name : ${pushname !== undefined ? pushname : '-'}
  • Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Gratisan'}
  • Limit : ${isOwner ? '-' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
  • Limit Game : ${isOwner ? '-' : cekGLimit(sender, gcount, glimit)}
  • Balance : Rp ${toRupiah(getBalance(sender, balance))}
${readmore}
 *MAIN MENU*
  › ${prefix}menu
  › ${prefix}statistic
  › ${prefix}runtime
  › ${prefix}speed
  › ${prefix}owner
  › ${prefix}donate
  › ${prefix}rentalbot
  › ${prefix}checkpremium
  › ${prefix}listpremium
  › ${prefix}listsewa
  › ${prefix}profile

 *TOOLS MENU*
  › ${prefix}sticker
  › ${prefix}smeme
  › ${prefix}stickerwm
  › ${prefix}toimg
  › ${prefix}tovideo
  › ${prefix}toaudio
  › ${prefix}attp
  › ${prefix}ttp
  › ${prefix}emojimix
  › ${prefix}nulis
  › ${prefix}upload
  › ${prefix}listbahasa
  › ${prefix}translate 

 *STORE MENU*
  › ${prefix}list
  › ${prefix}addlist
  › ${prefix}dellist
  › ${prefix}update
  › ${prefix}jeda

 *KALKULATOR*
  › ${prefix}tambah
  › ${prefix}kurang
  › ${prefix}kali
  › ${prefix}bagi

 *PROSES & DONE*
  › proses
  › done
  › ${prefix}setproses
  › ${prefix}changeproses
  › ${prefix}delsetproses
  › ${prefix}setdone
  › ${prefix}changedone
  › ${prefix}delsetdone

 *RESPOSE BOT*
  › bot
  › ${prefix}setbot
  › ${prefix}changebot
  › ${prefix}delsetbot

 *OPEN & CLOSE*
  › ${prefix}open
  › ${prefix}close
  › ${prefix}setopen
  › ${prefix}changeopen
  › ${prefix}delsetopen
  › ${prefix}setclose
  › ${prefix}changeclose
  › ${prefix}delsetclose

 *STALKER MENU*
  › ${prefix}ffid
  › ${prefix}mlid
  › ${prefix}pubgid
  › ${prefix}higgsid
  › ${prefix}codmid
  › ${prefix}pbid
  › ${prefix}aovid
  › ${prefix}sausageid
  › ${prefix}zepetoid
  › ${prefix}igstalk
  › ${prefix}ytstalk
  › ${prefix}ghstalk
  › ${prefix}twitterstalk
  › ${prefix}tiktokstalk

 *ANONYMOUS CHAT*
  › ${prefix}anonymous
  › ${prefix}start
  › ${prefix}stop
  › ${prefix}skip
  › ${prefix}sendprofile

 *DOWNLOADS MENU*
  › ${prefix}play
  › ${prefix}ytmp4
  › ${prefix}ytmp3
  › ${prefix}tiktok
  › ${prefix}tiktokmusic
  › ${prefix}twitter
  › ${prefix}twittermusic
  › ${prefix}facebook
  › ${prefix}facebookmusic
  › ${prefix}spotify
  › ${prefix}spotifydl
  › ${prefix}cocofun
  › ${prefix}mediafire
  › ${prefix}telesticker
  › ${prefix}pinterestdl
  › ${prefix}xnxxdl
  › ${prefix}gitclone
  › ${prefix}googledrive

 *SEARCH MENU*
  › ${prefix}ytsearch
  › ${prefix}tiktoktrend
  › ${prefix}spotifysearch
  › ${prefix}pinterest
  › ${prefix}googlelens
  › ${prefix}whatmusic
  › ${prefix}xnxxsearch

 *RANDOM WAIFU*
  › ${prefix}waifu
  › ${prefix}neko
  › ${prefix}trap
  › ${prefix}blowjob
  › ${prefix}shinobu
  › ${prefix}megumin
  › ${prefix}bully
  › ${prefix}cuddle
  › ${prefix}cry
  › ${prefix}hug
  › ${prefix}awoo
  › ${prefix}kiss
  › ${prefix}lick
  › ${prefix}pat
  › ${prefix}smug
  › ${prefix}bonk
  › ${prefix}yeet
  › ${prefix}blush
  › ${prefix}smile
  › ${prefix}wave
  › ${prefix}highfive
  › ${prefix}handhold
  › ${prefix}nom
  › ${prefix}bite
  › ${prefix}glomp
  › ${prefix}slap
  › ${prefix}kill
  › ${prefix}happy
  › ${prefix}wink
  › ${prefix}dance
  › ${prefix}cringe

 *RANDOM IMAGE*
  › ${prefix}meme
  › ${prefix}darkjokes
  › ${prefix}couple

 *TEXTPROME*
  › ${prefix}blackpink
  › ${prefix}neon
  › ${prefix}greenneon
  › ${prefix}advanceglow
  › ${prefix}futureneon
  › ${prefix}sandwriting
  › ${prefix}sandsummer
  › ${prefix}sandengraved
  › ${prefix}metaldark
  › ${prefix}neonlight
  › ${prefix}holographic
  › ${prefix}text1917
  › ${prefix}minion
  › ${prefix}deluxesilver
  › ${prefix}newyearcard
  › ${prefix}bloodfrosted
  › ${prefix}halloween
  › ${prefix}jokerlogo
  › ${prefix}fireworksparkle
  › ${prefix}natureleaves
  › ${prefix}bokeh
  › ${prefix}toxic
  › ${prefix}strawberry
  › ${prefix}box3d
  › ${prefix}roadwarning
  › ${prefix}breakwall
  › ${prefix}icecold
  › ${prefix}luxury
  › ${prefix}cloud
  › ${prefix}summersand
  › ${prefix}horrorblood
  › ${prefix}thunder
  › ${prefix}pornhub
  › ${prefix}glitch
  › ${prefix}avenger
  › ${prefix}space
  › ${prefix}ninjalogo
  › ${prefix}marvelstudio
  › ${prefix}lionlogo
  › ${prefix}wolflogo
  › ${prefix}steel3d
  › ${prefix}wallgravity

 *PHOTOOXY*
  › ${prefix}shadow
  › ${prefix}cup
  › ${prefix}cup1
  › ${prefix}romance
  › ${prefix}smoke
  › ${prefix}burnpaper
  › ${prefix}lovemessage
  › ${prefix}undergrass
  › ${prefix}love
  › ${prefix}coffe
  › ${prefix}woodheart
  › ${prefix}woodenboard
  › ${prefix}summer3d
  › ${prefix}wolfmetal
  › ${prefix}nature3d
  › ${prefix}underwater
  › ${prefix}golderrose
  › ${prefix}summernature
  › ${prefix}letterleaves
  › ${prefix}glowingneon
  › ${prefix}fallleaves
  › ${prefix}flamming
  › ${prefix}harrypotter
  › ${prefix}carvedwood
  › ${prefix}arcade8bit
  › ${prefix}battlefield4
  › ${prefix}pubg

 *GROUP MENU*
  › ${prefix}welcome
  › ${prefix}left
  › ${prefix}setwelcome
  › ${prefix}changewelcome
  › ${prefix}delsetwelcome
  › ${prefix}setleft
  › ${prefix}changeleft
  › ${prefix}delsetleft
  › ${prefix}linkgroup
  › ${prefix}setppgroup
  › ${prefix}setnamegroup
  › ${prefix}setdescription
  › ${prefix}antilink
  › ${prefix}antiwame
  › ${prefix}add
  › ${prefix}kick
  › ${prefix}promote
  › ${prefix}demote
  › ${prefix}revoke
  › ${prefix}hidetag
  › ${prefix}delete
  › ${prefix}checksewa

 *BAILEYS*
  › ${prefix}nowa
  › ${prefix}towame
  › ${prefix}quoted
  › ${prefix}fakehidetag
  › ${prefix}react
  › ${prefix}inspect

 *FUN MENU*
  › ${prefix}tictactoe
  › ${prefix}delttc
  › ${prefix}tebakgambar
  › ${prefix}kuis
  › ${prefix}tebaklagu
  › ${prefix}family100
  › ${prefix}asahotak
  › ${prefix}susunkata
  › ${prefix}caklontong
  › ${prefix}siapakahaku
  › ${prefix}tebaklirik
  › ${prefix}nyerah
  › ${prefix}casino
  › ${prefix}delcasino
  › ${prefix}suit
  › ${prefix}shot
  › ${prefix}apakah
  › ${prefix}bisakah
  › ${prefix}kapankah
  › ${prefix}bagaimanakah
  › ${prefix}rate
  › ${prefix}gantengcek
  › ${prefix}cantikcek
  › ${prefix}sangecek
  › ${prefix}gaycek
  › ${prefix}lesbicek
  › ${prefix}cekbapak


 *BANK MENU*
  › ${prefix}topglobal
  › ${prefix}toplocal
  › ${prefix}buylimit
  › ${prefix}buyglimit
  › ${prefix}transfer
  › ${prefix}limit
  › ${prefix}balance

 *OWNER MENU*
  › ${prefix}exif
  › ${prefix}join
  › ${prefix}leave
  › ${prefix}self
  › ${prefix}public
  › ${prefix}setprefix
  › ${prefix}setppbot
  › ${prefix}broadcast
  › ${prefix}bcsewa
  › ${prefix}addpremium
  › ${prefix}delpremium
  › ${prefix}addsewa
  › ${prefix}delsewa`
}

exports.donate = (pushname, ownerNumber) => {
    return`\t\t\t\t*💰「 DONATE 」💰*

Hai ${pushname}👋
Kalian bisa mendukung saya agar bot ini tetap up to date dengan:
🏧 085156443023(OVO/Dana/GoPay)

Berapapun donasi kalian akan sangat berarti 👍

Arigatou!

Contact person Owner:
wa.me/${ownerNumber.split("@")[0]} (Owner)`
}

exports.sewaBot = (prefix) => {
    return`*PRICE LIST SEWABOT*

IDR : 15.000
EXPIRED : WEEKLY

IDR : 20.000
EXPIRED : MONTHLY

Untuk Lebih Lanjut Silahkan Klik Dibawah`
}

exports.daftarPremium = (prefix) => {
    return`*PRICE LIST PREMIUM*

IDR : 10.000
EXPIRED : MONTHLY

Untuk Lebih Lanjut Silahkan Klik Dibawah`
}
