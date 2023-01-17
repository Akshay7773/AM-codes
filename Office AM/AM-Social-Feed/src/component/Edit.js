import * as React from "react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import MuiPhoneNumber from "material-ui-phone-number";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import NavBar from "./NavBar";

const Edit = (props) => {
  const { headerName, setHeaderName, setUpdatedUser } = props.values;
  setHeaderName("EDIT PROFILE");

  const formData = new FormData();
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterColor, setToasterColor] = useState("");
  const [updated, setUpdated] = useState(false);

  const imageRef = useRef();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [authValue, setAuthValue] = useState(localStorage.getItem("authkey"));
  const [userDetails, setUserDetails] = useState({});
  const [isupdate, setIsUpdate] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3300/api/profile/getProfile", {
        headers: {
          authorization: authValue,
        },
      })
      .then((resp) => {
        console.log(resp);
        setUserDetails(resp.data);
      });
  }, [updated]);

  const [open123, setOpen123] = React.useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const updateUser = (e) => {
    // console.log(obj);
    setIsUpdate(true);
    console.log(userDetails);
    formData.append("bio", userDetails.bio ? userDetails.bio : "");
    formData.append("gender", userDetails.gender ? userDetails.gender : "");
    formData.append("image", userDetails.image ? userDetails.image : "");
    formData.append(
      "userName",
      userDetails.userName ? userDetails.userName : ""
    );
    formData.append("dob", userDetails.dob ? userDetails.dob : new Date());
    formData.append("email", userDetails.email);
    formData.append("mobile", userDetails.mobile ? userDetails.mobile : "");
    console.log(formData.get("bio"));
    console.log(formData.get("gender"));
    console.log(formData.get("userName"));
    console.log(formData.get("dob"));
    console.log(formData.get("email"));
    console.log(formData.get("mobile"));

    axios
      .put(" http://localhost:3300/api/profile/update", formData, {
        headers: {
          authorization: authValue,
        },
      })
      .then((resp) => {
        formData.delete("bio");
        formData.delete("gender");
        formData.delete("image");
        formData.delete("userName");
        formData.delete("dob");
        formData.delete("email");
        formData.delete("mobile");
        setToasterColor("success");
        setToasterMessage("Edit profile successful!");
        setOpen123(true);
        setIsUpdate(false);
        setUpdated((prev) => !prev);
        setUpdatedUser(true);
        // localStorage.setItem("image", imageUrl);
        // console.log(URL.createObjectURL(e.target.files[0]));
      })
      .catch((err) => {
        console.log(err.response.data);
        setToasterColor("error");
        setToasterMessage(err.response.data);
        setOpen123(true);
      });
  };

  const [authValue1, setAuthValue1] = useState(localStorage.getItem("authkey"));

  const changeimg = (e) => {
    setUserDetails({ ...userDetails, image: e.target.files[0] });
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const handleClose55 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen123(false);
  };
  return (
    <div
      style={{
        height: "100%",
        padding: "20px",
        border: "20px solid rosybrown",
        borderBottom: "20px solid rosybrown",
        borderLeft: "20px solid rosybrown",
        borderRight: "20px solid rosybrown",
        backgroundColor: "white",
      }}
    >
      <div>
        <NavBar
          user={{ users: userDetails, isclicked: isupdate, headerName }}
        />
        <br />
        <br />
      </div>
      <br />
      <br />
      <Grid container>
        <Grid item md={4} sx={{ m: "auto" }}>
          <div style={{ margin: "0 10% 0 10%" }}>
            {userDetails.image || imageUrl ? (
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "3px",
                  background: "#30B9CE",

                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
                alt=""
                src={
                  imageUrl === ""
                    ? `http://localhost:3300/assets/profile/${userDetails.image}`
                    : imageUrl
                }
              />
            ) : (
              <Avatar
                sx={{
                  // height: "100%",
                  // width: "100%",
                  marginLeft: "30%",
                  fontSize: "30px",
                  padding: "20%",
                  background: "#30B9CE",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                {userDetails.firstname &&
                  userDetails?.firstname[0]?.toUpperCase() +
                    userDetails?.lastname[0]?.toUpperCase()}
              </Avatar>
            )}
          </div>
          <div style={{ margin: "5% 0  0 30%", wordWrap: "break-word" }}>
            <input
              type="file"
              // multiple
              ref={imageRef}
              accept="image/*"
              onChange={(e) => changeimg(e)}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "indianred",
                fontSize: "15px",
                margin: "5% 0 0 0%",
              }}
              onClick={() => {
                setUserDetails({ ...userDetails, image: "" });
                setImageUrl("");
                imageRef.current.value = null;
              }}
            >
              Remove Profile
            </Button>
          </div>
        </Grid>

        <Grid md={8}>
          <Grid container rowSpacing={5} spacing={5} width="100%">
            <Grid item md={4}>
              <TextField
                label="First name"
                // style={{ width: "60%" }}
                value={userDetails && userDetails.firstname}
                // onChange={(e) =>
                InputLabelProps={{ shrink: true }}
                //   setUserDetails({ ...userDetails, bio: e.target.value })
                // }
                fullWidth
                disabled
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                label="Last name"
                style={{ width: "50%" }}
                value={userDetails && userDetails.lastname}
                InputLabelProps={{ shrink: true }}
                // onChange={(e) =>
                //   setUserDetails({ ...userDetails, bio: e.target.value })
                // }
                disabled
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                label="User name"
                value={userDetails && userDetails.userName}
                // style={{ width: "30%" }}

                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    userName: e.target.value + "",
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                label="Email"
                value={userDetails && userDetails.email}
                InputLabelProps={{ shrink: true }}
                style={{ width: "50%" }}
                // fullWidth
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                label="Bio"
                // style={{ width: "50%" }}
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={userDetails && userDetails.bio}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, bio: e.target.value })
                }
              />
            </Grid>
            <Grid item md={8}>
              <FormControl style={{ width: "50%" }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={userDetails && userDetails.gender + ""}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, gender: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date of Birth"
                  InputLabelProps={{ shrink: true }}
                  value={
                    userDetails.dob ? new Date(userDetails.dob) : new Date()
                  }
                  // minDate={new Date("2017-01-01")}
                  onChange={(newValue) => {
                    setUserDetails({ ...userDetails, dob: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={8}>
              <MuiPhoneNumber
                variant="outlined"
                defaultCountry={"in"}
                value={userDetails && userDetails.mobile}
                style={{ width: "50%" }}
                onChange={(value) =>
                  setUserDetails({
                    ...userDetails,
                    mobile: value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Button
        onClick={(e) => updateUser(e)}
        style={{
          margin: "3% 0 0 45%",
          backgroundColor: "indianred",
          padding: "0.5% 5% 0.5% 5%",
        }}
        variant="contained"
      >
        Update Profile
      </Button>
      {toasterMessage && (
        <Snackbar
          open={open123}
          autoHideDuration={2000}
          onClose={handleClose55}
        >
          <Alert
            onClose={handleClose55}
            severity={toasterColor}
            sx={{ width: "100%" }}
          >
            {toasterMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};
export default Edit;
