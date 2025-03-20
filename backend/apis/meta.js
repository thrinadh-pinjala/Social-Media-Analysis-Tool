const axios = require('axios');

const fetchMetaData = async () => {
  const accessToken = process.env.META_ACCESS_TOKEN;

  const url = `https://graph.facebook.com/v19.0/me/posts?access_token=${accessToken}`;

  try {
    const response = await axios.get(url);
    
    const posts = response.data.data.map(post => ({
      platform: "Meta",
      post_id: post.id,
      content: post.message || "No content",
      created_at: new Date(post.created_time),
      likes: Math.floor(Math.random() * 500),  
      comments: Math.floor(Math.random() * 100),  
      shares: Math.floor(Math.random() * 50)  
    }));

    return posts;
  } catch (error) {
    console.error("Error fetching Meta data:", error);
    return [];
  }
};

module.exports = fetchMetaData;
