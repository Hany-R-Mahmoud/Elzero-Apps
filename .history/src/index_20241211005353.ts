declare var Swal: any;

/* Start Navbar Toggler */
const navbarToggleBtn = <HTMLButtonElement>(
  document.querySelector(".navbar-toggler")
);
navbarToggleBtn.addEventListener("click", function () {
  if (!this.classList.contains("collapsed")) {
    (document.querySelector(".fa-bars") as HTMLElement).style.display = "none";
    (document.querySelector(".fa-xmark") as HTMLElement).style.display =
      "block";
  } else {
    (document.querySelector(".fa-bars") as HTMLElement).style.display = "block";
    (document.querySelector(".fa-xmark") as HTMLElement).style.display = "none";
  }
});

// Navbar active items
document.querySelectorAll(".navbar .nav-link").forEach((item) => {
  item.addEventListener("click", (e: any) => {
    document.querySelectorAll(".navbar .nav-link").forEach((item) => {
      item.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});
/* End Navbar Toggler */

/* Start Navbar progress fill */

let navbarNav = document.querySelector(".navbar-nav");
let navbarProgress = <HTMLDivElement>document.querySelector(".navbar-progress");
let navbarLogo = <HTMLAnchorElement>document.querySelector(".navbar-brand");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
let navbarProgressHeight = 90 + navbarNav.childElementCount * 40;
let navbarLogoTranslation = navbarProgressHeight - 70;
window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  navbarProgress.style.width = `${(scrollTop / height) * 100}%`;
  if (navbarToggleBtn.getAttribute("aria-expanded") === "true") {
    navbarProgress.style.height = `${navbarProgressHeight}px`;
  } else {
    navbarProgress.style.height = "66px";
  }
});
navbarToggleBtn.addEventListener("click", () => {
  if (navbarToggleBtn.getAttribute("aria-expanded") === "true") {
    navbarLogo.style.animation =
      "logo-up-down 5s ease-in-out infinite alternate";
    navbarLogo.style.setProperty("--translate-y", navbarLogoTranslation + "px");
  } else {
    navbarLogo.style.animation = "none 0s";
    navbarLogo.style.setProperty("--translate-y", "0");
  }
});

/* End Navbar progress fill */

/* Start Up button */
const upBtn = <HTMLElement>document.createElement("span");
upBtn.className = "up-button";
upBtn.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
document.body.appendChild(upBtn);
window.onscroll = function () {
  this.scrollY > 1000
    ? (upBtn.style.bottom = "2rem")
    : (upBtn.style.bottom = "-2rem");
};
upBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
/* End Up button */

/* Random Quote Generator */
const generateBtn = <HTMLButtonElement>document.querySelector(".generate-btn");
const autoBtn = <HTMLButtonElement>document.querySelector(".auto-btn");
const stopBtn = <HTMLButtonElement>document.querySelector(".stop-btn");
const quoteDisplay = <HTMLDivElement>document.querySelector(".quote-text");
const quoteSpeaker = <HTMLDivElement>document.querySelector(".quote-speaker");
const quoteId = <HTMLDivElement>document.querySelector(".quote-id");
const autoStatus = <HTMLDivElement>document.querySelector(".auto-status");
let autoGeneration: any;
async function fetchQuotes() {
  const response = await fetch("../src/new-arabic-quotes.json");
  const fetchedData = await response.json();
  return fetchedData;
}
async function generateQuotes() {
  const myQuotes = await fetchQuotes();
  const randomQuote = myQuotes[Math.floor(Math.random() * myQuotes.length)];

  quoteDisplay.textContent = randomQuote.text;
  quoteSpeaker.textContent = randomQuote.speaker;
  quoteId.innerHTML = randomQuote.id;
}
generateBtn.addEventListener("click", generateQuotes);
autoBtn.addEventListener("click", () => {
  autoGeneration = setInterval(generateQuotes, 5000);

  autoStatus.innerHTML = "Auto : On";
});

window.addEventListener("load", () => {
  autoGeneration = setInterval(generateQuotes, 5000);

  autoStatus.innerHTML = "Auto : On";
});
stopBtn.addEventListener("click", () => {
  clearInterval(autoGeneration);
  autoStatus.innerHTML = "Auto : Off";
});
/* End Random Quote Generator */

/* Start Currency Converter */
const convertBtn = <HTMLButtonElement>document.querySelector(".convert-btn");
async function currencyConvert() {
  let currencyAmount: any = (
    document.querySelector(".amount") as HTMLInputElement
  ).value;
  const currencyFrom = (document.querySelector(".from") as HTMLSelectElement)
    .value;
  const currencyTo = (document.querySelector(".to") as HTMLSelectElement).value;
  const currencyResult = <HTMLDivElement>(
    document.querySelector(".currency-result")
  );
  async function fetchCurrencies() {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/cb189adbeb816b7c66b93717/latest/${currencyFrom}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  }
  try {
    const currencyData = await fetchCurrencies();
    const currencyRate = await currencyData.conversion_rates[currencyTo];
    if (currencyAmount && currencyFrom && currencyTo) {
      const resultAmount = (currencyRate * currencyAmount).toFixed(2);
      currencyResult.innerHTML = `${currencyAmount} ${currencyFrom} = ${resultAmount} ${currencyTo}`;
      (document.querySelector(".amount") as HTMLInputElement).value = "";
    } else {
      currencyResult.innerHTML = "Please Fill All Fields";
    }
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}
convertBtn.addEventListener("click", currencyConvert);
/* End Currency Converter */

/* Start Fetch News  */
const newsCount: number = 12;
const apiKey = "2ab4a103569327a8273c87936585c129";
const url = `https://gnews.io/api/v4/search?q=culture&lang=en&country=any&max=${newsCount}&apikey=${apiKey}`;

async function fetchNewsData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

async function displayNews() {
  const newsList = <HTMLUListElement>document.querySelector(".news-list");
  try {
    const newsArticles = await fetchNewsData();
    newsArticles.forEach((article: any) => {
      const newsBox = <HTMLLIElement>document.createElement("li");
      newsBox.classList.add("col-lg-4", "col-md-6", "py-1", "d-flex");
      newsList.appendChild(newsBox);
      newsBox.innerHTML = `<div class="card text-start  ">
                <img
                  src="${article.image}"
                  class="card-img-top"
                  alt="${article.title}"
                />
                <div class="card-body d-flex  flex-column justify-content-between ">
                  <a
                    class="text-decoration-none"
                    href="${article.url}"
                    target="_blank"
                    >${article.title}</a
                  >
                  <p class="description">
                    ${article.description}
                  </p>
                <div class="card-footer px-1 d-flex flex-column justify-content-between ">
                    <span class="author fw-bold"
                      >By<span class="fw-normal fst-italic">${
                        article.source.name
                      }</span></span
                    >
                      <span class="publish-date">${
                        new Date(article.publishedAt)
                          .toISOString()
                          .split("T")[0]
                      }</span>
                  <div class="card-bottom d-flex justify-content-start
                 gap-3">
                    <span class="fw-bold">Website</span>
                    <span class="source fst-italic">
                    <a
                    class=""
                    href="${article.source.url}"
                    target="_blank"
                    >${article.source.url}</a
                  >
                    </span>
                  </div>
                </div>
                </div>
              </div>`;
    });
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}
window.addEventListener("load", displayNews);
/* End Fetch News  */

/* Start Event Manager */
const todayDate = new Date();
const adjustedTodayDate = new Date().toISOString().split("T")[0];
const tomorrowDate = new Date(todayDate);
tomorrowDate.setDate(todayDate.getDate() + 1);
const adjustedTomorrowDate = tomorrowDate.toISOString().split("T")[0];
const eventDate = <HTMLInputElement>document.querySelector(".event-date");

window.addEventListener("load", (): void => {
  eventDate.min = adjustedTomorrowDate;
  eventDate.addEventListener("input", () => {
    eventDate.value < adjustedTomorrowDate
      ? (eventDate.value = adjustedTomorrowDate)
      : false;
  });
});

function addEvent() {
  const eventName = (document.querySelector(".event-name") as HTMLInputElement)
    .value;
  const eventOrganizer = (
    document.querySelector(".event-organizer") as HTMLInputElement
  ).value;
  let eventDate = (document.querySelector(".event-date") as HTMLInputElement)
    .value;

  if (eventName && eventOrganizer && eventDate) {
    const eventTimeStamp = new Date(eventDate).getTime();
    const newEvent = {
      name: eventName,
      organizer: eventOrganizer,
      date: eventDate,
      timeStamp: eventTimeStamp,
    };
    const allEvents = JSON.parse(localStorage.getItem("allEvents")) || [];
    allEvents.push(newEvent);
    localStorage.setItem("allEvents", JSON.stringify(allEvents));
    const allInputs = <NodeListOf<HTMLInputElement>>(
      document.querySelectorAll(".event-display input")
    );
    allInputs.forEach((input) => {
      input.value = "";
    });
    displayEvents();
  } else {
    Swal.fire({
      text: "Please Fill All Fields",
      icon: "question",
    });
  }
}
const eventAddBtn = <HTMLButtonElement>(
  document.querySelector(".event-display .add-btn")
);
eventAddBtn.addEventListener("click", addEvent);

function displayEvents() {
  const allEvents = JSON.parse(localStorage.getItem("allEvents")) || [];
  const eventsList = <HTMLUListElement>document.querySelector(".events-list");
  eventsList.innerHTML = "";
  allEvents.forEach(
    (
      newEvent: { name: string; organizer: string; date: any; timeStamp: any },
      index: number
    ) => {
      let currentTime = new Date().getTime();
      let timeLeft = newEvent.timeStamp - currentTime;

      let daysLeft: number | string = Math.floor(
        timeLeft / (1000 * 60 * 60 * 24)
      );
      let hoursLeft: number | string = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutesLeft: number | string = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
      );
      let secondsLeft: number | string = Math.floor(
        (timeLeft % (1000 * 60)) / 1000
      );
      daysLeft < 10 ? (daysLeft = "0" + daysLeft) : daysLeft;
      hoursLeft < 10 ? (hoursLeft = "0" + hoursLeft) : hoursLeft;
      minutesLeft < 10 ? (minutesLeft = "0" + minutesLeft) : minutesLeft;
      secondsLeft < 10 ? (secondsLeft = "0" + secondsLeft) : secondsLeft;
      let countDown = `${daysLeft} : ${hoursLeft} : ${minutesLeft} : ${secondsLeft}`;

      eventsList.innerHTML += `
                <li class="added-event col-lg-4 col-md-6 mb-2">
                    <div class="event-box card p-3 border-0 ">
                      <h3 class="text-capitalize">${newEvent.name}</h3>
                      <p class="d-flex justify-content-between text-capitalize">Organizer<span>${newEvent.organizer}</span> </p>
                      <p class="d-flex justify-content-between">Date<span>${newEvent.date}</span></p>
                      <p class="d-flex justify-content-between">Time Left<span class="time-left">${countDown}</span></p>
                      <button class="delete-btn btn rounded btn-danger" onclick="deleteEvent(${index})">Delete</button>
                    </div>
                  </li>
                `;
    }
  );
}
// displayEvents();
setInterval(displayEvents, 1000);

function deleteEvent(index: number) {
  const allEvents = JSON.parse(localStorage.getItem("allEvents"));
  allEvents.splice(index, 1);
  localStorage.setItem("allEvents", JSON.stringify(allEvents));
  displayEvents();
}

/* End Event Manager */

/* Start Bookmark Manager */

const chooseCtgry = <HTMLUListElement>(
  document.querySelector(".choose-category")
);
const chosenCtgryName = <HTMLLIElement>(
  document.querySelector(".chosen-category-name")
);
const addBkmrkBtn = <HTMLButtonElement>(
  document.querySelector(".bookmark-manager .add-btn")
);
const ctgryTabs = <HTMLUListElement>document.querySelector(".category-tabs");
const chosenCtgryTab = <HTMLLIElement>(
  document.querySelector(".chosen-category-tab")
);
const bkmrkList = <HTMLUListElement>document.querySelector(".bookmark-list");

const deleteBkmrkBtn = <HTMLButtonElement>(
  document.querySelector(".delete-bookmark-btn")
);
let allChosenCtgryTabs = <NodeListOf<HTMLLIElement>>(
  document.querySelectorAll(".chosen-category-tab")
);
let allBkmrkItems = <NodeListOf<HTMLLIElement>>(
  document.querySelectorAll(".bookmark-item")
);

function addBookmark() {
  const bkmrkTitle = (
    document.querySelector(".bookmark-title") as HTMLInputElement
  ).value.trim();
  const bkmrkUrl = (<HTMLInputElement>(
    document.querySelector(".bookmark-url")
  )).value.trim();
  const bkmrkCtgry = (<HTMLInputElement>(
    document.querySelector(".bookmark-category")
  )).value.trim();
  if (!bkmrkTitle || !bkmrkUrl || !bkmrkCtgry) {
    Swal.fire({
      text: "Please Fill All Fields",
      icon: "question",
    });
  } else {
    const allBookmarks = JSON.parse(localStorage.getItem("allBookmarks")) || {};
    if (!allBookmarks[bkmrkCtgry]) allBookmarks[bkmrkCtgry] = [];
    const newBookmark = {
      title: bkmrkTitle,
      url: bkmrkUrl,
    };
    allBookmarks[bkmrkCtgry].push(newBookmark);
    localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));

    const allBkmrkInputs = <NodeListOf<HTMLInputElement>>(
      document.querySelectorAll(".bookmark-display input")
    );
    allBkmrkInputs.forEach((input) => {
      input.value = "";
    });
    displayBookmarks();
  }
}

function displayBookmarks() {
  bkmrkList.innerHTML = "";
  const allBookmarks = JSON.parse(localStorage.getItem("allBookmarks")) || {};

  for (const bkmrkCtgry in allBookmarks) {
    allBookmarks[bkmrkCtgry].forEach(
      (newBookmark: { url: any; title: any }, index: any) => {
        const bkmrkItem = <HTMLLIElement>document.createElement("li");
        bkmrkItem.classList.add(
          "bookmark-item",
          "all",
          `category-${bkmrkCtgry}`,
          "px-3",
          "py-2",
          "align-items-center",
          "justify-content-between",
          "rounded",
          "mb-2"
        );
        bkmrkItem.innerHTML = `
                        <a class="show-bookmark-title text-decoration-none" target="_blank" href="${newBookmark.url}"
                        >${newBookmark.title}</a>
                        <span class="show-category-name rounded">${bkmrkCtgry}</span>
                      <button class="delete-bookmark-btn btn btn-danger rounded"
                      onclick="deleteBookmark('${bkmrkCtgry}' ,${index})">
                        Delete
                      </button>
                    `;
        bkmrkList.appendChild(bkmrkItem);
      }
    );
  }
  if (bkmrkList.childElementCount == 0) {
    bkmrkList.innerHTML = "No Bookmarks";
  }
  createChooseCategory();
  filterCategory();
  hideShowBookmarks();
  chooseCategoryName();
}
displayBookmarks();

function chooseCategoryName() {
  const allChosenCtgryNames = <NodeListOf<HTMLLIElement>>(
    document.querySelectorAll(".chosen-category-name")
  );
  allChosenCtgryNames.forEach((item) => {
    item.addEventListener("click", () => {
      (<HTMLInputElement>document.querySelector(".bookmark-category")).value =
        item.innerHTML;
    });
  });
}

function createChooseCategory() {
  const allBookmarks = JSON.parse(localStorage.getItem("allBookmarks")) || {};
  chooseCtgry.innerHTML = "";
  Object.keys(allBookmarks).forEach((bkmrkCtgry) => {
    const chosenCtgryName = <HTMLLIElement>document.createElement("li");
    chosenCtgryName.classList.add("chosen-category-name", "btn", "rounded");
    chosenCtgryName.innerHTML = `${bkmrkCtgry}`;
    chooseCtgry.appendChild(chosenCtgryName);
  });
  if (chooseCtgry.childElementCount == 0) {
    chooseCtgry.innerHTML = "No Categories";
  }
}
function filterCategory() {
  const allBookmarks = JSON.parse(localStorage.getItem("allBookmarks")) || {};
  ctgryTabs.innerHTML = "";
  Object.keys(allBookmarks).forEach((bkmrkCtgry) => {
    const chosenCtgryTab = <HTMLLIElement>document.createElement("li");
    chosenCtgryTab.classList.add(
      "chosen-category-tab",
      "active",
      "btn",
      "rounded"
    );
    chosenCtgryTab.setAttribute("data-cat", `.category-${bkmrkCtgry}`);
    chosenCtgryTab.innerHTML = `${bkmrkCtgry}`;
    ctgryTabs.appendChild(chosenCtgryTab);
  });
  if (ctgryTabs.childElementCount == 0) {
    ctgryTabs.innerHTML = "No Categories";
  }
  if (ctgryTabs.childElementCount == 0) {
    (
      document.querySelector(".all-chosen-category-tab") as HTMLSpanElement
    ).style.display = "none";
  } else {
    (
      document.querySelector(".all-chosen-category-tab") as HTMLSpanElement
    ).style.display = "block";
  }
}

function hideShowBookmarks() {
  let allChosenCtgryTabs = <NodeListOf<HTMLLIElement>>(
    document.querySelectorAll(".chosen-category-tab")
  );
  let allBkmrkItems = <NodeListOf<HTMLLIElement>>(
    document.querySelectorAll(".bookmark-item")
  );
  let showAllBtn = <HTMLSpanElement>(
    document.querySelector(".all-chosen-category-tab")
  );
  allChosenCtgryTabs.forEach((tab) => {
    tab.addEventListener("click", (e: any) => {
      allChosenCtgryTabs.forEach((li) => {
        li.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      allBkmrkItems.forEach((item) => {
        item.style.display = "none";
      });

      document.querySelectorAll(e.currentTarget.dataset.cat).forEach((item) => {
        item.style.display = "flex";
      });
    });
  });
  showAllBtn.addEventListener("click", () => {
    allBkmrkItems.forEach((item) => {
      item.style.display = "flex";
    });
    allChosenCtgryTabs.forEach((tab) => {
      tab.classList.add("active");
    });
  });
}

function deleteBookmark(bkmrkCtgry: string | number, index: number) {
  const allBookmarks = JSON.parse(localStorage.getItem("allBookmarks")) || {};
  allBookmarks[bkmrkCtgry].splice(index, 1);
  if (allBookmarks[bkmrkCtgry].length == 0) delete allBookmarks[bkmrkCtgry];

  localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));

  displayBookmarks();
}

/* End Bookmark Manager */

/* Start Password Generator */
let pwCharacterPool = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%^&*()-_=+[]|;:,<.>?`;
let lettersOnlyPool = pwCharacterPool.match(/[A-Za-z]/gi);
let lettersCharPool = pwCharacterPool.match(/\D/gi);
let lettersNumbersPool = pwCharacterPool.match(/[A-Za-z0-9]/gi);
const pwGenerateBtn = <HTMLButtonElement>(
  document.querySelector(".pw-generate-btn")
);
let pwInput = <HTMLInputElement>document.querySelector(".pw-length");
const pwErrorMessage = <HTMLSpanElement>(
  document.querySelector(".pw-error-message")
);
const numbersCheckbox = <HTMLInputElement>document.querySelector("#opt-number");
const spCharCheckbox = <HTMLInputElement>(
  document.querySelector("#opt-sp-character")
);
const pwResult = <HTMLDivElement>document.querySelector(".pw-result");
const pwList = <HTMLUListElement>document.querySelector(".pw-list");
const pwListSelect = <HTMLSelectElement>(
  document.querySelector(".pw-list-count")
);
function pwLengthValidation() {
  let pwLength: any = (document.querySelector(".pw-length") as HTMLInputElement)
    .value;
  if (pwLength < 8) {
    pwErrorMessage.style.display = "block";
    pwErrorMessage.innerHTML = "Too Short";

    setTimeout(() => {
      pwErrorMessage.style.display = "none";
    }, 3000);
  } else if (pwLength > 32) {
    pwErrorMessage.style.display = "block";
    pwErrorMessage.innerHTML = "Too Long";
    setTimeout(() => {
      pwErrorMessage.style.display = "none";
    }, 3000);
  } else {
    pwErrorMessage.style.display = "none";
  }
}

function generatePassword() {
  let pwLength: any = (document.querySelector(".pw-length") as HTMLInputElement)
    .value;
  pwResult.innerHTML = "";
  if (pwLength < 8 || pwLength > 32) {
    pwLengthValidation();
  } else {
    if (!numbersCheckbox.checked && !spCharCheckbox.checked) {
      for (let i = 0; i < pwLength; i++) {
        pwResult.innerHTML +=
          lettersOnlyPool[Math.floor(Math.random() * lettersOnlyPool.length)];
      }
    } else if (numbersCheckbox.checked && !spCharCheckbox.checked) {
      for (let i = 0; i < pwLength; i++) {
        pwResult.innerHTML +=
          lettersNumbersPool[
            Math.floor(Math.random() * lettersNumbersPool.length)
          ];
      }
    } else if (!numbersCheckbox.checked && spCharCheckbox.checked) {
      for (let i = 0; i < pwLength; i++) {
        pwResult.innerHTML +=
          lettersCharPool[Math.floor(Math.random() * lettersCharPool.length)];
      }
    } else {
      for (let i = 0; i < pwLength; i++) {
        pwResult.innerHTML +=
          pwCharacterPool[Math.floor(Math.random() * pwCharacterPool.length)];
      }
    }
  }
  setTimeout(() => {
    pwInput.value = "";
  }, 1500);

  const allPasswords = JSON.parse(localStorage.getItem("allPasswords")) || [];
  if (pwResult.innerHTML != "") {
    allPasswords.unshift(pwResult.innerHTML);
    localStorage.setItem("allPasswords", JSON.stringify(allPasswords));
  }

  displayPasswords();
}
pwGenerateBtn.addEventListener("click", generatePassword);

function displayPasswords() {
  const pwItemsCount: any = pwListSelect.value;
  const allPasswords = JSON.parse(localStorage.getItem("allPasswords")) || [];
  if (allPasswords.length == 0) {
    pwList.innerHTML = "";
    const pwItem = <HTMLLIElement>document.createElement("li");
    pwItem.classList.add("pw-item", "px-3", "py-2", "text-center", "rounded");
    pwItem.innerHTML = "Empty";
    pwList.appendChild(pwItem);
  } else {
    pwList.innerHTML = "";
    let i = 0;
    while (i < allPasswords.length && i < pwItemsCount) {
      const pwItem = <HTMLLIElement>document.createElement("li");
      pwItem.classList.add("pw-item", "px-3", "py-2", "text-center", "rounded");
      pwItem.innerHTML = allPasswords[i];
      pwList.appendChild(pwItem);
      i++;
    }
  }
}
displayPasswords();

pwListSelect.addEventListener("change", displayPasswords);

function clearPwList() {
  const allPasswords = JSON.parse(localStorage.getItem("allPasswords")) || [];
  if (allPasswords) {
    localStorage.removeItem("allPasswords");
    pwList.innerHTML = "";
    const pwItem = <HTMLLIElement>document.createElement("li");
    pwItem.classList.add("pw-item", "px-3", "py-2", "text-center", "rounded");
    pwItem.innerHTML = "Empty";
    pwList.appendChild(pwItem);
  }

  pwResult.innerHTML = "";
}
const deleteAllPW = <HTMLButtonElement>document.querySelector(".delete-all-pw");
deleteAllPW.addEventListener("click", clearPwList);

/* End Password Generator */
