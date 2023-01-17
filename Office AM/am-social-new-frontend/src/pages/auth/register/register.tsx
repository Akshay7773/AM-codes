import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./register.scss";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../../utils/auth.service";

export default function Register() {
  const { handleSubmit, register } = useForm();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const doRegister = (formData: any) => {
    console.log("hello world", formData);
    // setButtonDisabled(true);
    authenticationService
      .register(formData) //{ email: "fake@example.com", password: "akash@123" })
      .then((response: any) => {
        setButtonDisabled(false);
        console.log("response", response);
      })
      .catch((error) => {
        setButtonDisabled(false);
        console.log(error);
      });
  };

  return (
    <div className="bg-container">
      <div
        className="emailAndPass"
        style={{
          textAlign: "center",
          marginLeft: "20%",
          marginRight: "20%",
        }}
      >
        <h2>Sign Up</h2>
        <Box
          component="form"
          onSubmit={handleSubmit(doRegister)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("firstname", { required: true })}
            style={{
              width: "40%",
              backgroundColor: "white",
              borderRadius: "10px",
              marginBottom: "3%",
            }}
            label="First Name"
          />
          <br />
          <br />
          <TextField
            {...register("lastname", { required: true })}
            style={{
              width: "40%",
              backgroundColor: "white",
              borderRadius: "10px",
              marginBottom: "3%",
            }}
            label="Last Name"
          />
          <br />
          <br />
          <TextField
            {...register("email", { required: true })}
            style={{
              width: "40%",
              backgroundColor: "white",
              borderRadius: "10px",
              marginBottom: "3%",
            }}
            label="Email"
          />
          <br />
          <br />
          <TextField
            {...register("password", { required: true })}
            style={{
              width: "40%",
              backgroundColor: "white",
              borderRadius: "10px",
              marginBottom: "3%",
            }}
            label="Password"
          />
          <br />
          <br />
          <Button
            // onClick={() => register()}
            type="submit"
            variant="contained"
            disableElevation
            style={{ marginTop: "5px", padding: "1% 8%" }}
            // style={{ padding: "1% 10%" }}
          >
            Register
          </Button>
        </Box>
      </div>
    </div>
  );
}
