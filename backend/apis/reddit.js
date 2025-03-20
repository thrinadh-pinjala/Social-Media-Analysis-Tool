const axios = require('axios');

const fetchRedditData = async () => {
  const url = `https://www.reddit.com/r/technology/new.json?limit=10`;

  try {
    const response = await axios.get(url);

    const posts = response.data.data.children.map(post => ({
      platform: "Reddit",
      post_id: post.data.id,
      username: post.data.author,
      content: post.data.title,
      created_at: new Date(post.data.created_utc * 1000),
      likes: post.data.ups,
      comments: post.data.num_comments
    }));

    return posts;
  } catch (error) {
    console.error("Error fetching Reddit data:", error);
    return [];
  }
};

module.exports = fetchRedditData;
