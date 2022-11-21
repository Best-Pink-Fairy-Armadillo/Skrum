import React from "react";
import { useNavigate } from 'react-router-dom';

function SignIn(props) {
  // have a link to sign up page
  let navigate = useNavigate();

  const clickHandler = () => {
    console.log('hi');
    // get request and the response from it should be a good or bad
    // sign in profile will be done via verifying user with req.body to be username, password. 
    // go to the user profile 
      // inside that user profile... it will be populated with the stuff
    
    const user = document.querySelector('#username').value;
    const pass = document.querySelector('#password').value;

    const reqBody = {
      username: user,
      password: pass
    };

    console.log('reqbody', reqBody);

    // automatically, the method property value is 'GET'. 
    fetch('api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }) 
      .then((response) => response.json())
      .then((data) => {
        console.log('the data has been fetched! display data: ', data);
        props.populateTasks(data);
        console.log('is the data okay? display data.tasks: ', data.tasks)
        props.getUser(reqBody.username);
        navigate('/profile');
      });
      // .catch((err) => {
      //   if (err) {
      //     window.location.reload(true);
      //     alert('You bozo, that\'s the wrong password/username');
      //   }
      // })
  }

  // expect response.body.tasks from fetching to be an array--

  // change up the password to make the text not visible
  // give both signin and signup access to go to either side
  return (
    <div className='signin'>
      <p>hello sign in page</p>
      <textarea id="username" placeholder="username"></textarea>
      <textarea id="password" placeholder="password"></textarea>
      <button onClick={clickHandler}>Sign In</button>
    </div>
  );
}

export default SignIn;
