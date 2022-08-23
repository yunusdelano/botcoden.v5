const axios = require("axios");
const cheerio = require("cheerio")

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

exports.TiktokStalk = async(user) => {
    return new Promise(async(resolve, reject) => {
        const getplink = await axios.get(`https://urlebird.com/search/?q=${user}`)
        const plink = cheerio.load(getplink.data)('body > div.main').find('div.info.text-truncate > a').attr('href')
        if(!plink) return resolve({status: false, message: 'User not found!'})
        const vidlink = await axios.get(plink)
        const $ = cheerio.load(vidlink.data)
        const array = []
        $('#thumbs > div > a').each(function(){
            array.push($(this).attr('href'))
        })
        const { data } = await axios.get(await pickRandom(array))
        const $$ = cheerio.load(data)
        const soundl = $$('body').find('div.music > a').attr('href')
        if(soundl) sound = await axios.get(soundl)
        else sound = false
        const $$$ = cheerio.load(sound.data)
        resolve({
            status: true,
            author: 'this.padly',
            user: {
                username: $('body').find('div.col-md-auto.text-center.text-md-left.pl-0 > h1').text(),
                fullname: $('body').find('div.col-md-auto.text-center.text-md-left.pl-0 > div > h5').text(),
                bio: $('body > div.main').find('div.col-md-auto.text-center.text-md-left.pl-0 > div > p').text(),
                follower: $('body > div.main').find('div.col-7.col-md-auto.text-truncate').text().split('🦄 ')[1],
                profilepic: $('body > div.main').find('div.col-md-auto.justify-content-center.text-center > img').attr('src')
            }
        })
    })
}