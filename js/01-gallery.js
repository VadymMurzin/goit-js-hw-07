import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryMarkUp = createGalleryMarkUp(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkUp);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryMarkUp(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join("");
}

function onGalleryContainerClick(evt) {
  const isGalleryImage = evt.target.classList.contains("gallery__image");
  if (!isGalleryImage) {
    return;
  }

  const instance = basicLightbox.create(`
  <img src="${evt.target.dataset.source}" width="800" height="600">
`);

  const close = {
    onShow: () => document.addEventListener("keydown", keyCloseModal),
    onClose: () => document.removeEventListener("keydown", keyCloseModal),
  };

  instance.show();
  close.onShow();

  function keyCloseModal(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }

  instance
    .element()
    .querySelector(".basicLightbox__placeholder")
    .addEventListener("click", () => {
      instance.close();
      close.onClose();
    });
}

// console.log(galleryItems);
