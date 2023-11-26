import React from "react";
import axios from "axios";

const API_Key = "8162d2671add4afa8d8b2752302901a2";
const BASE_URL = "https://newsapi.org/v2";

const fetchNews = async (country = "gb", category = "general") => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        apiKey: API_Key,
        country: country,
        category: category,
      },
    });
    console.log(response.data);
    return response.data.articles;
  } catch (error) {
    console.log("Error", error);
    return [];
  }
};

export default fetchNews;
