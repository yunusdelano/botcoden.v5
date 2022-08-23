const { default: axios } = require("axios");
const Util = require("util");
const cheerio = require("cheerio");
const encodeUrl = require('encodeurl')
const qs = require("qs")
const fetch = require("node-fetch");
const FormData = require("form-data");
const gis = require("g-i-s")
const ytdl = require('ytdl-core');

const yts = require('yt-search');

const { UserAgent } = require('./myfunc')
const author = 'this.padly'

// Thanks To
// Irfan Hariyanto ( Rtwone )
// Xfarr
// Fajar Ihsana
// This.Vynn

/* ALLERT ! DON'T CLAIM THIS SCRAPE*/
const isUrl = (url) => {
        return url.match(
          new RegExp(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
            "gi"
          )
        );
      };

      
const randomobj = async(array) => {
	return array[Math.floor(Math.random() * array.length)];
}

async function request(url, config) {
    return axios(url, config);
}

const clean = (data) => {
  let regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br?\s?\/>)/gi, " \n");
  return data.replace(regex, "");
};

async function shortener(url) {
  return url;
}

function bytesToSize(bytes) {

    return new Promise((resolve, reject) => {

        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        if (bytes === 0) return 'n/a';

        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);

        if (i === 0) resolve(`${bytes} ${sizes[i]}`);

        resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);

    });

  };

  
// Instagram Downloader
exports.instagram = async (url) => {
try {
    const tokenn = await axios.get("https://www.instagramsave.com/");
    let a = cheerio.load(tokenn.data);
    let token = a("#token").attr("value");
    const param = {
        url: "https://www.instagram.com" + new URL(url).pathname,
        action: "post",
        token: token,
    };
    const { data } = await axios.request("https://www.instagramsave.com/system/action.php", {
            method: "post",
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                "cookie": tokenn.headers["set-cookie"][0].split(';')[0],
            },
        }
    );
    return {
        status: 200,
        author: author,
        ...data,
    };
} catch (e) {
    return e
}
};

// Youtube Downloader
exports.youtube = async(url, type) => {
  return new Promise((resolve, reject) => {
    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:|watch\?.*(?:|\&)v=|embed\/|v\/|shorts\/)|youtu\.be\/)([-_0-9A-Za-z]{11}|[-_0-9A-Za-z]{10})/;
    if (ytIdRegex.test(url)) {
    const iconfig = {
        q: ytIdRegex.exec(url), 
        vt: "home",
    }
    axios.request("https://yt1s.com/api/ajaxSearch/index",{
        method: "post",
        data: new URLSearchParams(Object.entries(iconfig)),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
        }}).then(async(gdata) => {
        const cconfig = {
            vid: gdata.data.vid,
            k: type === "mp3" ? gdata.data.links.mp3["mp3128"]["k"] : gdata.data.links.mp4["135"]["k"],
        }
        const { data } = await axios.request("https://yt1s.com/api/ajaxConvert/convert",{
            method: "post",
            data: new URLSearchParams(Object.entries(cconfig)),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                "Cookie": "__atuvc=2|26; __atssc=google;2",
            }})
        const result = {
            status: 200,
            author: author,
            username: gdata.data.a,
            id: data.vid,
            ftype: type === "mp3" ? "mp3" : "mp4",
            fquality: type === "mp3" ? gdata.data.links.mp3.mp3128.q : gdata.data.links.mp4["135"].q,
            size: type === "mp3" ? gdata.data.links.mp3["mp3128"].size : gdata.data.links.mp4["135"].size,
            thumbnail: `https://i.ytimg.com/vi/${data.vid}/0.jpg`,
            download_url: data.dlink,
        };
        resolve(result)
    }).catch("Error")
    } else resolve("Invalid url")
})
}


// Facebook Downloader
exports.fbdl = async(url) => {
    let token, result, agent = UserAgent();
    try {
      // get token
      token = await request("https://downvideo.net", {
        method: "GET",
        headers: {
          accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
          "accept-language": `id,en-US;q=0.9,en;q=0.8,es;q=0.7,ms;q=0.6`,
          "sec-fetch-user": `?1`,
          "User-Agent": agent,
        },
      });
      const $token = cheerio.load(token.data);
      token = $token('input[name="token"]').attr("value") ?? null;
      // post data
      result = await request("https://downvideo.net/download.php", {
        data: new URLSearchParams(Object.entries({ URL: url, token })),
        method: "POST",
        headers: {
          accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
          "accept-language": `id,en-US;q=0.9,en;q=0.8,es;q=0.7,ms;q=0.6`,
          "sec-fetch-user": `?1`,
          "content-type": `application/x-www-form-urlencoded`,
          "User-Agent": agent,
        },
       });
       const $rootDl = cheerio.load(result.data);
       result = []
       $rootDl('div[class="col-md-10"]')
       .find("a")
       .each((a, b) => {
         let dl = $rootDl(b).attr("href");
         let rex = /(?:https:?\/{2})?(?:[a-zA-Z0-9])\.xx\.fbcdn\.net/;
         if (rex.test(dl)) {
           result.push(dl);
         }
       });
     } catch (e) {
       throw e.message;
     } finally {
       return result;
     }
}

// MediaFire Downloader
exports.mediafire = async(url) => {
   const res = await axios.get(url) 
   const $ = cheerio.load(res.data)
   const link = $('a#downloadButton').attr('href')
   const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
   const seplit = link.split('/')
   const nama = seplit[5]
   mime = nama.split('.')
   mime = mime[1]
   return { nama, mime, size, link }
}

// Search Lirik
exports.Musikmatch = (querry) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.musixmatch.com/search/${querry}`, {
                method: "GET",
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-US,en;q=0.9,id;q=0.8",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
                }
            }).then( has => {
                const $ = cheerio.load(has.data);
                const Url = $('#search-all-results > div.main-panel > div').find('div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a').attr('href');
                axios.get(`https://www.musixmatch.com${Url}`, {
                    method: "GET",
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "accept-language": "en-US,en;q=0.9,id;q=0.8",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
                    }
                }).then( res => {
                    const $ = cheerio.load(res.data);
                    const judul = $('#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div').find('div.col-sm-10.col-md-8.col-ml-9.col-lg-9.static-position > div.track-title-header > div.mxm-track-title > h1').text().trim();
                    const artis = $('#site > div > div > div > main > div > div > div > div > div > div > div> div > div > h2 > span').text().trim();
                    const thumb = $('#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div').find('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div > img').attr('src');
                    const lirik = [];
                    $('#site > div > div > div > main > div > div > div.mxm-track-lyrics-container').find('div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function (a, b) {
                        const isi = $(b).find('span').text().trim();
                        lirik.push(isi);
                    });
                    const result = {
                        status: res.status,
                        author: author,
                        result: {
                            judul: judul.replace('Lyrics', ''),
                            penyanyi: artis,
                            thumb: "https:" + thumb,
                            lirik: lirik[0]
                        }
                    };
                    resolve(result);
                });
            }).catch(reject);
        });
}

