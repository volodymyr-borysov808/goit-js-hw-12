import axios from 'axios';

export const searchPhotoApi = (userSearchQuery, pageNumb) => {
  const urlSearchParams = {
    params: {
      page: pageNumb,
      q: userSearchQuery,
      per_page: 15,
      key: '48317789-78974bc54d3835e3e1fe36f62',
      safesearch: true,
      orientation: 'horizontal',
      image_type: 'photo',
    },
  };

  return axios(`https://pixabay.com/api/`, urlSearchParams);
};

