import { response } from "express";
import React from "react";
import { Link } from 'react-router-dom';

function SignIn() {
  // have a link to sign up page
  const clickHandler = () => {
    console.log('hi');
    // get request and the response from it should be a good or bad
    // sign in profile will be done via verifying user with req.body to be username, password. 
    // go to the user profile 
      // inside that user profile... it will be populated with the stuff
    
    let dataArr;

    // automatically, the method property value is 'GET'. 
    fetch('/api') 
      .then((response) => response.json())
      .then((data) => {
        console.log('Data from fetch api \n\n\n\n\n\n *********\n', data);
        dataArr = response.body; 
      })
  }

  // expect response.body.tasks from fetching to be an array--

  return (
    <div className="signin">
      <p>hello sign in page</p>
      <textarea placeholder="username"></textarea>
      <textarea placeholder="password"></textarea>
      <button onClick={clickHandler}>Sign In</button>
    </div>
  )
}

export default SignIn;