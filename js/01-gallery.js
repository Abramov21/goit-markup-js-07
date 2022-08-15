import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryMarkup(itemsGallery) {
  return itemsGallery
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join('');
}

function onGalleryContainerClick(event) {
  event.preventDefault();

  const wayToImg = event.target.dataset.source;

  basicLightBoxOpen(wayToImg);
}

function basicLightBoxOpen(wayToImg) {
  const html = `<img width="1400" height="900" src="${wayToImg}">`;

  const ligthboxLib = basicLightbox.create(html, {
    onShow: ligthboxLib => window.addEventListener('keydown', onEscKeyPress),
    onClose: ligthboxLib => window.removeEventListener('keydown', onEscKeyPress),
  });

  ligthboxLib.show();

  function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';

    if (event.code === ESC_KEY_CODE) {
      ligthboxLib.close();
    }
  }
}