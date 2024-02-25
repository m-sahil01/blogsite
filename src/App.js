import NavBar from "./components/navbar/NavBar.jsx"
import Home from "./pages/home/Home.jsx"
import Write from "./pages/home/write/Write.jsx"
import Settings from "./pages/home/settings/Settings.jsx"
import Login from "./pages/home/login/Login.jsx";
import Register from "./pages/home/register/Register.jsx";
import React, { useContext } from "react";
import Single from "./pages/home/single/Single.jsx";
import {
  BrowserRouter,
  Route,
  Routes, 
} from "react-router-dom";
import { Context } from "./context/Context.js";
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";


function App() {
  const {user}= useContext(Context);
  return (
    <BrowserRouter>
    <NavBar /> 
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route exact path="/about" element={<About/>}/>
      </Routes>
      <Routes>
        <Route exact path="/contact" element={<Contact/>} />
      </Routes>
      <Routes>
        <Route path="/write" element={user?<Write />:<Register/>} />
      </Routes>
      <Routes>
        <Route path="/login" element={user? <Home />:<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={user?<Home /> :<Register />} />
      </Routes>
      <Routes>
        <Route path="/settings" element={user?<Settings />:<Register />} />
      </Routes>
      <Routes>
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
