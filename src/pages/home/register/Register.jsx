import { useState } from "react"
import "./register.css"
import axios from "axios";
import { Link } from "react-router-dom"

export default function Register() {
  const [username, setUsername] = useState();
  const [email, setEmail]= useState();
  const [password, setPassword]= useState();
  const [error, setError] = useState(false);
  
  const handleSubmit =async (e)=>{
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("https://blogapi-yf21.onrender.com/api/routes/auth/register",{
        email,
        username,
        password,
      });
      res.data&& window.location.replace("/login");
    } catch (error) {
      console.log(error );
      setError(true);
    }
  };
  return (
    <div className="register">
        <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username :</label>
        <input type="text" placeholder="Enter your username..." 
        onChange={e=>setUsername(e.target.value)}/>
        <label>Email :</label>
        <input type="text" placeholder="Enter your email..." 
        onChange={e=>setEmail(e.target.value)}/>
        <label>Password :</label>
        <input type="password" placeholder="Enter your password..." 
        onChange={e=>setPassword(e.target.value)}/>
        <button className="registerButton" type="submit">Register new user</button>
      </form>
      <button className="registerLoginButton">
        <Link className="link"to="/login">
          Login
        </Link>
      </button>
      {error&&<span style={{color:"red", marginTop:"10px"}}>User credentials already exist!</span>}
    </div>
  )
}
