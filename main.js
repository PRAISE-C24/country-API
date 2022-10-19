const contentContainer = document.querySelector(".content-container");
const header = document.querySelector("header");
const regions = document.querySelectorAll(".filter-item");
const input = document.querySelector(".form__input");
const filterTitleText = document.querySelector(".filter__title-text");
const filterBtn = document.querySelector(".filter-btn");
const filterList = document.querySelector(".filter__list");
const btn = document.querySelector(".btn");
const modal = document.querySelector(".modal");

function getData() {
  fetch("https://restcountries.com/v2/all")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createContent(data);
      objects = data;
    })
    .catch((error) => {
      console.log(error);
    });
}
getData();

//mode and current state
let mode;
let currentData;
let currentDetail;

function getMode() {
  mode = localStorage.getItem("mode");
}

//creating and rending contents to the DOM
function setContent(data) {
  //country statistic list
  let population = document.createElement("li");
  population.innerHTML = `<strong>population: </strong>${data.population}`;

  let region = document.createElement("li");
  region.innerHTML = `<strong>region: </strong>${data.region}`;

  let capital = document.createElement("li");
  capital.innerHTML = `<strong>capital: </strong>${data.capital}`;

  //country name
  let countryName = document.createElement("h4");
  countryName.classList.add("country-name");

  countryName.textContent =
    data.name.length > 30 ? `${data.name.slice(0, 21)}...` : data.name;

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
  countryFlag.setAttribute("src", `${data.flag}`);
  countryFlag.setAttribute("id", `${data.name}`);

  //content container
  let content = document.createElement("div");
  content.classList.add("content");

  content.append(countryFlag);
  content.append(countryDetails);

  //appending content to the DOM
  contentContainer.append(content);

  //switching bg base on mode
  switchBg1(content);
}

function setError() {
  //error message
  const errorMsg = document.createElement("h2");
  errorMsg.textContent = "sorry! no result found.";

  //appending error message on it's container
  const errorContent = document.createElement("div");
  errorContent.classList.add("error");
  errorContent.append(errorMsg);

  //appending errorContent to the DOM
  contentContainer.append(errorContent);
}

//clearing the previously rendered contents from the DOM
function clearContent() {
  contentContainer.innerHTML = "";
}

//setting conditions necessary for contents to be created and rendered
function createContent(data) {
  //clearing the previously rendered contents
  clearContent();

  if (data.length) {
    //mapping and setting new contents
    data.map((item) => {
      setContent(item);
    });
  } else {
    setError();
  }

  //Adding and listening for click event on every instance of content created
  document.querySelectorAll(".country-flag").forEach((item) => {
    item.addEventListener("click", (e) => {
      let id = e.target.id;

      //toggle detail page to open
      modal.style.transform = `translateX(${0}%)`;

      //setting details
      objects.map((item) => {
        if (item.name === id) {
          setDetails(item);
          currentDetail = item;
        }
      });

      //positioning the header on the details page
      header.classList.add("header");
    });
  });
}

//filtering data base on user search input
input.addEventListener("input", (e) => {
  search = e.target.value.toLowerCase();

  searchResult = objects.filter((item) =>
    item.name.toLocaleLowerCase().includes(search)
  );

  createContent(searchResult);
  currentData = searchResult;
});

//filtering data according user chosen region
regions.forEach((item) => {
  if (mode === "dark") {
    item.classList.toggle("dark--hover");
  }
  item.addEventListener("click", (e) => {
    let region = e.target.id;

    filterTitleText.textContent = region;

    let filtered;

    if (region === "All Region") {
      filtered = objects;
    } else {
      filtered = objects.filter((item) => item.region === region);
    }

    createContent(filtered);
    currentData = filtered;
  });
});

//positioning the filter icon
filterBtn.addEventListener("click", () => {
  filterList.classList.toggle("filter--active");
  if (!filterList.classList.contains("filter--active")) {
    filterBtn.style.transform = `rotateX(${180}deg)`;
  } else {
    filterBtn.style.transform = `rotateX(${0}deg)`;
  }
});

