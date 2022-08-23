const axios = require("axios")
const qs = require("qs");
const cheerio = require("cheerio");

function igdl(url) {
    return new Promise(async (resolve, reject) => {
        axios.request({
            url: 'https://www.instagramsave.com/download-instagram-videos.php',
            method: 'GET',
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
            }
        })
            .then(({ data }) => {
                const $ = cheerio.load(data)
                const token = $('#token').attr('value')
                let config = {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                        "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    },
                    data: {
                        'url': url,
                        'action': 'post',
                        'token': token
                    }
                }
                axios.post('https://www.instagramsave.com/system/action.php', qs.stringify(config.data), { headers: config.headers })
                    .then(({ data }) => {
                        resolve(data)
                    })
            })
            .catch(reject)
    })
}

function IgStories(Username) {
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

async function igstalk(user) {
    try {
        const {data} = await axios.get('https://i.instagram.com/api/v1/users/web_profile_info/?username=' + user, {
            headers: {
                "cookie": 'sessionid=8779859677:24clyB6zydHETS:25;',
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36",
                "x-asbd-id": "198387",
                "x-csrftoken": "VXLPx1sgRb8OCHg9c2NKXbfDndz913Yp",
                "x-ig-app-id": "936619743392459",
                "x-ig-www-claim": "0"
            }
        })
        return (data.status == 'ok' ? {
            status: true,
            author: 'this.padly',
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
                timeline: data.data.user.edge_owner_to_timeline_media.count,
            }
        } : {status: false, message: 'user not found'})
    } catch {
        return ({
            status: false,
            message: 'user not found'
        })
    }
}

module.exports = { igdl, IgStories, igstalk }