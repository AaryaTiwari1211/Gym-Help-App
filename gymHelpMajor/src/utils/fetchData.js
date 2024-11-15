export const exerciseOptions = {
  method: 'GET',
  hostname: process.env.REACT_APP_RAPID_API_HOST,
  port: null,
  path: '/exercises/bodyPartList',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': process.env.REACT_APP_YOUTUBE_API_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY,
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
