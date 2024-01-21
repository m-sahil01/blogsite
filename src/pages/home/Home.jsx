import "./home.css"
import Header from "../../components/header/Header.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Posts from "../../components/posts/Posts.jsx"
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import Single from "./single/Single.jsx";

export default function Home() {
  const [posts,setPosts]= useState([]);
  const {search} = useLocation();
  useEffect(()=>{
const fetchPosts=async()=>{
  const res = await axios.get("/posts"+search);
  setPosts(res.data)
} 
fetchPosts();
},[search])
  return( <>
    <Header />
    <div className="home">
    <Posts posts={posts} />
    <Sidebar />
    </div>
  </>
  )
}
