import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Alert, Snackbar, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const [open, setOpen] = React.useState(false);

  const [severity, setSeverity] = useState("success");
  const [toasterMessage, setToasterMessage] = useState("");
  const [obj, setObj] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleKeypress = (e) => {
    if (e.charCode === 13) console.log("object");
  };
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const register = () => {
    // http://localhost:3300/api/user/register
    setOpen(true);
    axios
      .post("http://localhost:3300/api/user/register", obj)
      .then((resp) => {
        setToasterMessage("Successfully registered your account");
        setSeverity("success");
      })
      .catch((err) => {
        console.log(err);
        setToasterMessage(err.response.data.message);
        setSeverity("error");
      });
  };
  return (
    <div className="maincard">
      <Card className="card">
        <h1>Register</h1>
        <CardContent>
          <TextField
            id="outlined-basic"
            style={{ width: "450px" }}
            label="Firstname"
            variant="outlined"
            onChange={(e) => setObj({ ...obj, firstname: e.target.value })}
          />
        </CardContent>
        <CardContent>
          <TextField
            style={{ width: "450px" }}
            id="outlined-basic"
            label="Lastname"
            variant="outlined"
            onChange={(e) => setObj({ ...obj, lastname: e.target.value })}
          />
        </CardContent>
        <CardContent>
          <TextField
            id="outlined-basic"
            style={{ width: "450px" }}
            label="Email"
            variant="outlined"
            onChange={(e) => setObj({ ...obj, email: e.target.value })}
          />
        </CardContent>
        <CardContent>
          <TextField
            style={{ width: "450px" }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setObj({ ...obj, password: e.target.value })}
            onKeyPress={handleKeypress}
          />
        </CardContent>
        <CardContent>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ width: "450px" }}
              size="large"
              onClick={() => register()}
              variant="contained"
            >
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {toasterMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default Register;
