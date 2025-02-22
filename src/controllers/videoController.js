import { getVideoDetailsFromAPI } from '../services/youtubeService.js';

export const getVideoDetails = async (req, res) => {
  try {
    const { videoId } = req.body;
    const videoDetails = await getVideoDetailsFromAPI(videoId);

    if (!videoDetails) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Function to format the view count into 'K' or 'M'
    const formatViews = (views) => {
     
      views = Number(views);

      if (isNaN(views)) {
        return 'Invalid view count';
      }

      // Format view count based on the value
      if (views >= 1_000_000) {
        return (views / 1_000_000).toFixed(1) + 'M';  
      } else if (views >= 1_000) {
        return (views / 1_000).toFixed(1) + 'K';  
      }

      return views.toString();  // Return as a string for numbers less than 1000
    };

    // Format the view count in the video details
    const formattedViews = formatViews(videoDetails.statistics.viewCount);

    // Attach the formatted views to the video details
    const updatedVideoDetails = {
      ...videoDetails,
      formattedViews,
    };

    return res.json(updatedVideoDetails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
