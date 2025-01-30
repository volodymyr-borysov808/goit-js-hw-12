const loader = document.querySelector('.loader');

export const createGalleryListTemplate = odjImgInfo => {
  const {
    webformatURL: smallImg,
    largeImageURL: bigImg,
    tags: altImg,
    likes,
    views,
    comments,
    downloads,
  } = odjImgInfo;

  return `  
  <li class="gallery-item">
    <a class="gallery-link" href="${bigImg}">
      <img class="gallery-img" src="${smallImg}" alt="${altImg}"  />
    </a>
      <div class="container">
        <div class="deck-img">
        likes
          <h2 class="value-deck-img">${likes}</h2>
        </div>
        <div class="deck-img">
        views
          <h2 class="value-deck-img">${views}</h2>
        </div>
        <div class="deck-img">
        comments
          <h2 class="value-deck-img">${comments}</h2>
        </div>
        <div class="deck-img">
        downloads
          <h2 class="value-deck-img">${downloads}</h2>
        </div>
      </div>
  </li>`;
};

export const showLoader = () => {
  return (loader.style.display = 'block');
};
export const hideLoader = () => {
  return (loader.style.display = 'none');
};
