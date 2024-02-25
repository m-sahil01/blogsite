import "./settings.css";
import Sidebar from "../../../components/sidebar/Sidebar.jsx";
import { useContext, useState } from "react";
import { Context } from "../../../context/Context";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:4000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDeleteProfilePicture = async () => {
    try {
      const updatedUser = {
        userId: user._id,
        profilePic: "", 
      };
      const res = await axios.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess(true);
    } catch (err) {
      console.error("Failed to delete profile picture:", err);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-solid fa-camera-retro"></i>

            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          </div>
          {user.profilePic && (
            <button type="button" onClick={handleDeleteProfilePicture} className="deletePic">Delete Profile Picture</button>
          )}
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
          <label>E-mail</label>
          <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="settingsSubmit" type="submit">Update</button>
          {success && (
            <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}