// Free Fire Stalk
exports.stalkff = async(id) => {
   return new Promise(async (resolve, reject) => {
      axios
        .post(
          'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
          new URLSearchParams(
            Object.entries({
              productId: '3',
              itemId: '353',
              catalogId: '376',
              paymentId: '2037',
              gameId: id,
              product_ref: 'REG',
              product_ref_denom: 'AE',
            })
          ),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Referer: 'https://www.duniagames.co.id/',
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          resolve({
            status: 200,
            id: id,
            nickname: response.data.data.gameDetail.userName
          })
        })
        .catch((err) => {
          resolve({
            status: 404,
            msg: 'User Id Not Found'
          })
        })
    })
}

// Mobile Legends Stalk
exports.stalkml = async(id, zoneId) => {
    return new Promise(async (resolve, reject) => {
      axios
        .post(
          'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
          new URLSearchParams(
            Object.entries({
              productId: '1',
              itemId: '2',
              catalogId: '57',
              paymentId: '352',
              gameId: id,
              zoneId: zoneId,
              product_ref: 'REG',
              product_ref_denom: 'AE',
            })
          ),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Referer: 'https://www.duniagames.co.id/',
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          resolve({
            status: 200,
            id: id,
            zoneId: zoneId,
            nickname: response.data.data.gameDetail.userName
          })
        })
        .catch((err) => {
          resolve({
            status: 404,
            msg: 'User Id or ZoneId Not Found'
          })
        })
    })
}

// Twitter Downloader
exports.twitter = async(link) => {
	return new Promise((resolve, reject) => {
		let config = {
			'URL': link
		}
		axios.post('https://twdown.net/download.php',qs.stringify(config),{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
			}
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
		resolve({
				desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
				thumb: $('div:nth-child(1) > img').attr('src'),
				HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
				SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
				audio: 'https://twdown.net/' + $('tr:nth-child(4) > td:nth-child(4) > a').attr('href')
			})
		})
	.catch(reject)
	})
}

// Wikipedia Search
exports.wikiSearch = async(query) => {
const res = await axios.get(`https://id.m.wikipedia.org/w/index.php?search=${query}`)
const $ = cheerio.load(res.data)
const hasil = []
let wiki = $('#mf-section-0').find('p').text()
let thumb = $('#mf-section-0').find('div > div > a > img').attr('src')
thumb = thumb ? thumb : '//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png'
thumb = 'https:' + thumb
let judul = $('h1#section_0').text()
hasil.push({ wiki, thumb, judul })
return hasil
}

// Text Pro Maker
async function post(url, formdata = {}, cookies) {
  let encode = encodeURIComponent;
  let body = Object.keys(formdata)
    .map((key) => {
      let vals = formdata[key];
      let isArray = Array.isArray(vals);
      let keys = encode(key + (isArray ? "[]" : ""));
      if (!isArray) vals = [vals];
      let out = [];
      for (let valq of vals) out.push(keys + "=" + encode(valq));
      return out.join("&");
    })
    .join("&");
  return await fetch(`${url}?${body}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: cookies,
    },
  });
}

/**
 * TextPro Scraper
 * @function
 * @param {String} url - Your phootoxy url, example https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html.
 * @param {String[]} text - Text (required). example ["text", "text 2 if any"]
 */

exports.TextPro = async(url, text) => {
  if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url))
    throw new Error("Url Invalid");
  const geturl = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "GoogleBot",
    },
  });
  const caritoken = await geturl.text();
  let hasilcookie = geturl.headers
    .get("set-cookie")
    .split(",")
    .map((v) => cookie.parse(v))
    .reduce((a, c) => {
      return { ...a, ...c };
    }, {});
  hasilcookie = {
    __cfduid: hasilcookie.__cfduid,
    PHPSESSID: hasilcookie.PHPSESSID,
  };
  hasilcookie = Object.entries(hasilcookie)
    .map(([name, value]) => cookie.serialize(name, value))
    .join("; ");
  const $ = cheerio.load(caritoken);
  const token = $('input[name="token"]').attr("value");
  let _resUlt = new FormData();
  if (typeof text === "string") text = [text];
  for (let texts of text) _resUlt.append("text[]", texts);
  _resUlt.append("submit", "Go");
  _resUlt.append("token", token);
  _resUlt.append("build_server", "https://textpro.me");
  _resUlt.append("build_server_id", 1);
  const geturl2 = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: hasilcookie,
      ..._resUlt.getHeaders(),
    },
    body: _resUlt.getBuffer(),
  });
  const caritoken2 = await geturl2.text();
  const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(caritoken2);
  if (!token2) throw new Error("Token no encontrado!");
  const prosesimage = await post(
    "https://textpro.me/effect/create-image",
    JSON.parse(token2[1]),
    hasilcookie
  );
  const hasil = await prosesimage.json();
  return `https://textpro.me${hasil.fullsize_image}`;
}

// Tiktok Downloader V1
exports.Tiktok = async(query) => {
  let response = await axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries({ query })),
  });

  result = {};

  result.creator = author;
  result.title = clean(response.data.desc);
  result.author = clean(response.data.author);
  result.nowm = await shortener(
    (response.data.links[0].a || "").replace("https", "http")
  );
  result.watermark = await shortener(
    (response.data.links[1].a || "").replace("https", "http")
  );
  result.audio = await shortener(
    (response.data.links[2].a || "").replace("https", "http")
  );
  result.thumbnail = await shortener(response.data.cover);
  return result;
}

// Telesticker Add Via Url
exports.telesticker = async(url) => {
   url = url.replace('https://t.me/addstickers/', '')
   var data1 = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(url)}`)
   const result = []
   for (let i of data1.data.result.stickers) {
       var data2 = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${i.thumb.file_id}`)
       var link = data2.data.result.file_path
       var has = `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${link}`
       result.push({ status: data2.status, url: has })
   }
  return result
}

// Group Wa Search
exports.grupwa = async(nama) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=" +
          nama +
          "&searchby=name"
      )
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = [];
        const lnk = [];
        const nm = [];
        $("div.wa-chat-title-container").each(function (a, b) {
          const limk = $(b).find("a").attr("href");
          lnk.push(limk);
        });
        $("div.wa-chat-title-text").each(function (c, d) {
          const name = $(d).text();
          nm.push(name);
        });
        for (let i = 0; i < lnk.length; i++) {
          result.push({
            nama: nm[i].split(". ")[1],
            link: lnk[i].split("?")[0],
          });
        }
        resolve({ status: 200, creator: author, result });
      })
      .catch(reject);
  });
}

// Pinterest Search
exports.pinterest = async(query) => {
return new Promise((resolve, reject) => {
	  let err = { status: 404, message: "Terjadi kesalahan" }
	  gis({ searchTerm: query + ' site:id.pinterest.com', }, (er, res) => {
	   if (er) return err
	   let hasil = {
		  status: 200,
		  creator: author,
		  result: []
	   }
	   res.forEach(x => hasil.result.push(x.url))
	   resolve(hasil)
	  })
	})
}

