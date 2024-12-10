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
);

/* End Navbar Toggler */
/* Start Navbar progress fill */

let navbarProgress = <HTMLDivElement>document.querySelector(".navbar-progress");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  navbarProgress.style.width = `${(scrollTop / height) * 100}%`;
});
console.log(navbarToggleBtn)
console.log(navbarToggleBtn.getAttribute("aria-expanded"))

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
  const response = await fetch("../arabic-quotes.json");
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
stopBtn.addEventListener("click", () => {
  clearInterval(autoGeneration);
  autoStatus.innerHTML = "Auto : Off";
});

/* End Random Quote Generator */

/* Start Currency Converter */
const convertBtn = <HTMLButtonElement>document.querySelector(".convert-btn");

async function currencyConvert() {
  const currencyAmount: any = (
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
// const newsCount: number = 12;
// let newsUrl =
//   "https://newsapi.org/v2/everything?" +
//   "q=islam&" +
//   "from=2024-11-25&" +
//   "sortBy=popularity&" +
//   "language=en&" +
//   `pageSize=${newsCount}&` +
//   "apiKey=ccc9007e07554296924795f8ff376b36";

// async function fetchNewsData() {
//   try {
//     const response = await fetch(newsUrl);
//     const data = await response.json();
//     return data.articles;
//   } catch (error) {
//     console.log(`Error : ${error}`);
//   }
// }

// async function displayNews() {
//   const newsList = <HTMLUListElement>document.querySelector(".news-list");
//   try {
//     const newsArticles = await fetchNewsData();
//     newsArticles.forEach((article: any) => {
//       const newsBox = <HTMLLIElement>document.createElement("li");
//       newsBox.classList.add("col-lg-4", "col-md-6", "py-1", "d-flex");
//       newsList.appendChild(newsBox);
//       newsBox.innerHTML = `<div class="card text-start  ">
//                 <img
//                   src="${article.urlToImage}"
//                   class="card-img-top"
//                   alt="${article.title}"
//                 />
//                 <div class="card-body">
//                   <a
//                     class="text-decoration-none"
//                     href="${article.url}"
//                     target="_blank"
//                     >${article.title}</a
//                   >
//                   <p class="description">
//                     ${article.description}
//                   </p>
//                   <div class="card-author d-flex flex-column justify-content-between">
//                     <span class="author fw-bold"
//                       >By : <span class="fw-normal fst-italic">${
//                         article.author
//                       }</span></span
//                     >
//                   </div>
//                   <span class="publish-date">${new Date(
//                     article.publishedAt
//                   ).toDateString()}</span>
//                   <div class="card-bottom d-flex justify-content-start
//                  gap-3">
//                     <span class="fw-bold">Source :</span>
//                     <span class="source fst-italic">${
//                       article.source.name
//                     }</span>
//                   </div>
//                 </div>
//               </div>`;
//     });
//   } catch (error) {
//     console.log(`Error : ${error}`);
//   }
// }
// window.onload = displayNews;
/* End Fetch News  */
