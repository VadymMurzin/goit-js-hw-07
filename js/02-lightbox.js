import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
          </a>
        </li>
      `;
    })
    .join("");
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  const isGalleryImage = evt.target.classList.contains("gallery__image");
  if (!isGalleryImage) {
    return;
  }

  const originalUrl = evt.target.closest(".gallery__link");

  var lightbox = new SimpleLightbox(".gallery__link", {
    captionsData: "alt",
    captionDelay: 250,
  });

  lightbox.open(originalUrl.href);

  lightbox.show();
}

console.log(galleryItems);
