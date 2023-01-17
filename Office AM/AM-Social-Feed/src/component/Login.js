import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const reRef = useRef();
  const [type, setType] = useState("password");
  const [booleanValue, setBooleanValue] = useState(true);
  const [flag, setFlag] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterColor, setToasterColor] = useState("");
  // const [emailid, setEmailId] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passErrorMessage, setPassErrorMessage] = useState("");
  // const [password, setPassword] = useState("");
  const [authValue, setAuthValue] = useState(localStorage.getItem("authkey"));

  const [googleInfo, setGoogleInfo] = useState({
    idToken: "",
  });

  useEffect(() => {
    if (authValue !== null) navigate("/");
    if (authValue === null) navigate("/login");
  }, [authValue]);
  const [obj, setObj] = useState({
    email: "",
    password: "",
  });
  const changeTypeAndText = () => {
    setBooleanValue(!booleanValue);
    // console.log(booleanValue);
    if (booleanValue === true) setType("text");
    else setType("password");
  };
  const [open, setOpen] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const login = () => {
    setFlag(true);

    axios
      .post("http://localhost:3300/api/user/login", obj)
      .then((resp) => {
        setToasterColor("success");
        setToasterMessage("Login successful!");
        setOpen(true);
        localStorage.setItem("authkey", resp.data.token);
        localStorage.setItem(
          "myobj",
          JSON.stringify({ name: resp.data.name, _id: resp.data._id })
        );
        localStorage.setItem("name", resp.data.name);
        setTimeout(() => {
          navigate("/", { state: resp.data });
        }, 2000);

        localStorage.setItem("activeUserId", JSON.stringify(resp.data.id));
      })
      .catch((err) => {
        setToasterColor("error");

        setToasterMessage(err.response.data.message);
        // console.log(err.response.data);
        setOpen(true);
      });
  };

  useEffect(() => {
    // console.log("first");
    obj.email === "" && flag === true
      ? setEmailErrorMessage("Email Address is Required!!")
      : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.email) ===
          false && flag === true
      ? setEmailErrorMessage("enter valid email address")
      : setEmailErrorMessage("");
  }, [flag, obj.email]);

  useEffect(() => {
    obj.password === "" && flag === true
      ? setPassErrorMessage("password required")
      : obj.password.length <= 6 && flag === true
      ? setPassErrorMessage("password length must be greater than 6")
      : setPassErrorMessage("");
  }, [flag, obj.password]);

  // for google login
  const responseGoogle = async (googleResponse) => {
    // const token = await reRef.current.executeAsync();
    googleInfo.idToken = googleResponse.tokenId;
    googleResponse.tokenId &&
      axios
        .post("http://localhost:3300/api/user/auth/google", googleInfo, {
          headers: { Accept: "application/json" },
        })
        .then((resp) => {
          console.log(resp);
          setToasterColor("success");
          setToasterMessage("Login successful!");
          setOpen(true);
          localStorage.setItem("authkey", resp.data.user.token);
          localStorage.setItem(
            "activeUserId",
            JSON.stringify(resp.data.user.id)
          );
          // localStorage.setItem("myobj", JSON.stringify(obj));
          localStorage.setItem("name", resp.data.user.name);
          // let resp = response.data.googlePayload;
          // localStorage.setItem("_activeUser", JSON.stringify(resp));
          setTimeout(() => {
            navigate("/");
          }, 2000);

          // let resp = response.JSON();
          // localStorage.setItem("_activeUser", JSON.stringify(resp));
        })
        .catch((error) => console.log(error));
  };

  return (
    <div className="App" style={{ margin: "0 20%" }}>
      <h2 className="App">Login</h2>
      <div className="emailAndPass">
        <div>
          {/* <div>
            {" "}
            <label>Email: </label>
            <br />
            <br />
          </div> */}
          <TextField
            style={{
              width: "30%",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
            required
            id="outlined-required"
            label="Enter Email"
            helperText={emailErrorMessage}
            onChange={(e) => setObj({ ...obj, email: e.target.value })}
            error={
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                obj.email
              ) === true
                ? false
                : true && flag
            }
          />
        </div>
        <br />
        <br />
        <div>
          {/* <label>Password: </label>
          <br />
          <br /> */}
          <div>
            <TextField
              type={type}
              style={{
                width: "30%",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              required
              id="outlined-required"
              label="Enter Password"
              helperText={passErrorMessage}
              onChange={(e) => setObj({ ...obj, password: e.target.value })}
              error={obj.password.length <= 6 && flag === true ? true : false}
            />
          </div>
          <div>
            {/* <input type="checkbox" /> */}
            <Checkbox onChange={() => changeTypeAndText()} />

            {booleanValue === true ? "Show Password" : "Hide Password"}
          </div>
        </div>
        <br />
        <br />
        <Button
          variant="contained"
          onClick={login}
          // disableElevation
          style={{ padding: "1% 12%" }}
        >
          Login
        </Button>{" "}
        <p> OR </p>
        <center>
          <GoogleLogin
            clientId="90637269027-cqmns9kff5q3usbr7aqr4qmd8ffeqp4g.apps.googleusercontent.com"
            buttonText="Log in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </center>
        <div style={{ marginTop: "10px" }}>
          Don't have an account?
          <Button
            onClick={() => navigate("/sign-up")}
            disableElevation
            style={{ textDecoration: "underline" }}
          >
            Sign Up
          </Button>
        </div>
        {/* <Button
          onClick={() => navigate("/sign-up")}
          variant="contained"
          disableElevation
        >
          Sign Up
        </Button> */}
        {toasterMessage && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={toasterColor}
              sx={{ width: "100%" }}
            >
              {toasterMessage}
            </Alert>
          </Snackbar>
        )}
      </div>
    </div>
  );
}

export default Login;
