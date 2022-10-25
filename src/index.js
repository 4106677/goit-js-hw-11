// const axios = require('axios').default;
import axios from 'axios';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImg } from './js/fetch.js';
import markup from './templates/markup.hbs';

const form = document.getElementById('search-form');
const input = document.querySelector("input[name='searchQuery']");
const gallery = document.querySelector('.gallery');
const button = document.querySelector('button');

gallery.addEventListener('click', onImageClick);

const lightbox = new SimpleLightbox('.gallery a');

let page = 1;
let limit = 40;
let totalPage = limit / 40;
let nexpPage = 2;

function onImageClick(evt) {
  evt.preventDefault();
}

const infiniteObserver = new IntersectionObserver(([entry], observer) => {
  if (entry.isIntersecting) {
    observer.unobserve(entry.target);
    render(nexpPage++);
  }
}, {});

let query = '';

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  gallery.innerHTML = '';
  query = input.value.trim();
  if (query === '') {
    return;
  }
  render(page);
}

async function render(page = 1) {
  const data = await fetchImg(query, page);
  if (data.data.totalHits === 0) {
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    if (page === 1) {
      Notiflix.Notify.info(`Hooray! We found ${data.data.totalHits} images.`);
      totalPage = data.data.totalHits;
    }

    gallery.insertAdjacentHTML('beforeend', markup(data.data.hits));

    if (page > 1) {
      //***********************/

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      //***********************/
    }

    lightbox.refresh();

    const lastCard = gallery.lastElementChild;
    if (lastCard) {
      infiniteObserver.observe(lastCard);
    }
  }
}
