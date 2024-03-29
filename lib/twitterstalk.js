const axios = require('axios');
const cheerio = require('cheerio');

async function twitterstalk(user) {
  let res = await axios.get(`https://www.twuko.com/${user}/`)
  let $ = cheerio.load(res.data), obj = {}
  obj.pp_user = $('div[class="relative w-full h-full rounded-full cursor-pointer profile-image"] > img').attr('src')
  obj.name = $('div[class="p-3"] > p[class="text-center text-primary"]').text().trim()
  obj.username = $('div[class="p-3"] > div > span[class="font-bold text-center"]').text().trim()
  obj.followers = $('div[class="mb-4 text-4xl font-bold text-center"]').text()
  $('div[class="flex justify-center"] > div[class="px-4"]').each((idx, el) => {
    let text = $(el).find('div[class="text-xs font-bold text-center text-gray-600 uppercase"]').text()
    obj[text.toLowerCase()] = $(el).find('div[class="text-xl font-bold text-center"]').text()
  })
  obj.description = $('div[class="p-3 border-t border-gray-200"] > p').text().trim().replace(/\n/g, '')
  return obj 
}

module.exports = twitterstalk