// Google Lensa
exports.goLens = async(url) => {
 return new Promise((resolve, reject) => {
   const options = {
     method: 'GET',
     url: 'https://google-reverse-image-search.p.rapidapi.com/imgSearch',
     params: { url },
     headers: {
      'X-RapidAPI-Host': 'google-reverse-image-search.p.rapidapi.com',
      'X-RapidAPI-Key': '53513471femsh11b7c46a7da0a85p119682jsncc66a4e30134'
     }
   };

   axios.request(options).then(function (response) {
      var result = {
         status: response.status,
         imgUrl: response.data.imgUrl,
         url: response.data.googleSearchResult
      }
      resolve(result)
   }).catch(function (error) {
      console.error(error);
      var tek = {
         status: 404,
         msg: 'Server Error!'
      }
      resolve(tek)
   });
 })
}

// YouTube Downloader V2
exports.youtubeV2 = async(type, url, quality) => {
    quality = quality ? quality : "360p";
    const {
        data
    } = await axios.request("https://yt1s.com/api/ajaxSearch/index", {
        method: "post",
        data: new URLSearchParams(
            Object.entries({
                q: url,
                vt: "home",
            })
        ),
        headers: {
            cookie: "_ga=GA1.2.1497648114.1652002131; _gat_gtag_UA_173445049_1=1; _gid=GA1.2.969868327.1652002131; __atuvc=1|19; __atuvs=62778d5c4fade304000; prefetchAd_3897490=true",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
        },
    });
    if (data.mess.includes("Invalid"))
        return {
            creator: "@ihsanafajar",
            ...data,
            status: false,
        };
    const getk =
        type == "mp3" ?
        Object.values(data.links.mp3)[0] :
        Object.values(data.links.mp4).find((mp) => mp.q == quality);
    if (getk == null)
        return {
            status: false,
            message: `${quality} not available`,
        };
    const getlink = await axios.request(
        "https://yt1s.com/api/ajaxConvert/convert", {
            method: "post",
            data: new URLSearchParams(
                Object.entries({
                    vid: data.vid,
                    k: getk.k,
                })
            ),
        }
    );
    return {
        creator: "@ihsanafajar",
        ...getlink.data,
        size: getk.size,
        status: true,
        thumbnail: `https://i.ytimg.com/vi/${data.vid}/0.jpg`,
    };
}

// Youtube Downloader v3
exports.youtubeV3 = async(url,type) => {
  return new Promise((resolve, reject) => {
    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:|watch\?.*(?:|\&)v=|embed\/|v\/|shorts\/)|youtu\.be\/)([-_0-9A-Za-z]{11}|[-_0-9A-Za-z]{10})/;
    if (ytIdRegex.test(url)) {
    const iconfig = {
        q: ytIdRegex.exec(url), 
        vt: "home",
    }
    axios.request("https://yt1s.com/api/ajaxSearch/index",{
        method: "post",
        data: new URLSearchParams(Object.entries(iconfig)),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
        }}).then(async(gdata) => {
        const cconfig = {
            vid: gdata.data.vid,
            k: type === "mp3" ? gdata.data.links.mp3["mp3128"]["k"] : gdata.data.links.mp4["135"]["k"],
        }
        const { data } = await axios.request("https://yt1s.com/api/ajaxConvert/convert",{
            method: "post",
            data: new URLSearchParams(Object.entries(cconfig)),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                "Cookie": "__atuvc=2|26; __atssc=google;2",
            }})
        const result = {
            status: 200,
            author: author,
            title: data.title,
            username: gdata.data.a,
            id: data.vid,
            ftype: type === "mp3" ? "mp3" : "mp4",
            fquality: type === "mp3" ? gdata.data.links.mp3.mp3128.q : gdata.data.links.mp4["135"].q,
            size: type === "mp3" ? gdata.data.links.mp3["mp3128"].size : gdata.data.links.mp4["135"].size,
            thumbnail: `https://i.ytimg.com/vi/${data.vid}/0.jpg`,
            download_url: data.dlink,
        };
        resolve(result)
    }).catch("Error")
    } else resolve("Invalid url")
})
}

// Downloader All
exports.downloaderall = async(url) => {
    const gettoken = await axios.get('https://downvideo.quora-wiki.com/')
    const $$ = cheerio.load(gettoken.data)
    const token = $$('#token').attr('value')
    const {data} = await axios.request('https://downvideo.quora-wiki.com/system/action.php', {
        method: 'post',
        data: new URLSearchParams(Object.entries({
            url: url,
            token: token
        })),
        headers: {
            'cookie': 'fpestid=YT6abn7OdTpNYkeS7164xlFIg6RZEhfPvEtZnVWfk0kDip1a8iTAnO51q7VzTGLl89oycQ; __gads=ID=823e2024511cfbf1-221294301ad30014:T=1651936582:RT=1651936582:S=ALNI_Mb2xUbOd3tTkcYykDeYbYsj3ejTKQ; PHPSESSID=446tiepgldu14thd36q7ekpi22',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36'
        }
    })
    return(data.medias == '' ? {status: false, ...data} : {status: true, ...data})
}

// Kiryuu Search
exports.kiryuu = async(query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://kiryuu.id/?s=${query}`) 
            .then(({
                data
            }) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#content > div.wrapper > div.postbody > div > div.listupd > div ').each(function (a, b) {
                        result = {
                            status: 200,
                            author: '@ihsanafajar',
                            judul: $(b).find('> div > a').attr('title'),
                            manga_status: $(b).find('> div > a > div.limit > span.status.Completed').text() ? $(b).find('> div > a > div.limit > span.status.Completed').text() : 'Not Complete',
                            last_chapter: $(b).find('> div > a > div.bigor > div.adds > div.epxs').text(),
                            ranting: $(b).find('> div > a > div.bigor > div.adds > div.rt > div > div.numscore').text(),
                            thumbnail: $(b).find('> div > a > div.limit > img').attr('src'),
                            link: $(b).find('> div > a').attr('href')
                        };
                        hasil.push(result);
                    });
                resolve(hasil)
            })
            .catch(reject)
    })
}

// Coco Fun Downloader
exports.cocofun = (url) => {
  return new Promise((resolve, reject) => {
    axios({url, method: "get",
      headers: {
        "Cookie": "client_id=1a5afdcd-5574-4cfd-b43b-b30ad14c230e",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
      }
    }).then(data => {
      $ = cheerio.load(data.data)
      let json
      const res = $('script#appState').get()
      for(let i of res){
        if(i.children && i.children[0] && i.children[0].data){
          ress = i.children[0].data.split('window.APP_INITIAL_STATE=')[1]
          json = JSON.parse(ress)
        }
        const result = {
          status: 200,
          author: author,
          topic: json.share.post.post.content ? json.share.post.post.content : json.share.post.post.topic.topic,
          caption: $("meta[property='og:description']").attr('content'),
          play: json.share.post.post.playCount,
          like: json.share.post.post.likes,
          share: json.share.post.post.share,
          duration: json.share.post.post.videos[json.share.post.post.imgs[0].id].dur,
          thumbnail: json.share.post.post.videos[json.share.post.post.imgs[0].id].coverUrls[0],
          watermark: json.share.post.post.videos[json.share.post.post.imgs[0].id].urlwm,
          no_watermark: json.share.post.post.videos[json.share.post.post.imgs[0].id].url
        }
        resolve(result)
      }
    }).catch(reject)
  })
}

