import React, { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import GoogleLogin from "react-google-login";
function Login(props) {
  const navigate = useNavigate();
  // const [authKey, setAuthKey] = useState("");
  const recaptchaRef = React.useRef();
  const [email, setEmail] = useState("akshay.gawade@angularminds.in");
  const [pass, setPass] = useState("Akshay@2022");
  const authContext = useContext(UserContext);
  console.log(authContext);
  const setEmailId = (e) => {
    setEmail(e.target.value);
  };
  const setPassword = (e) => {
    setPass(e.target.value);
  };
  console.log("first ");

  // const email = "akshay.gawade@angularminds.in";
  // const pass = "Akshay@2022";

  //for Recaptcha

  const submitbtn = async () => {
    const tokens = await recaptchaRef.current.executeAsync();
    console.log(tokens);
    axios
      .post("http://admin.liveexamcenter.in/api/auth/login", {
        email: email,
        password: pass,
        reCaptchaToken: tokens,
      })
      .then((response) => {
        // console.log(response.data.user);

        // console.log(response.data.token);
        authContext.setAuthKey(response.data.token);

        document.cookie = `access_token=${response.data.token}`;
        // document.cookie = authKey;
        navigate("/Front", { state: response.data.user });
        //_activeUser: add to localstorage.
      });
  };

  //for Google Captcha
  const responseGoogle = async (response) => {
    // console.log(response);
    const tokens = await recaptchaRef.current.executeAsync();
    // console.log(tokens);
    axios
      .post("http://admin.liveexamcenter.in/api/auth/google/", {
        idToken: response.tokenId,
        reCaptchaToken: tokens,
      })
      .then((response) => {
        // console.log(response.data.user);
        authContext.setAuthKey(response.data.token);
        document.cookie = `access_token=${response.data.token}`;
        navigate("/Front", { state: response.data.user });
      });
    console.log(tokens);
  };

  // console.log(authKey);
  // console.log(data);
  return (
    <div>
      <h1>Angular Minds</h1>
      <div>
        <h2>Login to your acount</h2>
        <div>
          <div>
            <h3>Email Address:</h3>
            <input onChange={(e) => setEmailId(e)}></input>
          </div>
          <div>
            <h3>Password:</h3>
            <input type="password" onChange={(e) => setPassword(e)}></input>
          </div>
        </div>
        <button onClick={(e) => submitbtn(e)}>Submit</button>
        <br></br>
        <h3>Or</h3>
      </div>

      <form onSubmit={submitbtn}>
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6Ld3COIZAAAAAC3A_RbO1waRz6QhrhdObYOk7b_5"
        />
      </form>

      <GoogleLogin
        clientId="971623344603-0qquan9pcdb9iu7oq9genvpnel77i7oa.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
export default Login;
