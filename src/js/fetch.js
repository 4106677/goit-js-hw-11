import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30824727-fc7ffdf52eca2e0011c5b9076';

export const fetchImg = async (input, page) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: `${API_KEY}`,
        q: `${input}`,
        image_type: 'photo',
        orientation: 'horizontal',
        page: `${page}`,
        per_page: '40',
        safesearch: 'true',
      },
    });
    // const responseData = await response.json();
    return response;
  } catch (error) {
    Notiflix.Notify.failure('Oops, error!');
  }
};
