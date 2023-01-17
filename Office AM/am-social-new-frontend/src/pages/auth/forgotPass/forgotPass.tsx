import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import history from "../../../routes/history";
import { paths } from "../../../routes/routes.config";
import { useForm } from "react-hook-form";
import { authenticationService } from "../../../utils/auth.service";
import { showErrorToast } from "../../../utils/toastUtil";
import { showSuccessToast } from "../../../utils/toastUtil";

export default function ForgotPass() {
  const { handleSubmit, register } = useForm();
  const [enable, setEnable] = useState(false);
  console.log(enable);
  const submitbtn = (formData: any) => {
    // setEnable(true);
    authenticationService
      .requestPasswordReset(formData) //{ email: "fake@example.com", password: "akash@123" })
      .then((response: any) => {
        showSuccessToast("Check your email");

        setEnable(true);
      })
      .catch((error) => {
        setEnable(false);
        console.log(error.message);
        showErrorToast(error.message);
      });
  };

  const navigateToLogin = () => {
    console.log("first");
    history.push(paths.login);
    window.location.reload();
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <Card sx={{ width: 500, border: "1px solid black" }}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: "red[500]" }} aria-label="recipe">
          //     R
          //   </Avatar>
          // }
          action={
            <IconButton aria-label="settings">
              {/* <MoreVertIco /> */}
            </IconButton>
          }
          title="Forgot Password"
          // subheader="September 14, 2016"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={"bold"}
          >
            Please enter your email address to RESET your acount Password.
          </Typography>
        </CardContent>
        <TextField
          {...register("email", { required: true })}
          style={{ marginLeft: "20px", marginBottom: "10px", width: "60%" }}
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
        />
        <br />
        <div style={{ marginLeft: "60%", marginBottom: "10px" }}>
          <Button
            style={{ marginRight: "10px" }}
            variant="outlined"
            onClick={() => navigateToLogin()}
          >
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit(submitbtn)}>
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
}
