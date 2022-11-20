import React from "react";
import { useNavigate } from 'react-router-dom';

function SignUp() {
  let navigate = useNavigate();
  // have a link to sign in
  const clickHandler = () => {
    console.log('supppp');
    const newUser = document.querySelector('#newUsername').value;
    const newPass = document.querySelector('#newPassword').value;

    const reqBody = {
      username: newUser,
      password: newPass
    }
    console.log('reqBody', reqBody);

    fetch('api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('the data is fetcheddddd', data);
      navigate('/signin');
      alert('Successfully created account! Now log in')
    })
    .catch((err) => {
      window.location.reload(true);
      alert('You can\'t create that account, loser');
    })
  }

  return (
    <div className="signup">
      <p>Sign up here scrub.</p>
      <textarea id="newUsername" placeholder="username"></textarea>
      <textarea id="newPassword" placeholder="password"></textarea>
      <button onClick={clickHandler}>Sign Up</button>
    </div>
  )
}

export default SignUp;