import { Button, Card, CardHeader, IconButton, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../../utils/auth.service";
import { useLocation } from "react-router-dom";

export default function GetToken() {
  const { handleSubmit, register } = useForm();
  const { search } = useLocation();
  console.log(search);
  const token = search.split("=")[1];
  const submitbtn = (formData: any) => {
    console.log("hello EMAIL", formData);
    const { password } = formData;
    authenticationService
      .setPassword({ password: password }, token) //{ email: "fake@example.com", password: "akash@123" })
      .then((response: any) => {
        console.log("hello login");
      })
      .catch((error) => {});
  };

  const gotologin = () => {
    console.log("hello");
    authenticationService.gotoLogin();
  };
  return (
    <Card sx={{ width: 500, border: "1px solid black" }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">{/* <MoreVertIco /> */}</IconButton>
        }
        title="RESET Password"
        // subheader="September 14, 2016"
      />

      <TextField
        {...register("password", { required: true })}
        style={{ marginLeft: "20px", marginBottom: "10px", width: "60%" }}
        id="outlined-basic"
        label="enter new password"
        variant="outlined"
      />
      <br />
      <div style={{ marginLeft: "60%", marginBottom: "10px" }}>
        <Button
          style={{ marginRight: "10px" }}
          variant="outlined"
          onClick={handleSubmit(gotologin)}
        >
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit(submitbtn)}>
          Submit
        </Button>
      </div>
      <Button variant="contained" onClick={handleSubmit(gotologin)}>
        Login Page
      </Button>
    </Card>
  );
}
