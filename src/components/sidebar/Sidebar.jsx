import { useEffect, useState } from "react"
import axios from "axios";
import "./sidebar.css"
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats,setCats]= useState([]);

  useEffect(()=>{
    const getCats = async()=>{
      const res = await axios.get("/categories")
      setCats(res.data);
    }
    getCats();
  },[]);
  return (
    <div className="sideBar">
      <div className="sideBarItem">
        <span className="sideBarTitle">ABOUT ME</span>
        <img src="./hey.png" alt="" />
        <p>Welcome to My Ponder-Page! I'm Sahil, the storyteller behind these digital musings. As a Develpoer, I find joy in crafting tales that celebrate the magic of everyday life. Join me on a journey through reflections, adventures, and the beauty found in simplicity. This blog is a space where words dance and ideas unfold. Let's explore, learn, and share stories together. Your presence is not just appreciated; it's the heart of this narrative. Thanks for being here, and I can't wait to connect with fellow seekers of inspiration. Cheers to the magic of words and the stories we're yet to tell!</p>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">CATEGORIES</span>
        <ul className="sideBarList">
          {cats.map((c)=>(
          <Link to={`/?cat=${c.name}`} className="link">
            <li className="sideBarListIem">{c.name}</li>
            
            </Link>
            ))}
        </ul>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">FOLLOW ME</span>
        <div className="sideBarSocial">
          <i className="sideBarIcon fab fa-facebook-square"></i>
          <a href="https://www.instagram.com/saa.hilarious" target="_blank" rel="noopener noreferrer">
          <i className="topIcon fab fa-instagram-square"></i>
        </a>
          <a href="https://www.linkedin.com/in/mohammed-sahil01" target="_blank" rel="noopener noreferrer">
          <i className="topIcon fa-brands fa-linkedin"></i>
        </a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=thisismsahil@gmail.com&su=SUBJECT&body=BODY" target="_blank" rel="noopener noreferrer">
          <i className="topIcon fa-solid fa-envelope"></i>
        </a>
        </div>
      </div>
    </div>
  )
}
