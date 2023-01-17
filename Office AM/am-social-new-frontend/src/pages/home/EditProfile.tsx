import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MuiPhoneNumber from "material-ui-phone-number";

function EditProfile() {
  const [value, setValue] = React.useState(new Date());
  const [image, setImage] = React.useState<any>();
  const changeimg = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  console.log(image);
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
      <Grid container>
        <Grid item md={4} sx={{ m: "auto" }}>
          <div style={{ margin: "0 10% 0 10%" }}>
            {image !== "" || image !== "undefined" ? (
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
                src={image}
                // src={
                //   imageUrl === ""
                //     ? `http://localhost:3300/assets/profile/${userDetails.image}`
                //     : imageUrl
                // }
              />
            ) : (
              ""
            )}
          </div>
          <div style={{ margin: "5% 0  0 30%", wordWrap: "break-word" }}>
            <input
              type="file"
              // multiple
              // ref={imageRef}
              accept="image/*"
              onChange={(e) => changeimg(e)}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "indianred",
                fontSize: "10px",
                margin: "5% 0 0 0%",
              }}
              // onClick={() => {
              //   setUserDetails({ ...userDetails, image: "" });
              //   setImageUrl("");
              //   imageRef.current.value = null;
              // }}
            >
              Remove Profile
            </Button>
          </div>
        </Grid>

        <Grid md={8}>
          <Grid container rowSpacing={5} spacing={5} width="100%">
            <Grid item md={6}>
              <TextField label="Username" />
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
                  // value={userDetails && userDetails.gender + ""}
                  // onChange={(e) =>
                  //   setUserDetails({ ...userDetails, gender: e.target.value })
                  // }
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />

                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={8}>
              <TextField
                label="Bio"
                // style={{ width: "50%" }}
                // value={userDetails && userDetails.lastname}
                // InputLabelProps={{ shrink: true }}
                // onChange={(e) =>
                //   setUserDetails({ ...userDetails, bio: e.target.value })
                // }
              />
            </Grid>
            <Grid item md={8}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="For desktop"
                  value={value}
                  minDate={new Date("2017-01-01")}
                  // onChange={(newValue) => {
                  //   setValue(newValue);
                  // }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={8}>
              <MuiPhoneNumber
                name="phone"
                label="Phone Number"
                data-cy="user-phone"
                defaultCountry={"us"}
                // value={this.state.phone}
                // onChange={this.handlePhoneChange}
              />
            </Grid>
            <Grid item md={4}></Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button
        // onClick={(e) => updateUser(e)}
        style={{
          margin: "3% 0 0 36.2%",
          backgroundColor: "indianred",
          // padding: "0.5% 5% 0.5% 5%",
          padding: "10px 10px",
        }}
        variant="contained"
      >
        Update Profile
      </Button>
    </div>
  );
}

export default EditProfile;
