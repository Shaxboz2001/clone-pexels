// Selectors

const gallery = document.querySelector(".gallery");
const auth = "563492ad6f9170000100000119d7b0869d5e41008dcf19ea36675e99";
let query;
const searchBtn = document.querySelector(".search i");
const inputEle = document.querySelector(".search input");
let number = 1;
let btnAdd = document.querySelector(".btn button");


// Add Events

searchBtn.addEventListener("click", () => {
  query = inputEle.value;
  searchImages(query);
  inputEle.value = "";
});

btnAdd.addEventListener("click",() => {
  addPage();
})
// Fetch Api
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "Application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();

  return data;
}

// generateImages

const generateImages = (data) => {
  data.photos.map((img) => {
    const galleryImg = document.createElement("div");
    galleryImg.innerHTML = `<div class="img-info">
      <p>${img.photographer}</p>
      <a href=${img.src.large} download=${img.url}>Download</a>
    </div>
    <img src=${img.src.original}>`;
    gallery.append(galleryImg);
  });
};

// curated functions

async function curatedImages() {
  let fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";

  const data = await fetchApi(fetchLink);
  console.log(data);
  generateImages(data);
}

curatedImages();

//  search images

async function searchImages(query) {
  gallery.innerHTML = "";
  let fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  console.log(data);
  generateImages(data);
}

//  addPage

async function addPage() {
  number++;
  let fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${number}`;
  const data = await fetchApi(fetchLink);
  console.log(data);
  generateImages(data);
}
