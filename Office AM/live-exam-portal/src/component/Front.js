import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserContext } from "../App";
function Front() {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const start = () => {
    navigate("/Start");
  };

  const authContext = useContext(UserContext);
  console.log(authContext);

  const goToLogin = () => {
    document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    authContext.setAuthKey("");
    navigate("/");
  };
  return (
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      ></link>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          @AngularMinds
        </a>
        <a className="nav-link" href="#">
          Dashboard
        </a>
        <a className="nav-link" href="#" onClick={() => start()}>
          Questions
        </a>
        <a className="nav-link" href="#">
          Tests
        </a>
        <a className="nav-link" href="#">
          Reports
        </a>
        <a className="nav-link" href="#">
          Settings
        </a>
        <button onClick={() => goToLogin()}>LogOut</button>
      </nav>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        id="secondNav"
      >
        {/* <div className="collapse navbar-collapse" id="navbarSupportedContentTwo"> */}
        {/* <ul className="navbar-nav mr-auto"> */}
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={() => start()}>
            Questions
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Subjects
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Topics
          </a>
        </li>
        {/* </ul> */}
        {/* </div> */}
      </nav>
    </div>
  );
}
export default Front;
