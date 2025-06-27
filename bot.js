require('dotenv').config({ path: './.env' });
const { TwitterApi } = require('twitter-api-v2');
const axios = require('axios');

const url = "https://waifu.it/api/v4/quote";


const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
});




async function randomQuote() {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: process.env.WAIFU_TOKEN,
      },
    });
    const { quote, anime } = response.data;
    console.log(`Quote fetched: "${quote}" from ${anime}`);
    return `"${quote}" — *${anime}*`;
  } catch (err) {
    console.error("Error fetching quote:", err.message);
    return null;
  }
}


async function tweetQuote() {
  const quote = await randomQuote();
  if (!quote) return;

  try {
    const tweet = await twitterClient.v2.tweet(quote);
    console.log("✅ Tweet posted:", tweet);
  } catch (err) {
    console.error("❌ Failed to tweet:", err.response?.data || err.message);
  }
}
tweetQuote();