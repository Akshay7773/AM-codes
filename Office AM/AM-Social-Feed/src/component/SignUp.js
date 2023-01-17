import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function SignUp() {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);

  const [obj, setObj] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterColor, setToasterColor] = useState("");

  const register = () => {
    setFlag(true);
    // console.log(obj);

    axios
      .post("http://localhost:3300/api/user/register", obj)
      .then((response) => {
        setToasterColor("success");
        setToasterMessage("Sign up successful!");
        setOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        setToasterColor("error");
        setToasterMessage(error.response.data.message);
        setOpen(true);
      });
  };

  useEffect(() => {
    obj.firstname === "" && flag === true
      ? setFirstNameError("First Name required")
      : setFirstNameError("");
  }, [flag, obj.firstname]);

  useEffect(() => {
    obj.lastname === "" && flag === true
      ? setLastNameError("Last Name required")
      : setLastNameError("");
  }, [flag, obj.lastname]);

  useEffect(() => {
    obj.email === "" && flag === true
      ? setEmailError("Email Address is Required!!")
      : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.email) ===
          false && flag === true
      ? setEmailError("enter valid email address")
      : setEmailError("");
  }, [flag, obj.email]);

  useEffect(() => {
    obj.password === "" && flag === true
      ? setPassError("Password required")
      : /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
          obj.password
        ) === false && flag === true
      ? setPassError("Enter valid password")
      : setPassError("");
  }, [flag, obj.password]);
  const [authValue, setAuthValue] = useState(localStorage.getItem("authkey"));
  useEffect(() => {
    if (authValue !== null) navigate("/");
  }, [authValue]);

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

  return (
    <div className="App">
      <h2 className="App">Sign Up</h2>
      <div
        className="emailAndPass"
        style={{ marginLeft: "20%", marginRight: "20%", marginBottom: "5%" }}
      >
        <div>
          {/* <div>
            <label>First Name: </label>
          </div> */}
          <br />
          <TextField
            style={{
              width: "40%",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
            required
            // id="outlined-required"
            label="First Name"
            helperText={firstNameError}
            // error={firstNameError ? true : false}
            onChange={(e) => setObj({ ...obj, firstname: e.target.value })}
          />
        </div>
        <br />
        <br />
        <div>
          {/* <div>
            <label>Last Name: </label>
          </div> */}
          <br />
          <TextField
            style={{
              width: "40%",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
            required
            // id="outlined-required"
            label="Last Name"
            helperText={lastNameError}
            // error={lastNameError ? true : false}
            onChange={(e) => setObj({ ...obj, lastname: e.target.value })}
          />
        </div>
        <br />
        <br />
        <div>
          {/* <div>
            <label>Email: </label>
          </div> */}
          <br />
          <TextField
            style={{
              width: "40%",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
            required
            // id="outlined-required"
            label="Email"
            onChange={(e) => setObj({ ...obj, email: e.target.value })}
            // helperText={emailError}
            // error={emailError ? true : false}
          />
        </div>
        <br />
        <br />
        <div>
          {/* <div>
            <label>Password: </label>
          </div> */}
          <br />
          <TextField
            style={{
              width: "40%",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
            required
            // id="outlined-required"
            label="Password"
            onChange={(e) => setObj({ ...obj, password: e.target.value })}
            // helperText={passError}
            // error={passError ? true : false}
          />
        </div>
        <br />
        <Button
          onClick={() => register()}
          variant="contained"
          disableElevation
          style={{ marginTop: "5px", padding: "1% 8%" }}
          // style={{ padding: "1% 10%" }}
        >
          Register
        </Button>
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

export default SignUp;
