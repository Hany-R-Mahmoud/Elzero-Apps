/* Random Quote Generator */

const generateBtn = <HTMLButtonElement>document.querySelector(".generate-btn");
const autoBtn = <HTMLButtonElement>document.querySelector(".auto-btn");
const stopBtn = <HTMLButtonElement>document.querySelector(".stop-btn");
const quoteDisplay = <HTMLDivElement>document.querySelector(".quote-display");
const quoteSpeaker = <HTMLDivElement>document.querySelector(".quote-speaker");
const quoteId = <HTMLSpanElement>document.querySelector(".quote-display");

async function fetchQuotes() {
  const response = await fetch("../quotes.json");
  const fetchedData = await response.json();
  return fetchedData;
}
function generateQuotes() {
  const myQuotes: any = fetchQuotes();
  const randomQuote = myQuotes[Math.floor(Math.random() * myQuotes.length)];
  console.log(randomQuote);
  //   quoteDisplay.innerHTML = randomQuote.text;
  //   quoteSpeaker.innerHTML = randomQuote.speaker;
  //   quoteId.innerHTML = randomQuote.id;
}
/* Random Quote Generator */
generateBtn.addEventListener("click", generateQuotes());
