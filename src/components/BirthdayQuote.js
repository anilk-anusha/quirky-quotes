import React, { useState, useEffect } from "react";
import InputField from "./InputField";

function BirthdayQuote ({ displayName }) {
   const [apiQuote, setApiQuote] = useState('');
   const [apiQuoteAuthor, setApiQuoteAuthor] = useState('');

    useEffect(() => {
        fetch('https://type.fit/api/quotes')
          .then((res) => {
            return res.json();
          })
          .then((quotes) => {
            setApiQuote(quotes[Math.floor(Math.random() * quotes.length)].text);
            setApiQuoteAuthor(quotes[Math.floor(Math.random() * quotes.length)].author.split(',')[0])
          });
      }, []);
    return (
    <div className="container">
      <h1>Happy Birthday, {displayName}! 🎂🎉</h1>
      <p>{apiQuote}</p>
      <i>-{apiQuoteAuthor}</i>
      <InputField
        label=""
        id="LogoutBtn"
        type="button"
        name="submitBtn"
        value="Logout"
        onClick={()=> window.location.href = "index.html"} />
    </div>
    )
};
  
export default BirthdayQuote;