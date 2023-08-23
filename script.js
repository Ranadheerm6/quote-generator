const quoteSpace = document.getElementById("quote-text")
const newQuoteBtn = document.getElementById("new-quote")
const authorSpace = document.getElementById("author")
const quoteContainer = document.getElementById("quote-container")
const tweetBtn = document.getElementById("twitter")
const loader = document.getElementById("loader")

let apiQuotes = [];

// loading functions
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// get Random Quote
function newQuote(){
    loading();
    // Defining a random number
    const randomNumber = Math.floor(Math.random() * apiQuotes.length);
    // Check if the author's name is given in the api object
    const randomQuoteAuthor = apiQuotes[randomNumber].author
    if(!randomQuoteAuthor){
        authorSpace.textContent = 'Anonymous'    
    } else {
        authorSpace.textContent =  randomQuoteAuthor
    }
    // Check quote length to determine styling
    const randomQuote = apiQuotes[randomNumber].text
    if(randomQuote.length >= 80){
        quoteSpace.classList.add("long-quote")
    } else{
        quoteSpace.classList.remove("long-quote")
    }
    quoteSpace.textContent = randomQuote
    complete();
}

// Tweet Quote
function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteSpace.textContent} - ${authorSpace.textContent}`
    window.open(tweetUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote)

tweetBtn.addEventListener('click', tweetQuote)

// Get quotes from the API
async function getQuotes(){ 
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        loading();
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        complete()
        newQuote();
    } catch (error) {
        alert(`Something's wrong with the api`)
    }
} 

getQuotes()