/**
 * Like Downloader Scraper From https://likeedownloader.com/
 * @function
 * @param {String} url - Your Like url, example https://l.likee.video/v/MmMNz4
 *
 */
exports.like = async (url) => {
    return new Promise(async (resolve, reject) => {
        const { data } = await axios.request("https://likeedownloader.com/results", {
            method: "post",
            data: new URLSearchParams(Object.entries({id: url})),
            headers: {
                "cookie": "_ga=GA1.2.553951407.1656223884; _gid=GA1.2.1157362698.1656223884; __gads=ID=0fc4d44a6b01b1bc-22880a0efed2008c:T=1656223884:RT=1656223884:S=ALNI_MYp2ZXD2vQmWnXc2WprkU_p6ynfug; __gpi=UID=0000069517bf965e:T=1656223884:RT=1656223884:S=ALNI_Map47wQbMbbf7TaZLm3TvZ1eI3hZw; PHPSESSID=e3oenugljjabut9egf1gsji7re; _gat_UA-3524196-10=1",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
            },
        });
        const $ = cheerio.load(data)
        result = {
            status: 200,
            author: author,
            title: $('body > div.page-wrapper > div.container > div > div.quote-box > p.quote-text > span').text(),
            thumbnail: $('body > div.page-wrapper > div.container > div > div.quote-box > div > img').attr('src'),
            watermark: $('body > div.page-wrapper > div.container > table > tbody > tr:nth-child(1) > td:nth-child(2) > a').attr('href'),
            no_watermark: $('body > div.page-wrapper > div.container > table > tbody > tr:nth-child(2) > td:nth-child(2) > a').attr('href')
        }
        resolve(result)
    });
};

/**
 * Telesticker Downloader Scraper From https://api.telegram.org/
 * @function
 * @param {String} url - Your Telesticker url, example https://t.me/addstickers/c1129234339_by_HarukaAyaBot
 *
 */
exports.telesticker = async (url) => {
    return new Promise(async (resolve, reject) => {
        if (!url.match(/(https:\/\/t.me\/addstickers\/)/gi)) throw 'Enther your url telegram sticker'
        packName = url.replace("https://t.me/addstickers/", "")
        data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, {method: "GET",headers: {"User-Agent": "GoogleBot"}})
        const hasil = []
        for (let i = 0; i < data.data.result.stickers.length; i++) {
            fileId = data.data.result.stickers[i].thumb.file_id
            data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            result = {
            status: 200,
            author: author,
            url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            hasil.push(result)
        }
    resolve(hasil)
    })
}


/**
 * Tiktok Downloader Scraper From https://downvideo.quora-wiki.com
 * @function
 * @param {String} url - Your Tiktok url, example https://vt.tiktok.com/ZSdoxX6FE/?k=1
 *
 */
exports.tiktokV4 = async (url) => {
    try {
        const tokenn = await axios.get("https://downvideo.quora-wiki.com/tiktok-video-downloader#url=" + url);
        let a = cheerio.load(tokenn.data);
        let token = a("#token").attr("value");
        const param = {
            url: url,
            token: token,
        };
        const { data } = await axios.request("https://downvideo.quora-wiki.com/system/action.php", {
                method: "post",
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
                },
            }
        );
        return {
            status: 200,
            author: author,
            title: data.title,
            thumbnail: "https:" + data.thumbnail,
            duration: data.duration,
            media: data.medias,
        };
    } catch (e) {
        return e
    }
}

/**
 * Instagram Downloader Scraper From https://downvideo.quora-wiki.com
 * @function
 * @param {String} url - Your Instagram url, example https://www.instagram.com/p/CfYiWX_NjsS/?igshid=YmMyMTA2M2Y=
 *
 */
exports.igdlV1 = async (url) => {
    try {
        const tokenn = await axios.get("https://downvideo.quora-wiki.com/instagram-video-downloader#url=" + url);
        let a = cheerio.load(tokenn.data);
        let token = a("#token").attr("value");
        const param = {
            url: url,
            token: token,
        };
        const { data } = await axios.request("https://downvideo.quora-wiki.com/system/action.php", {
                method: "post",
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
                },
            }
        );
        return {
            status: 200,
            author: author,
            title: data.title,
            thumbnail: "https:" + data.thumbnail,
            duration: data.duration,
            media: data.medias,
        };
    } catch (e) {
        return e
    }
}

/**
 * Imgur Downloader Scraper From https://www.expertsphp.com
 * @function
 * @param {String} url - Your Imgur url, example https://imgur.com/gallery/WGiOMgp
 *
 */
exports.imgur = async (url) => {
    return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `https://www.expertsphp.com/instagram-reels-downloader.php`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "cookie": "_ga_D1XX1R246W=GS1.1.1656127044.1.0.1656127044.0; __gads=ID=a826d8f71f32cdce-228526c6c4d30038:T=1656127044:RT=1656127044:S=ALNI_Mbc0q65XMPrQjf8pqxKtg_DfBEnNw; __gpi=UID=0000068f7e0217a6:T=1656127044:RT=1656127044:S=ALNI_MYDy-jLWlGuI8I9ZeSAgcTfDaJohQ; _ga=GA1.2.136312705.1656127045; _gid=GA1.2.728659727.1656127045; _gat_gtag_UA_120752274_1=1"
                },
                formData: {
                    url: url
                }
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                const $ = cheerio.load(body)
                const result = {
                    status: 200,
                    author: author,
                    video_link: $('#showdata > center > div:nth-child(5) > a').attr('href'),
                    image_link: $('#showdata > center > img').attr('src')
                }
                resolve(result);
            })
        })
}

/**
 * Imdb Downloader Scraper From https://freedownloadvideo.net
 * @function
 * @param {String} url - Your Imdb url, example https://www.imdb.com/video/vi146981657?listId=ls053181649
 *
 */
exports.imdb = async (url) => {
    return new Promise((resolve, reject) => {
        axios.get('https://freedownloadvideo.net/imdb-video-downloader').then((data) => {
            let a = cheerio.load(data.data)
            let token = a('#token').attr('value')
            const options = {
                method: 'POST',
                url: `https://freedownloadvideo.net/wp-json/aio-dl/video-data/`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded;",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "cookie": "PHPSESSID=jue6d59cnfgu8pmraa971cetm6; _gid=GA1.2.1096581014.1656129824; __gads=ID=855f6257a3b17608-227b1200fed200a7:T=1656129824:RT=1656129824:S=ALNI_MYlQs2q77JAmj399O3YnmMSElqAIA; __gpi=UID=0000068f8a6124cf:T=1656129824:RT=1656129824:S=ALNI_MZhz1dM3pQuLjvXkFxtGqNtiIo4yw; _ga_KN64Y44T94=GS1.1.1656129823.1.1.1656130205.0; _ga=GA1.2.1859454192.1656129824"
                },
                formData: {url: url,token: token}
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                res = JSON.parse(body)
                result = {
                    status: 200,
                    author: author,
                    ...res,
                }
                resolve(result);
            })
        }).catch(reject)
    })
}

