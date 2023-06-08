import { galleryItems } from "./gallery-items.js";

const galleryElement = document.querySelector("ul.gallery");

const galleryItemsElements = galleryItems
  .map(
    ({ preview, original, description }) => `
        <li>
            <a class="gallery__item" href="${original}">
               <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        </li>
    `
  )
  .join("");

galleryElement.innerHTML = galleryItemsElements;

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
