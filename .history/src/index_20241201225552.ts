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
const currencyAmount: any = (
  document.querySelector(".amount") as HTMLInputElement
).value;
const currencyFrom = (document.querySelector(".amount") as HTMLSelectElement)
  .value;
const currencyTo = (document.querySelector(".amount") as HTMLSelectElement)
  .value;
const currencyResult = <HTMLDivElement>(
  document.querySelector(".currency-result")
);
const convertBtn = <HTMLButtonElement>document.querySelector(".convert-btn");

// convertBtn.addEventListener("click", () => {

async function fetchCurrencies() {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/cb189adbeb816b7c66b93717/latest/${currencyFrom}`
  );
  const fetchedData = await response.json();
  return fetchedData;
}
console.log(fetchCurrencies());
async function currencyConvert() {
  if (currencyAmount && currencyFrom && currencyTo) {
    const currencyData = await fetchCurrencies();
    const currencyRate = await currencyData.conversion_rates[currencyTo];
    const resultAmount = (currencyRate * currencyAmount).toFixed(2);
    currencyResult.innerHTML = `${currencyAmount} ${currencyFrom} = ${resultAmount} ${currencyTo}`;
  } else {
    currencyResult.innerHTML = "Please Fill All Fields";
  }
}
convertBtn.addEventListener("click", currencyConvert);

// });
/* End Currency Converter */
fetch(
  `https://v6.exchangerate-api.com/v6/cb189adbeb816b7c66b93717/latest/${currencyFrom}`
).then((response) => {
  const trial = response.json();
  console.log(trial);
});
