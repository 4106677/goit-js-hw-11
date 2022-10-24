// const axios = require('axios').default;
import axios from 'axios';
import Notiflix from 'notiflix';

import { fetchImg } from './js/fetch.js';
import markup from './templates/markup.hbs';

const form = document.getElementById('search-form');
const input = document.querySelector("input[name='searchQuery']");
const container = document.querySelector('.container');

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  const data = await fetchImg(input.value);
  if (data.data.hits.length === 0) {
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  console.log(data.data.hits);
  container.insertAdjacentHTML('beforeend', markup(data.data.hits));
}