/**
 * Soundcloud Downloader Scraper From https://soundcloudmp3.org/id
 * @function
 * @param {String} url - Your Soundcloud url, example https://soundcloud.com/mlicasiano09/talking-to-the-moon-bruno-mars?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
 *
 */
exports.soundcloud = async (url) => {
    return new Promise((resolve, reject) => {
        axios.get('https://soundcloudmp3.org/id').then((data) => {
            let a = cheerio.load(data.data)
            let token = a('form#conversionForm > input[type=hidden]').attr('value')
            const options = {
                method: 'POST',
                url: `https://soundcloudmp3.org/converter`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded;",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "Cookie": data["headers"]["set-cookie"],
                },
                formData: {
                    _token: token,
                    url: url
                }
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                $get = cheerio.load(body)
                const result = {
                    status: 200,
                    author: author,
                    title: $get('#preview > div:nth-child(3) > p:nth-child(2)').text().replace('Title:',''),
                    duration: $get('#preview > div:nth-child(3) > p:nth-child(3)').text().replace(/Length\:|Minutes/g,''),
                    quality: $get('#preview > div:nth-child(3) > p:nth-child(4)').text().replace('Quality:',''),
                    thumbnail: $get('#preview > div:nth-child(3) > img').attr('src'),
                    download: $get('#download-btn').attr('href')
                }
                resolve(result)
            });
        })
    })
}


/**

 * Ssweb Scraper from https://www.screenshotmachine.com

 * @function

 * @param {String} url - example https://github.com/xfar05

 * @param {String} device - example desktop or tablet & phone

 *

 */

exports.ssweb = (url, device = 'desktop') => {

     return new Promise((resolve, reject) => {

          const base = 'https://www.screenshotmachine.com'

          const param = {

            url: url,

            device: device,

            cacheLimit: 0

          }

          axios({url: base + '/capture.php',

               method: 'POST',

               data: new URLSearchParams(Object.entries(param)),

               headers: {

                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'

               }

          }).then((data) => {

               const cookies = data.headers['set-cookie']

               if (data.data.status == 'success') {

                    axios.get(base + '/' + data.data.link, {

                         headers: {

                              'cookie': cookies.join('')

                         },

                         responseType: 'arraybuffer'

                    }).then(({ data }) => {

                        result = {

                            status: 200,

                            author: author,

                            result: data

                        }

                         resolve(result)

                    })

               } else {

                    reject({ status: 404, author: author, message: data.data })

               }

          }).catch(reject)

     })

}


/**

 * Ttp Maker Scraper From https://www.picturetopeople.org/

 * @function

 * @param {String} text - example xfar

 *

 */

exports.ttp = async (text) => {

    return new Promise((resolve, reject) => {

            const options = {

                method: 'POST',

                url: `https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect`,

                headers: {

                    "Content-Type": "application/x-www-form-urlencoded",

                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",

                    "Cookie": "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1"

                },

                formData: {

                    'TextToRender': text,

                    'FontSize': '100',

                    'Margin': '30',

                    'LayoutStyle': '0',

                    'TextRotation': '0',

                    'TextColor': 'ffffff',

                    'TextTransparency': '0',

                    'OutlineThickness': '3',

                    'OutlineColor': '000000',

                    'FontName': 'Lekton',

                    'ResultType': 'view'

                }

            };

            request(options, async function(error, response, body) {

                if (error) throw new Error(error)

                const $ = cheerio.load(body)

                const result = 'https://www.picturetopeople.org' + $('#idResultFile').attr('value')

                resolve({ status: 200, author: author, result: result })

            });

        })

}



/**

 * Attp Maker Scraper From https://id.bloggif.com/text

 * @function

 * @param {String} text - example XFar

 *

 */

exports.attp = async(text) => {

  return new Promise(async(resolve, reject) => {

  const getid = await axios.get('https://id.bloggif.com/text')

  const id = cheerio.load(getid.data)('#content > form').attr('action')

  const options = {

            method: "POST",

            url: `https://id.bloggif.com${id}`,

            headers: {

                "content-type": 'application/x-www-form-urlencoded',

                "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'

            },

            formData: {

                target: 1,

                text: text,

                glitter_id: Math.floor(Math.random() * 2821),

                font_id: 'lucida_sans_demibold_roman',

                size: 50,

                bg_color: 'FFFFFF',

                transparent: 1,

                border_color: '000000',

                border_width: 2,

                shade_color: '000000',

                shade_width: 1,

                angle: 0,

                text_align: 'center'

            },

        };

        request(options, async function(error, response, body) {

          if (error) return new Error(error)

          const $ = cheerio.load(body)

          const url = $('#content > div:nth-child(10) > a').attr('href')

          resolve({status: 200, author: author, result: 'https://id.bloggif.com' + url})

        })

    })

}



/**

 * Photooxy Text Maker Scraper From https://photooxy.com

 * @function

 * @param {String} url - example https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html

 * @param {String} text - example XFar

 *

 */

exports.photooxy = async(url,text) => {

  return new Promise(async(resolve,reject) => {

    if (!/^https:\/\/photooxy\.com\/.+\.html$/.test(url)) throw new Error("Url Salah!")

        axios({url: url,

            method: 'get',

            headers: {

                'cookie': '_gid=GA1.2.1885119409.1656864706; __gads=ID=dc094aa760fdfc92-22b4a69967d30082:T=1656864706:RT=1656864706:S=ALNI_MapJhFNdgQujQ-avWct-u3snYXntQ; __gpi=UID=000006c0c6809d99:T=1656864706:RT=1656864706:S=ALNI_MbNlply1Ric98nkJqC81m4LussWaw; PHPSESSID=qasusfb11958k62t0cv3u0pim2; _gat_gtag_UA_114571019_11=1; _ga_SK0KDDQM5P=GS1.1.1656864706.1.1.1656867224.0; _ga=GA1.1.359514262.1656864706',

                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'

            }

        }).then(da => {

            const $ = cheerio.load(da.data)

            const form = new FormData()

            form.append('text[]',text)

            form.append('submit','GO')

            form.append('token',$('#token').val())

            form.append('build_server',$('#build_server').val())

            form.append('build_server_id',$('#build_server_id').val())

            axios({url: url,

                method: 'POST',

                data: form,

                headers: {

                    'cookie': '_gid=GA1.2.1885119409.1656864706; __gads=ID=dc094aa760fdfc92-22b4a69967d30082:T=1656864706:RT=1656864706:S=ALNI_MapJhFNdgQujQ-avWct-u3snYXntQ; __gpi=UID=000006c0c6809d99:T=1656864706:RT=1656864706:S=ALNI_MbNlply1Ric98nkJqC81m4LussWaw; PHPSESSID=qasusfb11958k62t0cv3u0pim2; _gat_gtag_UA_114571019_11=1; _ga_SK0KDDQM5P=GS1.1.1656864706.1.1.1656867224.0; _ga=GA1.1.359514262.1656864706',

                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'

                }

    }).then(da =>{

    const $ = cheerio.load(da.data)

    const p = JSON.parse($('#form_value').text().replace(/\[/g,'').replace(/\]/g,'').replace(/text/g,'text[]'))

    axios({url: 'https://photooxy.com/effect/create-image',

        method: 'POST',

        data: new URLSearchParams(p),

        headers: {

            'cookie': '_gid=GA1.2.1885119409.1656864706; __gads=ID=dc094aa760fdfc92-22b4a69967d30082:T=1656864706:RT=1656864706:S=ALNI_MapJhFNdgQujQ-avWct-u3snYXntQ; __gpi=UID=000006c0c6809d99:T=1656864706:RT=1656864706:S=ALNI_MbNlply1Ric98nkJqC81m4LussWaw; PHPSESSID=qasusfb11958k62t0cv3u0pim2; _gat_gtag_UA_114571019_11=1; _ga_SK0KDDQM5P=GS1.1.1656864706.1.1.1656867224.0; _ga=GA1.1.359514262.1656864706',

            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'

        }

    }).then(a => {

        const result = {

            status: 200,

            author: author,

            result: 'https://e2.yotools.net' + a.data.image

        }

        resolve(result)

    }).catch(reject)

  }).catch(reject)

})

})

}


