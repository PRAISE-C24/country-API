const contentContainer = document.querySelector(".content-container");
const regions = document.querySelectorAll(".filter-item");
const input = document.querySelector(".form__input");
const btn = document.querySelector(".btn");
const modal = document.querySelector(".modal");

const objects = [
  {
    id: "Belgium",
    flag: "./images/belgium.JPG",
    name: "Belgium",
    population: "80,000,000",
    region: "Europe",
    capital: "Berlin",
  },
  {
    id: "Italy",
    flag: "./images/italy.png",
    name: "Italy",
    population: "80,000,000",
    region: "Europe",
    capital: "Berlin",
  },
  {
    id: "South-Africa",
    flag: "./images/south-africa.png",
    name: "South-Africa",
    population: "80,000,000",
    region: "Africa",
    capital: "Berlin",
  },
  {
    id: "Nigeria",
    flag: "./images/nigeria.png",
    name: "Nigeria",
    population: "80,000,000",
    region: "Africa",
    capital: "Berlin",
  },
  {
    id: "Canada",
    flag: "./images/canada.png",
    name: "Canada",
    population: "80,000,000",
    region: "America",
    capital: "Berlin",
  },
  {
    id: "Brazil",
    flag: "./images/brazil.jpg",
    name: "Brazil",
    population: "80,000,000",
    region: "America",
    capital: "Berlin",
  },
  {
    id: "China",
    flag: "./images/china.png",
    name: "China",
    population: "80,000,000",
    region: "Asia",
    capital: "Berlin",
  },
  {
    id: "Japan",
    flag: "./images/japan.png",
    name: "Japan",
    population: "80,000,000",
    region: "Asia",
    capital: "Berlin",
  },
  {
    id: "Austria",
    flag: "./images/austria.png",
    name: "Austria",
    population: "80,000,000",
    region: "Oceania",
    capital: "Berlin",
  },
  {
    id: "Finland",
    flag: "./images/finland.png",
    name: "Finland",
    population: "80,000,000",
    region: "Oceania",
    capital: "Berlin",
  },
];

function setContent(item) {
  //country statistic list
  let population = document.createElement("li");
  population.textContent = `population: ${item.population}`;

  let region = document.createElement("li");
  region.textContent = `region: ${item.region}`;

  let capital = document.createElement("li");
  capital.textContent = `capital: ${item.capital}`;

  //country name
  let countryName = document.createElement("h4");
  countryName.classList.add("country-name");
  countryName.textContent = item.name;

  //country statistic list container
  let countryStat = document.createElement("ul");
  countryStat.append(population);
  countryStat.append(region);
  countryStat.append(capital);

  //content Details container
  let countryDetails = document.createElement("div");
  countryDetails.classList.add("country-details");

  countryDetails.append(countryName);
  countryDetails.append(countryStat);

  //content image
  let countryFlag = document.createElement("img");
  countryFlag.classList.add("country-flag");
  countryFlag.setAttribute("src", `${item.flag}`);
  countryFlag.setAttribute("id", `${item.id}`);

  //content container
  let content = document.createElement("div");
  content.classList.add("content");

  content.append(countryFlag);
  content.append(countryDetails);

  contentContainer.append(content);
}

function clearContent() {
  contentContainer.innerHTML = "";
}

function createContent(contents) {
  clearContent();
  contents.map((content) => {
    setContent(content);
  });
}
createContent(objects);

input.addEventListener("input", (e) => {
  search = e.target.value.toLowerCase();

  searchResult = objects.filter((item) =>
    item.name.toLocaleLowerCase().includes(search)
  );

  createContent(searchResult);
});

regions.forEach((item) => {
  item.addEventListener("click", (e) => {
    let region = e.target.id;
    filtered = objects.filter((item) => item.region === region);
    createContent(filtered);
  });
});

document.querySelectorAll(".country-flag").forEach((item) => {
  item.addEventListener("click", (e) => {
    let id = e.target.id;
    modal.style.transform = `translateX(${0}%)`;
    objects.map((item) => {
      if (item.id === id) {
        setDetails(item);
      }
    });
  });
});

// Details page
const flag = document.querySelector(".flag");
const names = document.querySelector(".name");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topDomain = document.querySelector(".top-domain");
const currencies = document.querySelector(".currencies");
const language = document.querySelector(".language");

function setDetails(detail) {
  flag.setAttribute("src", `${detail.Flag}`);
  names.textContent = detail.name;
  nativeName.textContent = detail.nativeName;
  population.textContent = detail.population;
  region.textContent = detail.region;
  subRegion.textContent = detail.subRegion;
  capital.textContent = detail.capital;
  topDomain.textContent = detail.topDomain;
  currencies.textContent = detail.currencies;
  language.textContent = detail.language;
}

btn.addEventListener("click", () => {
  modal.style.transform = `translateX(${-100}%)`;
});
