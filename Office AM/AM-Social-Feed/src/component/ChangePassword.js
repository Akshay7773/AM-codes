import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function ChangePassword(props) {
  const { handleClose1, setToasterColor, setToasterMessage, setOpen55 } =
    props.value;
  const [obj1, setObj1] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const type = "password";
  const [newPass, setNewpass] = useState("");
  const authValue1 = localStorage.getItem("authkey");

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
          console.log(resp);
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
  return (
    <div>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        Current Password:{" "}
        <TextField
          size="small"
          type="password"
          onChange={(e) =>
            setObj1({
              ...obj1,
              currentPassword: e.target.value,
            })
          }
          sx={{ marginLeft: "10px" }}
        />
      </Typography>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        New Password:{" "}
        <TextField
          size="small"
          onChange={(e) => setNewpass(e.target.value)}
          type={type}
          sx={{ marginLeft: "10px" }}
        />
      </Typography>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        Confirm Password:{" "}
        <TextField
          size="small"
          type="password"
          onChange={(e) => setObj1({ ...obj1, newPassword: e.target.value })}
          error={obj1.newPassword !== newPass ? true : false}
          sx={{ marginLeft: "10px" }}
        />
      </Typography>
      <br />
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <Button variant="contained" onClick={changePassword}>
          Change Password
        </Button>{" "}
        <Button
          className="cancel-button"
          sx={{ background: "rgb(255,0,0)" }}
          variant="contained"
          onClick={handleClose1}
        >
          Cancel
        </Button>
      </Typography>
    </div>
  );
}

export default ChangePassword;
