import { galleryItems } from "./gallery-items.js";

// Tworzenie i renderowanie znacznika zgodnie z tablicą danych galleryItems i dostarczonym szablonem elementu galerii.
const galleryElement = document.querySelector("ul.gallery");

const galleryItemsElements = galleryItems
  .map(
    ({ preview, original, description }) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>
    `
  )
  .join("");

galleryElement.insertAdjacentHTML("beforeend", galleryItemsElements);

// Implementacja oddelegowania do div.gallery i otrzymania url większego obrazu.

const showLargeImage = (event) => {
  event.preventDefault();
  if (event.target.tagName === "IMG") {
    const largeImage = event.target.dataset.source;
    const imageDescription = event.target.alt;

    // Otworzenie okna modalnego po kliknięciu w element galerii
    const instance = basicLightbox.create(
      `
		<img width="1280" src="${largeImage}" alt="${imageDescription}">
	`,
      {
        onClose: (instance) => {
          galleryElement.removeEventListener(
            "keydown",
            closeImageWithEscapeKey
          );
        },
      }
    );
    instance.show();

    // Zamknięcie okna modalnego z użyciem Escape
    const closeImageWithEscapeKey = (event) => {
      if (event.key === "Escape") {
        instance.close();
      }
    };

    document.addEventListener("keydown", closeImageWithEscapeKey);
  }
};

galleryElement.addEventListener("click", showLargeImage);
