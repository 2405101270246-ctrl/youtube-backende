const axios = require('axios');

function findTexts(obj, results = []) {
    if (!obj) return results;
    if (typeof obj === 'string') {
        if (obj.toLowerCase().includes('subscribers') || obj.toLowerCase().includes('videos') || obj.toLowerCase().includes('video')) {
            results.push(obj);
        }
        return results;
    }
    if (typeof obj === 'object') {
        for (const k in obj) {
            findTexts(obj[k], results);
        }
    }
    return results;
}

async function test() {
    const url = 'https://www.youtube.com/@Google';
    console.log(`Fetching ${url}...`);
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
            const texts = findTexts(data);
            console.log("Found matches inside ytInitialData:");
            console.log(texts.slice(0, 30));
            
            // Also print pageHeaderViewModel metadata fields if any
            if (data.header && data.header.pageHeaderRenderer && data.header.pageHeaderRenderer.content && data.header.pageHeaderRenderer.content.pageHeaderViewModel) {
                const model = data.header.pageHeaderRenderer.content.pageHeaderViewModel;
                console.log("Metadata keys:", Object.keys(model));
                if (model.metadata) {
                    console.log("Metadata content:", JSON.stringify(model.metadata, null, 2));
                }
                if (model.image) {
                    console.log("Image content:", JSON.stringify(model.image, null, 2));
                }
            }
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
}

test();
