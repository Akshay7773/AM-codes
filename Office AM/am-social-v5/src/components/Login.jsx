import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Alert, Snackbar, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState("success");
  const [toasterMessage, setToasterMessage] = useState("");
  const [obj, setObj] = useState({
    email: "",
    password: "",
  });
  const handleClick = () => {
    // console.log(obj);
    setOpen(true);
    axios
      .post("http://localhost:3300/api/user/login", obj)
      .then((resp) => {
        setSeverity("success");
        setToasterMessage("Successfully logged into your account");

        setTimeout(() => {
          navigate("/posts");
        }, 3000);
        localStorage.setItem("user", JSON.stringify(resp.data));
      })
      .catch((err) => {
        setSeverity("error");
        setToasterMessage(err.response.data.message);
        console.log(err);
      });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) handleClick();
  };
  return (
    <div className="maincard">
      <Card className="card">
        <h1>Login</h1>

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
            id="outlined-basic"
            style={{ width: "450px" }}
            label="password"
            variant="outlined"
            type="password"
            onChange={(e) => setObj({ ...obj, password: e.target.value })}
            onKeyPress={handleKeypress}
          />
        </CardContent>
        <CardContent>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={handleClick}
              style={{ width: "450px" }}
              size="large"
              variant="contained"
            >
              Login
            </Button>
          </div>
        </CardContent>
        <CardContent>
          <div style={{ textAlign: "center" }}>
            <Button
              Button
              variant="contained"
              color="success"
              onClick={() => navigate("/register")}
            >
              Register
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

export default Login;
