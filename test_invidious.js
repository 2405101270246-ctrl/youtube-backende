const axios = require('axios');

async function getHealthyInstances() {
    try {
        console.log("Fetching active Invidious instances...");
        const res = await axios.get('https://api.invidious.io/instances.json');
        const healthy = res.data
            .filter(item => {
                const info = item[1];
                return info && info.api === true && info.type === 'https' && info.monitor && info.monitor.down === false;
            })
            .map(item => item[1].uri);
        console.log("Found healthy API instances:", healthy);
        return healthy;
    } catch (e) {
        console.error("Failed to fetch instance list:", e.message);
        return [];
    }
}

async function test() {
    const instances = await getHealthyInstances();
    const channelId = 'UC8-Th83bH_th1678qy6tDXg'; // Google channel ID
    
    for (const inst of instances) {
        const url = `${inst}/api/v1/channels/${channelId}`;
        console.log(`Trying instance ${inst}... url: ${url}`);
        try {
            const res = await axios.get(url, { timeout: 8000 });
            if (res.data && res.data.author) {
                console.log(`Success with ${inst}!`);
                console.log("Channel name:", res.data.author);
                console.log("Subscribers:", res.data.subCount);
                console.log("Video count:", res.data.videoCount);
                if (res.data.latestVideos && res.data.latestVideos.length > 0) {
                    console.log(`Latest videos count: ${res.data.latestVideos.length}`);
                    console.log("Sample video details:", JSON.stringify(res.data.latestVideos[0], null, 2));
                }
                break;
            } else {
                console.log(`Instance ${inst} returned unexpected structure:`, typeof res.data, String(res.data).substring(0, 200));
            }
        } catch (e) {
            console.log(`Instance ${inst} failed:`, e.message);
        }
    }
}

test();