/**

 * Ephoto  Maker Scraper From https://en.ephoto360.com/

 * @function

 * @param {String} url - example https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html

 * @param {String} text - example XFar

 *

 */

exports.ephoto = async(url,text) => {

  return new Promise(async(resolve,reject) => {

        axios({url: url,

            method: 'get',

            headers: {

                'cookie': '_gid=GA1.2.1885119409.1656864706; __gads=ID=dc094aa760fdfc92-22b4a69967d30082:T=1656864706:RT=1656864706:S=ALNI_MapJhFNdgQujQ-avWct-u3snYXntQ; __gpi=UID=000006c0c6809d99:T=1656864706:RT=1656864706:S=ALNI_MbNlply1Ric98nkJqC81m4LussWaw; PHPSESSID=qasusfb11958k62t0cv3u0pim2; _gat_gtag_UA_114571019_11=1; _ga_SK0KDDQM5P=GS1.1.1656864706.1.1.1656867224.0; _ga=GA1.1.359514262.1656864706',

                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'

            }

        }).then(da => {

            const $ = cheerio.load(da.data)

            const form = new FormData()

            form.append('text[]',text)

            form.append('submit','GO')

            form.append('token',$('#token').val())

            form.append('build_server',$('#build_server').val())

            form.append('build_server_id',$('#build_server_id').val())

            axios({url: url,

                method: 'POST',

                data: form,

                headers: {

                    'cookie': '_gid=GA1.2.1885119409.1656864706; __gads=ID=dc094aa760fdfc92-22b4a69967d30082:T=1656864706:RT=1656864706:S=ALNI_MapJhFNdgQujQ-avWct-u3snYXntQ; __gpi=UID=000006c0c6809d99:T=1656864706:RT=1656864706:S=ALNI_MbNlply1Ric98nkJqC81m4LussWaw; PHPSESSID=qasusfb11958k62t0cv3u0pim2; _gat_gtag_UA_114571019_11=1; _ga_SK0KDDQM5P=GS1.1.1656864706.1.1.1656867224.0; _ga=GA1.1.359514262.1656864706',

                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'

                }

    }).then(da =>{

    const $ = cheerio.load(da.data)

    const p = JSON.parse($('#form_value_input').attr('value').replace(/\[/g,'').replace(/\]/g,'').replace(/text/g,'text[]'))

    console.log(p)

    axios({url: 'https://en.ephoto360.com/effect/create-image',

        method: 'POST',

        data: new URLSearchParams(p),

        headers: {

            'cookie': '_gid=GA1.2.1885119409.1656864706; __gads=ID=dc094aa760fdfc92-22b4a69967d30082:T=1656864706:RT=1656864706:S=ALNI_MapJhFNdgQujQ-avWct-u3snYXntQ; __gpi=UID=000006c0c6809d99:T=1656864706:RT=1656864706:S=ALNI_MbNlply1Ric98nkJqC81m4LussWaw; PHPSESSID=qasusfb11958k62t0cv3u0pim2; _gat_gtag_UA_114571019_11=1; _ga_SK0KDDQM5P=GS1.1.1656864706.1.1.1656867224.0; _ga=GA1.1.359514262.1656864706',

            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'

        }

    }).then(a => {

        const result = {

            status: 200,

            author: author,

            result: 'https://e2.yotools.net' + a.data.image

        }

        resolve(result)

    }).catch(reject)

  }).catch(reject)

})

})

}

/**

 * Twitter trend Scraper From https://getdaytrends.com/

 * @function

 * @param {String} query - example indonesia

 *

 */

exports.twittertrend = (query) => {

    return new Promise((resolve, reject) => {

        axios.get(`https://getdaytrends.com/${query}`)

            .then(({

                data

            }) => {

                const $ = cheerio.load(data)

                const hasil = [];

                num = 1

                 $('#trends > table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr').each(function(a, b) {

                    result = {

                    status: 200,

                    author: author,

                    rank: num++,

                    hastag: $(b).find('> td.main > a').text(),

                    tweet: $(b).find('> td.main > div > span').text().trim(),

                    link: 'https://getdaytrends.com/' + $(b).find('> td.main > a').attr('href'),

                }

                hasil.push(result)

                })

                resolve(hasil)

            })

            .catch(reject)

    })

}



/**

 * Tiktok trend Scraper From https://brainans.com/

 * @function

 * @param ()

 *

 */

exports.tiktoktrend = async () => {

    return new Promise((resolve, reject) => {

    axios.get("https://brainans.com/").then(async(data) => {

    const $ = cheerio.load(data.data);

    const result = {};

    const plink = [];

    result["status"] = "200";

    result["author"] = author

    result["result"] = [];

    async function getmetadata(link, views) {

        const data = await axios.get("https://brainans.com" + link);

        const $$ = cheerio.load(data.data);

        result["result"].push({
            username: $$("#card-page").find("div.main__user-desc.align-self-center.ml-2 > a").text(),
            upload_time: $$("#card-page").find("div.main__user-desc.align-self-center.ml-2").text().split($$("#card-page").find("div.main__user-desc.align-self-center.ml-2 > a").text())[1].trim(),
            caption: $$("#card-page").find("div.main__list").text(),
            views: views,
            like: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(1) > span").text(),
            comment: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(2) > span").text(),
            share: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(3) > span").text(),
            video: $$("#card-page").find("video").attr("src"),
        });

    }
    $("#welcome_videos > div > div > a").each(function(a, b) {

        plink.push({link: $(b).attr("href"),views: $(b).find("div.video_view_count.bx.bx-show > span").text(),

        });

    });

    for (let i = 0; i < 10; i++) {

        await getmetadata(plink[i].link, plink[i].views);

    }

    resolve(result)

}).catch(reject)

})

};

