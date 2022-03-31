import React, { useState, useEffect } from 'react'
import './App.scss';
import colorsArray from './colorsArray.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";


function App() {
  const [quote, setQuote] = useState("Melancholy is sadness that has taken on lightness.")
  const [author, setAuthor] = useState("Italo Calvino")
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON);
}

useEffect(() => {
  fetchQuotes(quoteDBUrl)
})

const getRandomQuote = () => {
  let randomInt = Math.floor(quotesArray.length * Math.random());
  setQuote(quotesArray[randomInt].quote);
  setAuthor(quotesArray[randomInt].author);
  getRandomColor();
}

const getRandomColor = () => {
  let randomInt = Math.floor(colorsArray.length * Math.random());
  setAccentColor(colorsArray[randomInt])
}


  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:accentColor, color:accentColor}}>
        <div id="quote-box" style={{color:accentColor}}>
        <p id="text">
          "{quote}"
        </p>
        <p id="author">
          - {author}
        </p>
        <div className='buttons'> 
        <div className='button' >
        <a style={{backgroundColor:accentColor}} id="tweet-quote" href={`http://www.twitter.com/intent/tweet?text=${quote} -${author}`}><FontAwesomeIcon icon={faTwitter} /></a>
        </div>
        <button id="new-quote" style={{backgroundColor:accentColor}} onClick={() => getRandomQuote()}>New Quote</button>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;