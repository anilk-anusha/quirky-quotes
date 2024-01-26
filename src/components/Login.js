// Login  Page
import React, { useState } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

import firebaseConfig from '../config';
import InputField from './InputField';

function Login({signupClick, loggedin}) {
  const [userDetails, setUserDetails] = useState({ email: "", password: "", showpassword: false });
  const { email, password, showpassword } = userDetails;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setUserDetails({
          email: value,
          password: password,
          showpassword: showpassword
        })
        break
      case "password":
        setUserDetails({
          email: email,
          password: value,
          showpassword: showpassword
        })
        break
      case "showpassword":
        setUserDetails({
          email: email,
          password: password,
          showpassword: !showpassword
        })
        break
    }
  };

  const loginBtnClicked = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app);
    const dbRef = ref(database);

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user.uid)
      get(child(dbRef, user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          const userDetails = snapshot.val()
          console.log(userDetails);

          const d = new Date();
          const todaysDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))

          const month = userDetails.birthdate.split('-')[1];
          const day = userDetails.birthdate.split('-')[2];
          const userBday = new Date(Date.UTC(d.getFullYear(), month - 1, day));

          if (userBday.toISOString() === todaysDate.toISOString()) {
            // Birthday equals today's date
            console.log("Birthday equals today's date")
            loggedin(userDetails.name, 0)
          } else {
            let todaysDate = new Date().setHours(0,0,0,0);
            const currentYear = new Date().getFullYear()

            let userBday = new Date(userDetails.birthdate).setFullYear(currentYear);

            const countdownVal = Math.round((userBday - todaysDate) / (1000 * 60 * 60 * 24))
            console.log(countdownVal);
            loggedin(userDetails.name, countdownVal)
          }
        } else {
          alert("No data available for logged in User!");
        }
      }).catch((error) => {
        console.error(error);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`${errorCode}: ${errorMessage}`)
    });
  }

  return (
    <>
      <div className="header">
        <h1>Quirky Quotes</h1>
        <p>Login below to receive a quote if it's your birthday today. 🥳🎉</p>
      </div>
      <div className="container">
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
          value="Login"
          onClick={loginBtnClicked} />
      </div>
      <div><p id="signUpText">New user? <a href="#" id="signUpLink" onClick={() => signupClick()}> Sign Up here</a></p></div>
    </>
  );
}

export default Login;
