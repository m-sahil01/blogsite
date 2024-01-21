import { Link } from "react-router-dom";
import "./navbar.css"
import { useContext } from "react";
import { Context } from "../../context/Context";


export default function NavBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:4000/images/"

  console.log(user);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  return (
    <div className="nav">
      <div className="topLeft">
        <a href="https://www.linkedin.com/in/mohammed-sahil01" target="_blank" rel="noopener noreferrer">
          <i className="topIcon fa-brands fa-linkedin"></i>
        </a>
        <a href="https://www.instagram.com/saa.hilarious" target="_blank" rel="noopener noreferrer">
          <i className="topIcon fab fa-instagram-square"></i>
        </a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=thisismsahil@gmail.com&su=SUBJECT&body=BODY" target="_blank" rel="noopener noreferrer">
          <i className="topIcon fa-solid fa-envelope"></i>
        </a>
        <i className="topIcon fab fa-facebook-square"></i>

      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">Home</Link>
          </li>
          <li className="topListItem"><Link to="/" className="link">About</Link></li>
          <li className="topListItem"><Link to="/" className="link">Contact</Link></li>
          <li className="topListItem"><Link to="/write" className="link">Write</Link></li>
          {/* <li className="topListItem" onClick={handleLogout}>{user && "Log out"}</li> */}
        </ul>
      </div>
      <div className="topRight">
        {
          user ?

            user.profilePic ?
              (<Link to="/settings">

                <img src={PF + user.profilePic} className="topImage" />
              </Link>)

              :
              <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                <i className="topImage fa-solid fa-user" ></i>
              </Link>

            : (<ul className="topList">
              <li className="topListItem">
                <Link to="/login" className="link">Login</Link>
              </li>
              <li className="topListItem">
                <Link to="/register" className="link">Resgister</Link>
              </li>
            </ul>
            )
        }
        {user && (

          <i className="fa-solid fa-right-from-bracket" onClick={user ? handleLogout : null} style={{ marginLeft: '35px' }}></i>
        )
        }
      </div>
    </div>
  )
}
