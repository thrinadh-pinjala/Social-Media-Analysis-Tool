const axios = require('axios');

const fetchYouTubeData = async () => {
  const apiKey = process.env.YOUTUBE_API_KEY;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=MongoDB&type=video&maxResults=10&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    const videos = response.data.items.map(video => ({
      platform: "YouTube",
      post_id: video.id.videoId,
      username: video.snippet.channelTitle,
      content: video.snippet.title,
      created_at: new Date(video.snippet.publishedAt),
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 200)
    }));

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return [];
  }
};

module.exports = fetchYouTubeData;
