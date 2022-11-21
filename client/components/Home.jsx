import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  // need to create a signup page button -- scrum king

  // talk on params that can make use of the id -- get into the their specific data

  return (
    <div>
      <p>This is home page..</p>
      <button onClick={() => {
        navigate('/signin')
      }}>
        We gon go to the sign in boizzz
      </button>
      <button onClick={() => {
        navigate('/signup')
      }}> 
        Sign up here
      </button>
    </div>
  )
}

export default Home;