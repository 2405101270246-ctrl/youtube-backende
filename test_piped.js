const axios = require('axios');

async function test() {
    const channelId = 'UC8-Th83bH_th1678qy6tDXg'; // Google channel ID
    const instances = [
        'https://pipedapi.kavin.rocks',
        'https://pipedapi.colby.edu',
        'https://api.piped.yt',
        'https://pipedapi.smnz.de'
    ];

    for (const inst of instances) {
        const url = `${inst}/channel/${channelId}`;
        console.log(`Trying Piped instance: ${url}`);
        try {
            const res = await axios.get(url, { timeout: 8000 });
            console.log(`Success with Piped instance ${inst}!`);
            console.log("Keys in response:", Object.keys(res.data));
            console.log("Channel Name:", res.data.name);
            console.log("Subscriber Count:", res.data.subscriberCount);
            console.log("Description:", res.data.description ? res.data.description.substring(0, 100) : '');
            if (res.data.relatedStreams && res.data.relatedStreams.length > 0) {
                console.log(`Videos count in relatedStreams: ${res.data.relatedStreams.length}`);
                console.log("First video info:", JSON.stringify(res.data.relatedStreams[0], null, 2));
            }
            break;
        } catch (e) {
            console.error(`Failed Piped instance ${inst}:`, e.message);
        }
    }
}

test();
