import axios from "axios";

const API_Key = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = process.env.REACT_APP_NEWS_BASE_URL;

const fetchNews = async (country = "gb", category = "general") => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        apiKey: API_Key,
        country: country,
        category: category,
      },
    });

    return response.data.articles;
  } catch (error) {
    console.log("Error", error);
    return [];
  }
};

export default fetchNews;
