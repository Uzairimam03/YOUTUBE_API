import axios from 'axios';

// Fetch video details from YouTube API
export const getVideoDetailsFromAPI = async (videoId) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;

    // Make the API request
    const response = await axios.get(url);

    console.log('YouTube API Response:', response.data);

    if (response.data.items && response.data.items.length > 0) {
      const video = response.data.items[0];
      const viewCount = video.statistics.viewCount;

      // Return the view count directly
      return {
        ...video,
        viewCount,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching video details:', error);
    return null;
  }
};
