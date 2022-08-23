const fetch = require("isomorphic-unfetch")
const spotify = require("spotify-url-info")(fetch)
const fs = require("fs")
const setting = JSON.parse(fs.readFileSync('./config.json'))

const pickRandom = (arr) => {
     return arr[Math.floor(Math.random() * arr.length)]
}
const all_url = setting.playlist

exports.tebaklagu = async() => {
    return new Promise(async(resolve, reject) => {
       const playlist_url = pickRandom(all_url)
       const data = await spotify.getData(playlist_url)
       const random = pickRandom(data.tracks.items)
       var hasil = {
         status: 200,
         creator: 'this.padly',
         result: {
           title: random.track.name,
           artis: random.track.album.artists[0].name,
           preview: random.track.preview_url,
           music_url: random.track.external_urls.spotify,
           thumbnail: random.track.album.images[0].url
         }
       }
       resolve(hasil)
    }).catch((err) => {
       reject(err)
       return { status: 403, msg: "Server Error!" }
    })
}