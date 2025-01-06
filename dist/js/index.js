"use strict";
const navbarToggleBtn = (document.querySelector(".navbar-toggler"));
navbarToggleBtn.addEventListener("click", function () {
    if (!this.classList.contains("collapsed")) {
        document.querySelector(".fa-bars").style.display = "none";
        document.querySelector(".fa-xmark").style.display =
            "block";
    }
    else {
        document.querySelector(".fa-bars").style.display = "block";
        document.querySelector(".fa-xmark").style.display = "none";
    }
});
const navbarItems = (document.querySelectorAll(".nav-item a"));
navbarItems.forEach((item) => {
    item.addEventListener("click", () => {
        navbarToggleBtn.classList.add("collapsed");
    });
});
document.querySelectorAll(".navbar .nav-link").forEach((item) => {
    item.addEventListener("click", (e) => {
        document.querySelectorAll(".navbar .nav-link").forEach((item) => {
            item.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
    });
});
let navbarNav = document.querySelector(".navbar-nav");
let navbarProgress = document.querySelector(".navbar-progress");
let navbarLogo = document.querySelector(".navbar-brand");
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
let navbarProgressHeight = 90 + navbarNav.childElementCount * 46;
let navbarLogoTranslation = navbarProgressHeight - 70;
window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop;
    navbarProgress.style.width = `${(scrollTop / height) * 100}%`;
    if (navbarToggleBtn.getAttribute("aria-expanded") === "true") {
        navbarProgress.style.height = `${navbarProgressHeight}px`;
    }
    else {
        navbarProgress.style.height = "66px";
    }
});
navbarToggleBtn.addEventListener("click", () => {
    if (navbarToggleBtn.getAttribute("aria-expanded") === "true") {
        navbarLogo.style.animation =
            "logo-up-down 5s ease-in-out infinite alternate";
        navbarLogo.style.setProperty("--translate-y", navbarLogoTranslation + "px");
    }
    else {
        navbarLogo.style.animation = "none 0s";
        navbarLogo.style.setProperty("--translate-y", "0");
    }
});
const upBtn = document.createElement("span");
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
const generateBtn = document.querySelector(".generate-btn");
const autoBtn = document.querySelector(".auto-btn");
const stopBtn = document.querySelector(".stop-btn");
const quoteDisplay = document.querySelector(".quote-text");
const quoteSpeaker = document.querySelector(".quote-speaker");
const quoteId = document.querySelector(".quote-id");
const autoStatus = document.querySelector(".auto-status");
let autoGeneration;
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
const convertBtn = document.querySelector(".convert-btn");
async function currencyConvert() {
    let currencyAmount = document.querySelector(".amount").value;
    const currencyFrom = document.querySelector(".from")
        .value;
    const currencyTo = document.querySelector(".to").value;
    const currencyResult = (document.querySelector(".currency-result"));
    async function fetchCurrencies() {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/cb189adbeb816b7c66b93717/latest/${currencyFrom}`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.log(`Error : ${error}`);
        }
    }
    try {
        const currencyData = await fetchCurrencies();
        const currencyRate = await currencyData.conversion_rates[currencyTo];
        if (currencyAmount && currencyFrom && currencyTo) {
            const resultAmount = (currencyRate * currencyAmount).toFixed(2);
            currencyResult.innerHTML = `${currencyAmount} ${currencyFrom} = ${resultAmount} ${currencyTo}`;
            document.querySelector(".amount").value = "";
        }
        else {
            currencyResult.innerHTML = "Please Fill All Fields";
        }
    }
    catch (error) {
        console.log(`Error : ${error}`);
    }
}
convertBtn.addEventListener("click", currencyConvert);
const newsCount = 6;
const apiKey = "2ab4a103569327a8273c87936585c129";
const url = `https://gnews.io/api/v4/search?q=arab&lang=en&country=any&max=${newsCount}&apikey=${apiKey}`;
async function fetchNewsData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    }
    catch (error) {
        console.log(`Error : ${error}`);
    }
}
async function displayNews() {
    const newsList = document.querySelector(".news-list");
    try {
        const newsArticles = await fetchNewsData();
        newsArticles.forEach((article) => {
            const newsBox = document.createElement("li");
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
                    <span class="fw-normal fst-italic"> 
                      <a
                    class="website"
                    href="${article.source.url}"
                    target="_blank"
                    > ${article.source.name}</a
                  >
                     </span>
                      <span class="publish-date">${new Date(article.publishedAt)
                .toISOString()
                .split("T")[0]}</span>
                </div>
                </div>
              </div>`;
        });
    }
    catch (error) {
        console.log(`Error : ${error}`);
    }
}
window.addEventListener("load", displayNews);
const todayDate = new Date();
const adjustedTodayDate = new Date().toISOString().split("T")[0];
const tomorrowDate = new Date(todayDate);
tomorrowDate.setDate(todayDate.getDate() + 1);
const adjustedTomorrowDate = tomorrowDate.toISOString().split("T")[0];
const eventDate = document.querySelector(".event-date");
window.addEventListener("load", () => {
    eventDate.min = adjustedTomorrowDate;
    eventDate.addEventListener("input", () => {
        eventDate.value < adjustedTomorrowDate
            ? (eventDate.value = adjustedTomorrowDate)
            : false;
    });
});
function addEvent() {
    const eventName = document.querySelector(".event-name")
        .value;
    const eventOrganizer = document.querySelector(".event-organizer").value;
    let eventDate = document.querySelector(".event-date")
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
        const allInputs = (document.querySelectorAll(".event-display input"));
        allInputs.forEach((input) => {
            input.value = "";
        });
        displayEvents();
    }
    else {
        Swal.fire({
            text: "Please Fill All Fields",
            icon: "question",
        });
    }
}
const eventAddBtn = (document.querySelector(".event-display .add-btn"));
eventAddBtn.addEventListener("click", addEvent);
function displayEvents() {
    const allEvents = JSON.parse(localStorage.getItem("allEvents")) || [];
    const eventsList = document.querySelector(".events-list");
    eventsList.innerHTML = "";
    allEvents.forEach((newEvent, index) => {
        let currentTime = new Date().getTime();
        let timeLeft = newEvent.timeStamp - currentTime;
        let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
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
    });
}
setInterval(displayEvents, 1000);
function deleteEvent(index) {
    const allEvents = JSON.parse(localStorage.getItem("allEvents"));
    allEvents.splice(index, 1);
    localStorage.setItem("allEvents", JSON.stringify(allEvents));
    displayEvents();
}
const chooseCtgry = (document.querySelector(".choose-category"));
const chosenCtgryName = (document.querySelector(".chosen-category-name"));
const addBkmrkBtn = (document.querySelector(".bookmark-manager .add-btn"));
const ctgryTabs = document.querySelector(".category-tabs");
const chosenCtgryTab = (document.querySelector(".chosen-category-tab"));
const bkmrkList = document.querySelector(".bookmark-list");
const deleteBkmrkBtn = (document.querySelector(".delete-bookmark-btn"));
let allChosenCtgryTabs = (document.querySelectorAll(".chosen-category-tab"));
let allBkmrkItems = (document.querySelectorAll(".bookmark-item"));
function addBookmark() {
    const bkmrkTitle = document.querySelector(".bookmark-title").value.trim();
    const bkmrkUrl = (document.querySelector(".bookmark-url")).value.trim();
    const bkmrkCtgry = (document.querySelector(".bookmark-category")).value.trim();
    if (!bkmrkTitle || !bkmrkUrl || !bkmrkCtgry) {
        Swal.fire({
            text: "Please Fill All Fields",
            icon: "question",
        });
    }
    else {
        const allBookmarks = JSON.parse(localStorage.getItem("allBookmarks")) || {};
        if (!allBookmarks[bkmrkCtgry])
            allBookmarks[bkmrkCtgry] = [];
        const newBookmark = {
            title: bkmrkTitle,
            url: bkmrkUrl,
        };
        allBookmarks[bkmrkCtgry].push(newBookmark);
        localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
        const allBkmrkInputs = (document.querySelectorAll(".bookmark-display input"));
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
        allBookmarks[bkmrkCtgry].forEach((newBookmark, index) => {
            const bkmrkItem = document.createElement("li");
            bkmrkItem.classList.add("bookmark-item", "all", `category-${bkmrkCtgry}`, "px-3", "py-2", "align-items-center", "justify-content-between", "rounded", "mb-2");
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
        });
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
    const allChosenCtgryNames = (document.querySelectorAll(".chosen-category-name"));
    allChosenCtgryNames.forEach((item) => {
        item.addEventListener("click", () => {
            document.querySelector(".bookmark-category").value =
                item.innerHTML;
        });
    });
}
function createChooseCategory() {
    const allBookmarks = JSON.parse(localStorage.getItem("allBookmarks")) || {};
    chooseCtgry.innerHTML = "";
    Object.keys(allBookmarks).forEach((bkmrkCtgry) => {
        const chosenCtgryName = document.createElement("li");
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
        const chosenCtgryTab = document.createElement("li");
        chosenCtgryTab.classList.add("chosen-category-tab", "active", "btn", "rounded");
        chosenCtgryTab.setAttribute("data-cat", `.category-${bkmrkCtgry}`);
        chosenCtgryTab.innerHTML = `${bkmrkCtgry}`;
        ctgryTabs.appendChild(chosenCtgryTab);
    });
    if (ctgryTabs.childElementCount == 0) {
        ctgryTabs.innerHTML = "No Categories";
    }
    if (ctgryTabs.childElementCount == 0) {
        document.querySelector(".all-chosen-category-tab").style.display = "none";
    }
    else {
        document.querySelector(".all-chosen-category-tab").style.display = "block";
    }
}
function hideShowBookmarks() {
    let allChosenCtgryTabs = (document.querySelectorAll(".chosen-category-tab"));
    let allBkmrkItems = (document.querySelectorAll(".bookmark-item"));
    let showAllBtn = (document.querySelector(".all-chosen-category-tab"));
    allChosenCtgryTabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
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
function deleteBookmark(bkmrkCtgry, index) {
    const allBookmarks = JSON.parse(localStorage.getItem("allBookmarks")) || {};
    allBookmarks[bkmrkCtgry].splice(index, 1);
    if (allBookmarks[bkmrkCtgry].length == 0)
        delete allBookmarks[bkmrkCtgry];
    localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
    displayBookmarks();
}
let pwCharacterPool = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%^&*()-_=+[]|;:,<.>?`;
let lettersOnlyPool = pwCharacterPool.match(/[A-Za-z]/gi);
let lettersCharPool = pwCharacterPool.match(/\D/gi);
let lettersNumbersPool = pwCharacterPool.match(/[A-Za-z0-9]/gi);
const pwGenerateBtn = (document.querySelector(".pw-generate-btn"));
let pwInput = document.querySelector(".pw-length");
const pwErrorMessage = (document.querySelector(".pw-error-message"));
const numbersCheckbox = document.querySelector("#opt-number");
const spCharCheckbox = (document.querySelector("#opt-sp-character"));
const pwResult = document.querySelector(".pw-result");
const pwList = document.querySelector(".pw-list");
const pwListSelect = (document.querySelector(".pw-list-count"));
function pwLengthValidation() {
    let pwLength = document.querySelector(".pw-length")
        .value;
    if (pwLength < 8) {
        pwErrorMessage.style.display = "block";
        pwErrorMessage.innerHTML = "Too Short";
        setTimeout(() => {
            pwErrorMessage.style.display = "none";
        }, 3000);
    }
    else if (pwLength > 32) {
        pwErrorMessage.style.display = "block";
        pwErrorMessage.innerHTML = "Too Long";
        setTimeout(() => {
            pwErrorMessage.style.display = "none";
        }, 3000);
    }
    else {
        pwErrorMessage.style.display = "none";
    }
}
function generatePassword() {
    let pwLength = document.querySelector(".pw-length")
        .value;
    pwResult.innerHTML = "";
    if (pwLength < 8 || pwLength > 32) {
        pwLengthValidation();
    }
    else {
        if (!numbersCheckbox.checked && !spCharCheckbox.checked) {
            for (let i = 0; i < pwLength; i++) {
                pwResult.innerHTML +=
                    lettersOnlyPool[Math.floor(Math.random() * lettersOnlyPool.length)];
            }
        }
        else if (numbersCheckbox.checked && !spCharCheckbox.checked) {
            for (let i = 0; i < pwLength; i++) {
                pwResult.innerHTML +=
                    lettersNumbersPool[Math.floor(Math.random() * lettersNumbersPool.length)];
            }
        }
        else if (!numbersCheckbox.checked && spCharCheckbox.checked) {
            for (let i = 0; i < pwLength; i++) {
                pwResult.innerHTML +=
                    lettersCharPool[Math.floor(Math.random() * lettersCharPool.length)];
            }
        }
        else {
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
    const pwItemsCount = pwListSelect.value;
    const allPasswords = JSON.parse(localStorage.getItem("allPasswords")) || [];
    if (allPasswords.length == 0) {
        pwList.innerHTML = "";
        const pwItem = document.createElement("li");
        pwItem.classList.add("pw-item", "px-3", "py-2", "text-center", "rounded");
        pwItem.innerHTML = "Empty";
        pwList.appendChild(pwItem);
    }
    else {
        pwList.innerHTML = "";
        let i = 0;
        while (i < allPasswords.length && i < pwItemsCount) {
            const pwItem = document.createElement("li");
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
        const pwItem = document.createElement("li");
        pwItem.classList.add("pw-item", "px-3", "py-2", "text-center", "rounded");
        pwItem.innerHTML = "Empty";
        pwList.appendChild(pwItem);
    }
    pwResult.innerHTML = "";
}
const deleteAllPW = document.querySelector(".delete-all-pw");
deleteAllPW.addEventListener("click", clearPwList);
//# sourceMappingURL=index.js.map