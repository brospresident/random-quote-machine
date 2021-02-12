let backgrounds = [
    "#1F85DE",
    "#71DE1F",
    "#1F95DE",
    "#E14F2D",
    "#0781A7",
    "#A7076C",
    "#EAB4D6",
    "#B4E2EA"
]

const appName = "Random quote machine";
const author = "Andrei Radu";

let currentQuote = "";
let currentAuthor = "";
let quotes;

let requestQuotes = function() {
    return $.ajax({
        headers: {
            Accept: 'application/json'
        },
        url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
        success: function(query) {
            if (typeof query === 'string') {
                quotes = JSON.parse(query);
                console.log(quotes);
            }
        }
    });
};

let getRandomQuote = function() {
    return quotes.quotes[
        Math.floor(Math.random() * quotes.quotes.length)
    ];
};

let getQuote = function() {
    let cur = getRandomQuote();
    currentQuote = cur.quote;
    currentAuthor = cur.author;

    $("#text").text(currentQuote);
    $("#author").text(" - " + currentAuthor);

    let color = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    $('html body').animate({
        color: color,
        backgroundColor: color
    }, 1000);

    $('button').animate({
        backgroundColor: color
    }, 1000);
};

$(document).ready(function () {
    requestQuotes().then(() => {
      getQuote();
    });
  
    $('#new-quote').on('click', getQuote);
});