// Sign Up Page
import React, { useState } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import firebaseConfig from '../config';
import InputField from './InputField';

function SignUp({loginClick, signedup}) {
  const [userDetails, setUserDetails] = useState({ displayName: "", birthdate: "", email: "", password: "", showpassword: false });
  const { displayName, birthdate, email, password, showpassword } = userDetails;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "displayName":
        setUserDetails({
          displayName: value,
          birthdate: birthdate,
          email: email,
          password: password,
          showpassword: showpassword
        })
        break
        case "birthdate":
        setUserDetails({
          displayName: displayName,
          birthdate: value,
          email: email,
          password: password,
          showpassword: showpassword
        })
        break
      case "email":
        setUserDetails({
          displayName: displayName,
          birthdate: birthdate,
          email: value,
          password: password,
          showpassword: showpassword
        })
        break
      case "password":
        setUserDetails({
          displayName: displayName,
          birthdate: birthdate,
          email: email,
          password: value,
          showpassword: showpassword
        })
        break
      case "showpassword":
        setUserDetails({
          displayName: displayName,
          birthdate: birthdate,
          email: email,
          password: password,
          showpassword: !showpassword
        })
        break
    }
  };

  const signupClicked = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app);
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user.uid)
      set(ref(database, user.uid), {
        name: displayName,
        birthdate: birthdate
      });

      const d = new Date();
      const todaysDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))

      const month = birthdate.split('-')[1];
      const day = birthdate.split('-')[2];
      const userBday = new Date(Date.UTC(d.getFullYear(), month - 1, day));

      if (userBday.toISOString() === todaysDate.toISOString()) {
        // Birthday equals today's date
        console.log("Birthday equals today's date")
        signedup(displayName, 0)
      } else {
        let todaysDate = new Date().setHours(0,0,0,0);
        const currentYear = new Date().getFullYear()

        let userBday = new Date(birthdate).setFullYear(currentYear);

        const countdownVal = Math.round((userBday - todaysDate) / (1000 * 60 * 60 * 24))
        console.log(countdownVal);
        signedup(displayName, countdownVal)
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`${errorCode}: ${errorMessage}`)
      // ..
    });
  }

  return (
    <>
      <div className="header">
        <h1>Quirky Quotes </h1>
        <p>Sign up below to try Quirky Quotes! Your ultimate quote generator! </p>
        <p>You will be given a wonderful quote if it's your birthday today. 🥳🎉</p>
      </div>
      <div className="container">
        <InputField label="Display name: "
          id="displayName"
          type="text"
          value={displayName}
          name="displayName"
          placeholder="Your name goes here"
          onChange={changeHandler} />
        <InputField label="Birthdate: "
          id="birthdate"
          type="date"
          value={birthdate}
          name="birthdate"
          placeholder="birthdate"
          onChange={changeHandler} />
        <InputField label="Email: "
          id="email"
          type="text"
          value={email}
          name="email"
          placeholder="Your email goes here"
          onChange={changeHandler} />
        {
          showpassword ? <InputField
            label="Password: "
            id="password"
            type="text"
            value={password}
            name="password"
            placeholder="Your password goes here" onChange={changeHandler} />
            :
            <InputField
              label="Password: "
              id="password"
              type="password"
              value={password}
              name="password"
              placeholder="Your password goes here"
              onChange={changeHandler} />
        }
        
        <InputField
          label="Show Password: "
          id="showpassword"
          type="checkbox"
          name="showpassword"
          onChange={changeHandler} />
        <InputField
          label=""
          id="submitBtn"
          type="button"
          name="submitBtn"
          value="Sign Up"
          onClick={signupClicked} />
      </div>
      <div><p id="signUpText">Existing user? <a href="#" id="loginLink" onClick={() => loginClick()}> Login here</a></p></div>
    </>
  );
}

export default SignUp;
