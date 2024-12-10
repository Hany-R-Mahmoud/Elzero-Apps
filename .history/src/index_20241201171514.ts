/* Random Quote Generator */

const generateBtn = <HTMLButtonElement>document.querySelector(".generate-btn");
const autoBtn = <HTMLButtonElement>document.querySelector(".auto-btn");
const stopBtn = <HTMLButtonElement>document.querySelector(".stop-btn");
const quoteDisplay = <HTMLDivElement>document.querySelector(".quote-display");
const quoteSpeaker = <HTMLDivElement>document.querySelector(".quote-speaker");
const quoteID = <HTMLSpanElement>document.querySelector(".quote-display");

function fetchQuotes() {}

function generateQuotes() {
  fetch("../quotes.json").then((result) => {
    const myQuotes = result.json();
    return myQuotes;
  });
}
/* Random Quote Generator */
