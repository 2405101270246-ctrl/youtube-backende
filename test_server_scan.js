const axios = require('axios');

function findObjectsWithKey(obj, key, results = []) {
    if (!obj || typeof obj !== 'object') return results;
    if (obj[key]) {
        results.push(obj[key]);
    }
    for (const k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
            findObjectsWithKey(obj[k], key, results);
        }
    }
    return results;
}

async function test() {
    const channelId = 'UCK8sQmJBp8GCxrOtXWBpyEA'; // Google's channel ID
    const url = `https://www.youtube.com/channel/${channelId}/shorts`;
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });
        const html = response.data;
        const match = html.match(/var ytInitialData = ({.*?});<\/script>/) || html.match(/window\["ytInitialData"\] = ({.*?});/) || html.match(/ytInitialData\s*=\s*({.*?});<\/script>/);
        if (match) {
            const data = JSON.parse(match[1]);
            const richItemRenderers = findObjectsWithKey(data, 'richItemRenderer');
            if (richItemRenderers.length > 0) {
                console.log("First richItemRenderer keys:", Object.keys(richItemRenderers[0]));
                console.log("First richItemRenderer content keys:", Object.keys(richItemRenderers[0].content || {}));
                console.log("First richItemRenderer content details:", JSON.stringify(richItemRenderers[0].content, null, 2));
            }
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

test();
