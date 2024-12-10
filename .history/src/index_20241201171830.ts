/* Random Quote Generator */

const generateBtn = <HTMLButtonElement>document.querySelector(".generate-btn");
const autoBtn = <HTMLButtonElement>document.querySelector(".auto-btn");
const stopBtn = <HTMLButtonElement>document.querySelector(".stop-btn");
const quoteDisplay = <HTMLDivElement>document.querySelector(".quote-display");
const quoteSpeaker = <HTMLDivElement>document.querySelector(".quote-speaker");
const quoteID = <HTMLSpanElement>document.querySelector(".quote-display");

async function fetchQuotes() {
  const response = fetch("../quotes.json");
  const fetchedData = (await response).json();
  return fetchedData;
}
console.log(fetchQuotes());
function generateQuotes() {
  const myQuotes = fetchedData;
}
/* Random Quote Generator */
