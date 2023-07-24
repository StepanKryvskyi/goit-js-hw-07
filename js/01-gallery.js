import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryBox = document.querySelector(".gallery");
const imageMarkup = createGalleryBox(galleryItems);
galleryBox.insertAdjacentHTML("beforeend", imageMarkup);

function createGalleryBox(galleryBoxItems) {
  return galleryItems
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
    .join(" ");
}

galleryBox.addEventListener("click", onImageClick);

let modalImage;

function onImageClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  modalImage = basicLightbox.create(
    `
  <img src="${e.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: (modalImage) => {
        window.addEventListener("keydown", closeOnKeyEsc);
      },
      onClose: (modalImage) => {
        window.removeEventListener("keydown", closeOnKeyEsc);
      },
    }
  );

  modalImage.show();
}

function closeOnKeyEsc(e) {
  if (e.code === "Escape") {
    modalImage.close();
  }
}

console.log(galleryItems);
