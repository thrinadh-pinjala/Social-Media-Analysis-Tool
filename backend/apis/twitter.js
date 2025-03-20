const axios = require('axios');

const fetchTwitterData = async () => {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  const url = 'https://api.twitter.com/2/tweets/search/recent?query=MongoDB&max_results=10';

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    });

    const tweets = response.data.data.map(tweet => ({
      platform: "Twitter",
      post_id: tweet.id,
      username: "Unknown",  
      content: tweet.text,
      created_at: new Date(tweet.created_at),
      likes: Math.floor(Math.random() * 100),  
      comments: Math.floor(Math.random() * 20),  
      shares: Math.floor(Math.random() * 10),  
      sentiment_score: Math.random().toFixed(2)  
    }));

    return tweets;
  } catch (error) {
    console.error("Error fetching Twitter data:", error);
    return [];
  }
};

module.exports = fetchTwitterData;
