import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Modal,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
function NavBar(props) {
  const user = props.user.isclicked;

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [authValue, setAuthValue] = useState(localStorage.getItem("authkey"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    axios
      .get("http://localhost:3300/api/profile/getProfile", {
        headers: {
          authorization: authValue,
        },
      })
      .then((resp) => {
        setUserDetails(resp.data);
      });
  }, [user]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const editProfile = () => {
    navigate("/Edit");
  };
  const [open1, setOpen1] = React.useState(false);
  const [newPass, setNewpass] = useState("");

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [obj1, setObj1] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const type = "password";
  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };
  const authValue1 = localStorage.getItem("authkey");
  const [toasterColor, setToasterColor] = useState("");
  const [toasterMessage, setToasterMessage] = useState("");
  const [open55, setOpen55] = useState(false);

  const changePassword = () => {
    if (newPass === obj1.newPassword) {
      axios
        .put("http://localhost:3300/api/user/updatePassword", obj1, {
          headers: {
            authorization: authValue1,
          },
        })
        .then((resp) => {
          setToasterColor("success");
          setToasterMessage("Password changed successfully!");
          setOpen55(true);
          handleClose1();
        })
        .catch((err) => {
          setToasterColor("error");
          setToasterMessage(err.response.data.message);
          setOpen55(true);
        });
    } else {
      setToasterColor("error");
      setToasterMessage("Confirm Password and new Password should be same");
      setOpen55(true);
      return;
    }
  };
  const handleClose55 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen55(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const { headerName } = props.user;
  return (
    <AppBar position="static" sx={{ padding: "10px 0", bgcolor: "indianred" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant=""
            noWrap
            component="div"
            anchorEl={anchorElNav}
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <p>
              SOCIAL FEED {">>"} {headerName}
            </p>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src={"http://localhost:3300/assets/profile/" + userDetails.image}
              sx={{ width: 70, height: 70, bgcolor: "#30B9CE" }}
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {userDetails.firstname &&
                userDetails?.firstname[0]?.toUpperCase() +
                  userDetails?.lastname[0]?.toUpperCase()}
            </Avatar>

            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {headerName !== "EDIT PROFILE" ? (
                <MenuItem onClick={() => editProfile()}>Edit Profile</MenuItem>
              ) : (
                ""
              )}
              <MenuItem onClick={handleOpen1}>Change Password</MenuItem>
              <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: "flex" }}
              >
                <Box className="box">
                  <ChangePassword
                    value={{
                      handleClose1,
                      setToasterColor,
                      setToasterMessage,
                      setOpen55,
                    }}
                  />
                </Box>
              </Modal>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {toasterMessage && (
        <Snackbar open={open55} autoHideDuration={2000} onClose={handleClose55}>
          <Alert
            onClose={handleClose55}
            severity={toasterColor}
            sx={{ width: "100%" }}
          >
            {toasterMessage}
          </Alert>
        </Snackbar>
      )}
    </AppBar>
  );
}

export default NavBar;
