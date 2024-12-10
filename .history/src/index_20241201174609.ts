/* Random Quote Generator */

const generateBtn = <HTMLButtonElement>document.querySelector(".generate-btn");
const autoBtn = <HTMLButtonElement>document.querySelector(".auto-btn");
const stopBtn = <HTMLButtonElement>document.querySelector(".stop-btn");
const quoteDisplay = <HTMLDivElement>document.querySelector(".quote-text");
const quoteSpeaker = <HTMLDivElement>document.querySelector(".quote-speaker");
const quoteId = <HTMLSpanElement>document.querySelector(".quote-id");
const autoStatus = <HTMLDivElement>document.querySelector(".auto-status");
async function fetchQuotes() {
  const response = await fetch("../quotes.json");
  const fetchedData = await response.json();
  return fetchedData;
}
async function generateQuotes() {
  const myQuotes = await fetchQuotes();
  const randomQuote = myQuotes[Math.floor(Math.random() * myQuotes.length)];
  console.log(randomQuote);
  quoteDisplay.textContent = randomQuote.text;
  quoteSpeaker.textContent = randomQuote.speaker;
  quoteId.innerHTML = randomQuote.id;
}
generateBtn.addEventListener("click", generateQuotes);
autoBtn.addEventListener("click", () => {
  setInterval(generateQuotes(), 5000);
  autoStatus.innerHTML = "Auto : On";
});

/* Random Quote Generator */
