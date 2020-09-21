import axios from 'axios';
const QUIZ_URL = 'https://opentdb.com/api.php?type=multiple';

export const searchPhotosRoute = (text, page) => {
  let data = axios.get(`https://api.unsplash.com//search/photos?page=${page}&query=${text}`, {
    headers: {
      Authorization: `Client-ID HzfjBGj6AzEuUXG2X0tPOI-HbtQJ6eQpyb0tR7iR7XA`
    }
  });
  return data;
}

export const getYouTubeVideos = (searchableText) => {
  let videoData = axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${searchableText}&safeSearch=moderate&videoType=any&key=AIzaSyBVsJ8sXNlOYZSngt3MNlGvncTRDck-DxA`);
  console.log(videoData);
  return videoData;
}

export const getQuizData = (amount, difficulty) => {
  let quizData = axios.get(`${QUIZ_URL}&amount=${amount}&difficulty=${difficulty}`);
  return quizData;
}
