const quoteConatiner = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes;

function showLoadingSpinner() {
    loader.hidden = false;
    quoteConatiner.hidden =true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteConatiner.hidden = false;
    }
}

// Show New Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from api quotes array:
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown':
    if (!quote.author) {
        return authorText.textContent = 'Unknown';
    }
    authorText.textContent = quote.author;
    // Check Quote length to determine styling:
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader:
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        getQuotes();
    }
}

// Tweet a Quote:
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} --- ${authorText.textContent}&hashtags=Motivation,Quotes`;
    // '_blank' allows us to open the url in a new tab:
    window.open(twitterUrl, '_blank'); 
}

// Event Listener:
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();