// Instagram Stalking
exports.igstalk = async(user) => {
  	try {
  		const {data} = await axios.get('https://i.instagram.com/api/v1/users/web_profile_info/?username=' + user, {
  			headers: {
  				"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36",
  				"x-asbd-id": "198387",
  				"x-csrftoken": "VXLPx1sgRb8OCHg9c2NKXbfDndz913Yp",
  				"x-ig-app-id": "936619743392459",
  				"x-ig-www-claim": "0"
  			}
  		})
  		return(data.status == 'ok' ? {
  	              author: author,
        			status: true,
        			profile: {
  			      low: data.data.user.profile_pic_url,
  			      high: data.data.user.profile_pic_url_hd,
              		},
              		data: {
  			      url: data.data.user.external_url,
  				id: data.data.user.id,
  			      fullname: data.data.user.full_name,
  			      private: data.data.user.is_private,
  			      verified: data.data.user.is_verified,
  			      bio: data.data.user.biography,
  			      follower: data.data.user.edge_followed_by.count,
  			      following: data.data.user.edge_follow.count,
  			      conneted_fb: data.data.user.connected_fb_page,
  			      videotimeline: data.data.user.edge_felix_video_timeline.count,
  			      timeline: data.data.user.edge_owner_to_timeline_media.count,
  			      savedmedia: data.data.user.edge_saved_media.count,
  			      collections: data.data.user.edge_media_collections.count,
              		}
      } : {status: false, message: 'user not found'})
  	} catch {
  		return ({
  	
  			status: false,
  			message: 'user not found'
  		})
  	}
  }

exports.igstory = async(Username) => {
    return new Promise((resolve, reject) => {
        axios({
            url: 'https://www.instagram.com/web/search/topsearch/?context=blended&query=' + Username,
            method: 'GET',
            headers: {
                'cookie': 'mid=Ynu0IQALAAFTzRA6F7dYQFs-Nnyg; ig_did=277CE601-432E-44E2-9788-C3BC4853B7BE; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; ds_user_id=53573025022; sessionid=53573025022:g3hEBxbsgRZQ09:0; csrftoken=K6qCf8OGMgwXhqLIb6yGuSo92Guv6zbo; datr=ur6gYj2JbghSdJIyUQ58H4V7; shbid="12737\05453573025022\0541688460670:01f70e6b7ef6784b6334c8b3ce769ab13099f2eac3b5e052ed0e8f533063adad6a664301"; shbts="1656924670\05453573025022\0541688460670:01f78ebe387ba1faa7607564adf65efd7de1f9c4490194f7a7c09a01199e1033be0d5f05"; fbsr_124024574287414=BRsp_IMZ5EXK32oiy1NVFPz1FGq8p4hhjew1K8MKi2Q.eyJ1c2VyX2lkIjoiMTAwMDExMzkyNTQ5NTQ3IiwiY29kZSI6IkFRQThZTWJvaXlMcHRUS0VPMXJaVXA3blpaRllmQkV1SmFJMHlhME4zYU1BVGFkY2VNZXdaSDZHQWI0LVVwYVNkbGRWNlJiNFpEMVJ2ME9tcU4yNnZ5d0xHb0V2Q19vVGNENE1hblk5bUFFdEU2X2tvc3BVcUUycDFoaE9leEJMZTRSYy1aS001Y0R6Wm1kSlBIOGZTcDFzdVAzMmxUVnVxSkRLM3BYcEJFemt5RGxqczJMMDVFOW5LZEN3MTRGNFRYWmVVU1dHUmprUllIN2ExYllSTWh3WDYtQUdvM0VMVTFmaEg2Qm1mS3U3OEdhMkc1UXdxcG1rSXQtY09BdE9aNG5SM244UXJoTjJVd0RmeWRxZnc2clRYM3kzY3c5RGZuTjE1REd6bmU5QUJHMnI0MFRsbkREU3RZcUtSRnR1RUpDTW5nYUVGcnpybEJiaF83MVVoNDZlcVBCYlNFWnUtb3JaNmhKeEc1TnZZQSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFDZXRaQUlKdVpCdnNsVWtaQkc3QVNVOEtFMDFQRVpCSG1EY3pqdjlaQktiY2UyeGJYaTVaQ0pkdUpQZll6MzhmSmx3V3BRWkFOSFZiNjdFb2tPWGUyWkMxa0hLckxZTVhVVU1JT3M0VUhkaFhzRENjbFVJdWlRVTViOWk2SkFBbGhHaVpCY1hWbE5SckN5SjFOMzRYMVNsOGF6RDB3NnNaQnpNYUZaQXBnYjNwWkNOOGt6eG5nUkUxQ01aRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjU2OTI0Njc3fQ; rur="PRN\05453573025022\0541688486159:01f76bea5dc1041554a07e23b8f587ac9e549169b5e3dbdb6e701d82f50d8001dc89fcd7"',
            }
        })
            .then((Response) => {
                let id = Response.data.users[0].user.pk
                axios({
                    url: 'https://i.instagram.com/api/v1/feed/user/' + id + '/story/',
                    method: 'GET',
                    headers: {
                        'cookie': 'mid=Ynu0IQALAAFTzRA6F7dYQFs-Nnyg; ig_did=277CE601-432E-44E2-9788-C3BC4853B7BE; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; ds_user_id=53573025022; sessionid=53573025022:g3hEBxbsgRZQ09:0; csrftoken=K6qCf8OGMgwXhqLIb6yGuSo92Guv6zbo; datr=ur6gYj2JbghSdJIyUQ58H4V7; shbid="12737\05453573025022\0541688460670:01f70e6b7ef6784b6334c8b3ce769ab13099f2eac3b5e052ed0e8f533063adad6a664301"; shbts="1656924670\05453573025022\0541688460670:01f78ebe387ba1faa7607564adf65efd7de1f9c4490194f7a7c09a01199e1033be0d5f05"; fbsr_124024574287414=BRsp_IMZ5EXK32oiy1NVFPz1FGq8p4hhjew1K8MKi2Q.eyJ1c2VyX2lkIjoiMTAwMDExMzkyNTQ5NTQ3IiwiY29kZSI6IkFRQThZTWJvaXlMcHRUS0VPMXJaVXA3blpaRllmQkV1SmFJMHlhME4zYU1BVGFkY2VNZXdaSDZHQWI0LVVwYVNkbGRWNlJiNFpEMVJ2ME9tcU4yNnZ5d0xHb0V2Q19vVGNENE1hblk5bUFFdEU2X2tvc3BVcUUycDFoaE9leEJMZTRSYy1aS001Y0R6Wm1kSlBIOGZTcDFzdVAzMmxUVnVxSkRLM3BYcEJFemt5RGxqczJMMDVFOW5LZEN3MTRGNFRYWmVVU1dHUmprUllIN2ExYllSTWh3WDYtQUdvM0VMVTFmaEg2Qm1mS3U3OEdhMkc1UXdxcG1rSXQtY09BdE9aNG5SM244UXJoTjJVd0RmeWRxZnc2clRYM3kzY3c5RGZuTjE1REd6bmU5QUJHMnI0MFRsbkREU3RZcUtSRnR1RUpDTW5nYUVGcnpybEJiaF83MVVoNDZlcVBCYlNFWnUtb3JaNmhKeEc1TnZZQSIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFDZXRaQUlKdVpCdnNsVWtaQkc3QVNVOEtFMDFQRVpCSG1EY3pqdjlaQktiY2UyeGJYaTVaQ0pkdUpQZll6MzhmSmx3V3BRWkFOSFZiNjdFb2tPWGUyWkMxa0hLckxZTVhVVU1JT3M0VUhkaFhzRENjbFVJdWlRVTViOWk2SkFBbGhHaVpCY1hWbE5SckN5SjFOMzRYMVNsOGF6RDB3NnNaQnpNYUZaQXBnYjNwWkNOOGt6eG5nUkUxQ01aRCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjU2OTI0Njc3fQ; rur="PRN\05453573025022\0541688486159:01f76bea5dc1041554a07e23b8f587ac9e549169b5e3dbdb6e701d82f50d8001dc89fcd7"',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                        'x-ig-app-id': '936619743392459',
                    }
                }).then(res => {
                    let file = res.data.reel.items
                    let hasil = []
                    let durasi = [] // durasi video
                    for (let i = 0; i < file.length; i++) {
                        durasi.push(res.data.reel.items[i].video_duration)
                        if (file[i].video_versions !== undefined) {
                            hasil.push(...new Set(res.data.reel.items[i].video_versions))
                        }
                    }
                    let filter = [] // filter foto
                    let idx = durasi.indexOf(undefined);
                    while (idx != -1) {
                        filter.push(idx);
                        idx = durasi.indexOf(undefined, idx + 1);
                    }
                    if (!filter == '') {
                        for (let a of filter) {
                            hasil.push(...new Set(res.data.reel.items[a].image_versions2.candidates))
                        }
                    }
                    filter = hasil.filter(a => a.width == 720 || a.height == 1334 || a.height == 1333 || a.height == 1280)
                    resolve(filter)
                })
            })
            .catch(a => resolve(a))
    })
}

