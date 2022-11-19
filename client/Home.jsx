import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();


  return (
    <div>
      <p>This is hoem page..</p>
      <button onClick={() => {
        navigate("/signin")
      }}>
        We gon go to the sign in boizzz
      </button>
    </div>
  )
}

export default Home;