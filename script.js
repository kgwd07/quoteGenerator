const quoteContainer =  document.getElementById('quote-container');
const quoteText =  document.getElementById('quote');
const authorText =  document.getElementById('author');
const twitterBtn =  document.getElementById('twitter');
const newQuoteBtn =  document.getElementById('new-quote');
const loader =  document.getElementById('loader');




// ! get quotes from api

const apiUrl = "https://type.fit/api/quotes";

let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//!show new quote 
function newQuote(){
    loading();
    // pick random quotes from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // check if author field is blank and replace it with "unknown' 

    if(!quote.author){
        authorText.textContent = "unknown";
    } else{
        authorText.textContent = quote.author;
    }

    // check quote length to determine the styling
     if(quote.text.length > 50){
         quoteText.classList.add('long-quote');
     } else{
         quoteText.classList.remove('long-quote');
     }
    //  set quote, hide loader
    quoteText.textContent = quote.text; 
    complete();
};


async function getQuotes(){

    loading();
    
    try{
        const response =  await fetch(apiUrl);
         apiQuotes = await response.json(); 
        //  console.log(apiQuotes[Math.floor(Math.random()*apiQuotes.length)]);
        newQuote();
    }
    catch(error){
        // catch Error
    }

}


// Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}


// !event listner
    newQuoteBtn.addEventListener('click',newQuote);
    twitterBtn.addEventListener('click',tweetQuote);



// on load
getQuotes()