/**
 * Jadwalbola Scraper From https://m.bola.net/jadwal_televisi/
 * @function
 * @param ()
 *
 */
exports.jadwalbola = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://m.bola.net/jadwal_televisi/')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('body > div.main > div > div:nth-child(3) > div > ul > li').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    jadwal: $(b).find('> div > div > p > a').text().split('Jadwal TV: ')[1],
                    tanggal: $(b).find('> div > div > span').text().split('jadwal televisi ')[1],
                    url: $(b).find('> div > div > p > a').attr('href'),
                    thumb: 'https://cdns.klimg.com/bola.net/library/upload/21/2019/01/100s/bola_e9af938.jpg'
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

/**
 * Jadwaltv Scraper From http://www.dokitv.com/jadwal-acara-tv
 * @function
 * @param ()
 *
 */
exports.jadwaltv = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://www.dokitv.com/jadwal-acara-tv')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('#tabeljadwaltv > tbody > tr ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    acara: $(b).find('> td:nth-child(2)').text(),
                    channel: $(b).find('> td > a').text(),
                    jam: $(b).find('> td.jfx').text(),
                    source: $(b).find('> td > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

/**
 * Jadwalsholat Scraper From https://umrotix.com/
 * @function
 * @param ()
 *
 */
exports.jadwalsholat = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://umrotix.com/jadwal-sholat/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                $('body > div > div.main-wrapper.scrollspy-action > div:nth-child(3) ').each(function(a, b) {   
                    result = {
                    status: 200,
                    author: author,
                    tanggal: $(b).find('> div:nth-child(2)').text(),
                    imsyak: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(1) > p:nth-child(2)').text(),
                    subuh: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(2) > p:nth-child(2)').text(),
                    dzuhur: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(3) > p:nth-child(2)').text(),
                    ashar: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(4) > p:nth-child(2)').text(),
                    maghrib: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(5) > p:nth-child(2)').text(),
                    isya: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(6) > p:nth-child(2)').text()
                }
                resolve(result)
                })
            })
            .catch(reject)
    })
}

/**
 * Kompasnews Scraper From https://news.kompas.com/
 * @function
 * @param ()
 *
 */
exports.kompasnews = () => {
    return new Promise((resolve, reject) => {
        axios.get(`https://news.kompas.com/`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('body > div > div.container.clearfix > div:nth-child(3) > div.col-bs10-7 > div:nth-child(3) > div.latest.ga--latest.mt2.clearfix > div > div ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    berita: $(b).find('> div > div.article__box > h3').text(),
                    upload_time: $(b).find('> div > div.article__box > div.article__date').text(),
                    type_berita: $(b).find('> div > div.article__boxsubtitle > h2').text(),
                    link: $(b).find('> div > div.article__box > h3 > a').attr('href'),
                    thumbnail: $(b).find('> div > div.article__asset > a > img').attr('data-src'),
                    info_berita: $(b).find('> div > div.article__box > div.article__lead').text()
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

/**
 * Inews Scraper From https://www.inews.id/news
 * @function
 * @param ()
 *
 */
exports.inews = () => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.inews.id/news`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('#news-list > li ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    berita: $(b).find('> a > div > div > div.float-left.width-400px.margin-130px-left > div.title-news-update.padding-0px-top').text().trim(),
                    upload_time: $(b).find('> a > div > div > div.float-left.width-400px.margin-130px-left > div.date.margin-10px-left').text().trim().split('|')[0],
                    link: $(b).find('> a').attr('href'),
                    thumbnail: $(b).find('> a > div > div > div.float-left.width-130px.position-absolute > img').attr('data-original'),
                    info_berita: $(b).find('> a > div > div > div.float-left.width-400px.margin-130px-left > p').text()
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

/**
 * Wattpaduser Scraper From https://www.wattpad.com/
 * @function
 * @param {String} query - example WattpadRomanceIN
 *
 */
exports.wattpaduser = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.wattpad.com/user/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                $('#app-container > div > header ').each(function(a, b) {
                    $('#profile-about > div > div ').each(function(c, d) {
                    result = {
                    status: 200,
                    author: author,
                    username: $(b).find('> div.badges > h1').text().trim(),
                    works: $(b).find('> div.row.header-metadata > div:nth-child(1) > p:nth-child(1)').text(),
                    reading_list: $(b).find('> div.row.header-metadata > div.col-xs-4.scroll-to-element > p:nth-child(1)').text(),
                    followers: $(b).find('> div.row.header-metadata > div.col-xs-4.on-followers > p.followers-count').text(),
                    joined: $(d).find('> ul > li.date.col-xs-12.col-sm-12 > span').text().trim().replace('Joined',''),
                    pp_picture: `https://img.wattpad.com/useravatar/${query}.128.851744.jpg`,
                    about: $(d).find('> div.description > pre').text() ? $(d).find('> div.description > pre').text() : 'Not found'
                }
                resolve(result)
                })
                })
            })
            .catch(reject)
    })
}