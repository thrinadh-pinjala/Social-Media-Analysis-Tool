const axios = require('axios');

const fetchLinkedInData = async () => {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;

  try {
    // Fetch LinkedIn Profile Data
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const profile = profileResponse.data;

    // Fetch Posts/Updates
    const postsResponse = await axios.get('https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:person:' + profile.id, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const posts = postsResponse.data.elements.map(post => ({
      platform: "LinkedIn",
      post_id: post.id,
      username: profile.localizedFirstName + " " + profile.localizedLastName,
      content: post.text?.text || "No content",
      created_at: new Date(post.created.time),
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      shares: Math.floor(Math.random() * 20)
    }));

    return posts;

  } catch (error) {
    console.error("Error fetching LinkedIn data:", error.response?.data || error.message);
    return [];
  }
};

module.exports = fetchLinkedInData;
