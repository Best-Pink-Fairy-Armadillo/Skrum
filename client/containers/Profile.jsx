import React from 'react';

function Profile(props) {
  // define out variables for props.username, props.tasks

  return (
    <div> 
      <p>Successful profile log in {props.username}!</p>
      <div>{props.tasks}</div>
    </div>
  )
}


export default Profile;