import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import BirthdayQuote from "./components/BirthdayQuote";
import Countdown from "./components/Countdown";
import './App.css';

function App() {
  
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isBirthdayQuote, setIsBirthdayQuote] = useState(false);
  const [userDetails, setUserDetails] = useState({displayName: '', countdown: 0});
  const { displayName, countdown } = userDetails;


  const signupClickHandler = () => {
    console.log("signupClickHandler");
    setIsLoginPage(false);
  }

  const loginClickHandler = () => {
    console.log("loginClickHandler");
    setIsLoginPage(true);
  }

  const loggedinSignedupHandler = (name, count) => {
    console.log("loggedinSignedupHandler");
    setUserDetails({
      displayName: name, 
      countdown: count
    })
    setIsLoggedin(true)
    count == 0 ? setIsBirthdayQuote(true) : setIsBirthdayQuote(false);
  }

  return (
    <div>
      {
        (isBirthdayQuote && isLoggedin) ? <BirthdayQuote displayName={displayName} /> : (!isBirthdayQuote && isLoggedin) ? <Countdown countdown={countdown} /> : isLoginPage ? <Login signupClick={signupClickHandler} loggedin={loggedinSignedupHandler} /> : <SignUp loginClick={loginClickHandler} signedup={loggedinSignedupHandler} />
      }
    </div>
  );
}

export default App;
