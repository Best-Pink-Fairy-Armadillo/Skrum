import React from "react";

function SignIn() {
  // have a link to sign up page
  const clickHandler = () => {
    console.log('hi');
    // go to the user profile 
      // inside that user profile... it will be populated with the stuff
    // sign in profile will be done via verifying user with req.body to be username, password. 
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