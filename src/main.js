import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import {
  createGalleryListTemplate,
  showLoader,
  hideLoader,
} from './js/render-functions';
import { searchPhotoApi } from './js/pixabay-api';

const form = document.querySelector('.main-form');
const list = document.querySelector('.list-gallery');
const btnLoadMore = document.querySelector('.js-load-more');
const allert = iziToast;
const allertOptions = {
  title: '❌ Sorry',
  color: 'red',
  position: 'topRight',
};
const simplelightbox = new SimpleLightbox('.list-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let userSearchQuery = '';
let totalPages = '';

const searchUserPhotoApi = async e => {
  try {
    e.preventDefault();
    showLoader();

    userSearchQuery = e.currentTarget.elements.user_search_query.value.trim();
    list.innerHTML = '';
    page = 1;
    btnLoadMore.classList.add('is-hidden');

    if (userSearchQuery === '') {
      allert.show({
        ...allertOptions,
        color: 'orange',
        message: 'Please enter a keyword',
      });

      hideLoader();
      form.reset();
      list.innerHTML = '';
      return;
    }

    const { data } = await searchPhotoApi(userSearchQuery, page);

    if (data.total === 0) {
      allert.show({
        ...allertOptions,
        message:
          'There are no images matching your search query. Please try again!',
      });

      hideLoader();
      form.reset();
      list.innerHTML = '';
      return;
    }

    totalPages = Math.ceil(data.totalHits / 15);
    const galleryTemplate = data.hits
      .map(el => createGalleryListTemplate(el))
      .join('');

    list.innerHTML = galleryTemplate;
    simplelightbox.refresh();
    form.reset();

    if (page < totalPages) {
      btnLoadMore.classList.remove('is-hidden');
    }
    btnLoadMore.addEventListener('click', getLoadMoreBtn);
  } catch (error) {
    allert.show({ ...allertOptions, message: error.message });
  } finally {
    hideLoader();
  }
};

form.addEventListener('submit', searchUserPhotoApi);

const getLoadMoreBtn = async e => {
  try {
    page++;
    showLoader();

    const { data } = await searchPhotoApi(userSearchQuery, page);

    const galleryTemplate = data.hits
      .map(el => createGalleryListTemplate(el))
      .join('');

    list.insertAdjacentHTML('beforeend', galleryTemplate);
    hideLoader();
    simplelightbox.refresh();
    const elLi = document.querySelector('.gallery-item');
    const rect = elLi.getBoundingClientRect();
    const heightEl = rect.height * 2;

    window.scrollBy({
      top: heightEl,
      behavior: 'smooth',
    });

    if (page >= totalPages) {
      btnLoadMore.classList.add('is-hidden');
      btnLoadMore.removeEventListener('click', getLoadMoreBtn);
      allert.show({
        ...allertOptions,
        color: 'orange',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    allert.show({ ...allertOptions, message: error.message });
  } finally {
    hideLoader();
  }
};