// Details page

// getting all the elements on details page
//and setting the contents of the details page
function setDetails(detail) {
  document.querySelector(".flag").setAttribute("src", `${detail.flag}`);

  document.querySelector(".name").textContent = detail.name;

  document.querySelector(".native-name").textContent = detail.nativeName;

  document.querySelector(".population").textContent = detail.population;

  document.querySelector(".region").textContent = detail.region;

  document.querySelector(".sub-region").textContent = detail.subregion;

  document.querySelector(".capital").textContent = detail.capital;

  document.querySelector(".top-domain").textContent = detail.topLevelDomain;

  document.querySelector(".currencies").textContent = detail.currencies.map(
    (item) => item.name
  );
  document.querySelector(".language").textContent = detail.languages.map(
    (item) => item.name
  );

  //clearing previously rendered border content
  //and setting new border content of the details page
  const borders = document.querySelector(".last-list");

  if (detail.borders) {
    borders.innerHTML = "";
    detail.borders.map((item) => {
      setBorder(item);
      return item;
    });
  } else {
    borders.innerHTML = "";
    setBorder("Borders Not Found");
  }

  function setBorder(name) {
    let item = document.createElement("li");
    item.classList.add("item");
    item.textContent = name;

    item.addEventListener("click", (e) => {
      let countryCode = e.target.textContent;
      objects.filter((item) => {
        item.alpha3Code === countryCode && setDetails(item);
      });
    });

    borders.append(item);
    switchBg1(item);
  }

  //switching modes on the details page and button
  switchBg2(modal);
  switchBg1(btn);
}

//toggling the details page to close
btn.addEventListener("click", () => {
  modal.style.transform = `translateX(${-100}%)`;

  //setting header back to normal
  header.classList.remove("header");
});

//getting mode icons for mode switch
const darkIcon = document.querySelector(".dark-icon");
const lightIcon = document.querySelector(".light-icon");

//toggle btw dark mode and light mode onClick
darkIcon.addEventListener("click", () => {
  //mode = "dark";
  localStorage.setItem("mode", "dark");
  switchMode();
  setCurrent();
});
lightIcon.addEventListener("click", () => {
  //mode = "light";
  localStorage.setItem("mode", "light");
  switchMode();
  setCurrent();
});

//getting and toggling DOM elements to effect mode switch
function switchMode() {
  getMode();
  //switching mode icons to active
  switchIcon();

  //switching Mode Text
  const modeText = document.querySelector(".mode-text");
  mode === "dark"
    ? (modeText.textContent = "Light mode")
    : (modeText.textContent = "Dark mode");

  //switching hover state on filter background color
  regions.forEach((item) => {
    mode === "dark"
      ? item.classList.add("dark--hover")
      : item.classList.remove("dark--hover");
  });
  //switching background colors
  switchBg1(header);

  switchBg2(document.querySelector("main"));

  switchBg1(document.querySelector("footer"));

  switchBg1(document.querySelector("form"));

  switchBg1(document.querySelector(".filter__title"));

  switchBg1(filterList);
}

switchMode();

//switch mode icons
function switchIcon(icon) {
  if (mode === "dark") {
    lightIcon.classList.add("active-mode");

    darkIcon.classList.remove("active-mode");
  } else {
    darkIcon.classList.add("active-mode");

    lightIcon.classList.remove("active-mode");
  }
}
//first shade ot dark background color
function switchBg1(tag) {
  if (mode === "dark") {
    tag.classList.add("dark--bg1");
  } else {
    tag.classList.remove("dark--bg1");
  }
}

//second shade of dark background color
function switchBg2(tag) {
  if (mode === "dark") {
    tag.classList.add("dark--bg2");
  } else {
    tag.classList.remove("dark--bg2");
  }
}

//setting state to current

function setCurrent() {
  //setting the content and detail page to it's current state
  currentData ? createContent(currentData) : createContent(objects);
  currentDetail ? setDetails(currentDetail) : null;
}
