import { loadDb, saveDb } from "./data.js";

const imageData = loadDb("images");

if (!imageData) {
  saveDb("images", []);
}

const sameImages = () => {
  saveDb("images", imageData);
};

export default {
  save: ({ key }) => {
    imageData.push({ key });
    sameImages();
  },
  load: ({ key }) => {
    return imageData.find((image) => image.key === key);
  },
  remove: ({ key }) => {
    const index = imageData.findIndex((image) => image.key === key);
    if (index !== -1) {
      imageData.splice(index, 1);
      sameImages();
    }
  },
  listAll: () => {
    return imageData.map((image) => ({ ...image }));
  },
};
