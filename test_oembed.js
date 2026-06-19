const axios = require('axios');

async function test() {
    const videoId = 'dQw4w9WgXcQ';
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    console.log(`Fetching oEmbed for video: ${url}`);
    try {
        const res = await axios.get(url);
        console.log("oEmbed response:", JSON.stringify(res.data, null, 2));
    } catch (e) {
        console.error("Error:", e.message);
    }
}

test();
