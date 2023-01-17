import React, { useState } from "react";
import { TextareaAutosize, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { Autocomplete } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Radio } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { FormGroup } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Slider } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
function Add() {
  const navigate = useNavigate();
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Bihar",
    "Chhattisagarh",
    "Goa",
    "Gujrat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Assam",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajsthan",
    "Sikkim",
    "Tamilnadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
  ];

  const districts = [
    "Punji",
    "Margao",
    "Ahmedabad",
    "Anand",
    "Belgaum",
    "Mysore",
    "Bengalore",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Gadchiroli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Dhule",
    "Nagpur",
    "Nashik",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Thane",
    "Wardha",
    "Washim",
  ];
  const [mymainArr, setMyMainArr] = useState([]);
  const [flag, setFlag] = useState(false);
  const [mymainobj, setMyMainObj] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    state: states[0],
    district: districts[0],
    birthDate: new Date(),
    gender: "",
    password: "",
    hobbies: [],
    communicationRate: 0,
  });

  console.log(mymainobj);
  //   console.log(dateValue);
  const hobby = [
    "playing cricket",
    "reading books",
    "watching tv",
    "playing football",
  ];
  const [stateValue, setstateValue] = useState(states[0]);
  const [inputstateValue, setInputstateValue] = useState("");
  const [distValue, setdistValue] = useState(districts[0]);
  const [inputdistValue, setInputdistValue] = useState("");
  const [val, setVal] = useState([]);
  console.log("val", val);
  //   console.log(email);
  const setMobNumber = (e) => {
    if (parseInt(e.target.value.length) > 10)
      alert("mobile no is not greater than 10");
    setMyMainObj({ ...mymainobj, contact: e.target.value });
  };

  const setName = (e) => {
    console.log("first");
    setMyMainObj({ ...mymainobj, name: e.target.value });
  };
  const setvalues = (e, id) => {
    if (e.target.checked)
      setMyMainObj({
        ...mymainobj,
        hobbies: [...mymainobj.hobbies, e.target.value],
      });
    else
      setMyMainObj({
        ...mymainobj,
        hobbies: mymainobj.hobbies.filter((h) => h !== e.target.value),
      });
  };

  const AddEmployee = () => {
    if (
      mymainobj.name === "" ||
      mymainobj.email === "" ||
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mymainobj.email) ===
        false ||
      mymainobj.contact === "" ||
      mymainobj.contact.length > 10 ||
      mymainobj.gender === "" ||
      mymainobj.password === "" ||
      mymainobj.hobbies.length === 0
    ) {
      setFlag(true);
    } else {
      mymainArr.push(mymainobj);
      let mylocalArray = JSON.parse(localStorage.getItem("myArr"));
      console.log(mylocalArray);
      if (mylocalArray === null)
        localStorage.setItem("myArr", JSON.stringify(mymainArr));
      else
        localStorage.setItem(
          "myArr",
          JSON.stringify([...mylocalArray, mymainobj])
        );
      navigate("/Employees");
    }
  };
  console.log(mymainArr);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <center>
        <h2>ADD EMPLOYEE</h2>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, margin: "auto" },
          }}
          noValidate
          autoComplete="off"
        >
          {" "}
          <Grid container spacing={2} sx={{ margin: "auto", width: "100%" }}>
            <Grid item xs={4}>
              <label>Name:</label>

              <TextField
                fullWidth
                error={mymainobj.name === "" && flag ? true : false}
                required
                id="outlined-required"
                label="Required"
                // defaultValue="Hello World"
                onChange={(e) => setName(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <label>Email:</label>
              <TextField
                fullWidth
                onChange={(e) =>
                  setMyMainObj({ ...mymainobj, email: e.target.value })
                }
                error={
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    mymainobj.email
                  ) === true
                    ? false
                    : true && flag
                }
                required
                id="outlined-required"
                label="Required"
              />
            </Grid>
            <Grid item xs={4}>
              <label>Mobile No.:</label>
              <TextField
                fullWidth
                error={
                  mymainobj.contact.length > 10 || mymainobj.contact.length < 10
                    ? true && flag
                    : false
                }
                onChange={(e) => setMobNumber(e)}
                id="outlined-error-helper-text"
                //   label="Required"
                //   defaultValue="Hello World"
                //   helperText="Incorrect entry."
              />
            </Grid>
            <Grid item xs={4}>
              Address:
              <br />
              <TextareaAutosize
                //   onChange={(e) => setEmail(e.target.value)}
                required
                id="outlined-required"
                label="Required"
                minRows="5"
                onChange={(e) =>
                  setMyMainObj({ ...mymainobj, address: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </Grid>{" "}
            <Grid item xs={4}>
              <label>States:</label>
              <Autocomplete
                style={{ width: "100%" }}
                defaultValue={stateValue}
                onChange={(event, newValue) => {
                  setMyMainObj({ ...mymainobj, state: newValue });
                }}
                inputValue={inputstateValue}
                onInputChange={(event, newInputValue) => {
                  setInputstateValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={states}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="states" />
                )}
              />
            </Grid>{" "}
            <Grid item xs={4}>
              <label>Districts: </label>
              <Autocomplete
                style={{ width: "100%" }}
                defaultValue={distValue}
                onChange={(event, newValue) => {
                  setMyMainObj({ ...mymainobj, district: newValue });
                }}
                inputValue={inputdistValue}
                onInputChange={(event, newInputValue) => {
                  setInputdistValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={districts}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="districts
          "
                  />
                )}
              />
            </Grid>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="year"
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> */}
            <Grid item xs={4}>
              <label>Birth Date:</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={mymainobj.birthDate}
                  onChange={(newValue) => {
                    setMyMainObj({ ...mymainobj, birthDate: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                onChange={(e) =>
                  setMyMainObj({ ...mymainobj, gender: e.target.value })
                }
              >
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                  {/* <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="other"
            /> */}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <label>Password: </label>
              <TextField
                fullWidth
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) =>
                  setMyMainObj({ ...mymainobj, password: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <label>Hobbies: </label>
              <FormGroup>
                {/* <FormControlLabel
            value="playing cricket"
            control={<Checkbox />}
            label="playing cricket"
          />
          <FormControlLabel
            value="reading books"
            control={<Checkbox />}
            label="reading books"
          />

          <FormControlLabel
            value="watching tv"
            control={<Checkbox />}
            label="watching tv"
          />
          <FormControlLabel
            value="playing football"
            control={<Checkbox />}
            label="playing football"
          /> */}
                {hobby &&
                  hobby.map((h, i) => (
                    <Grid item xs={15}>
                      <FormControlLabel
                        onChange={(e) => setvalues(e, i)}
                        value={h}
                        control={<Checkbox />}
                        label={h}
                      />
                    </Grid>
                  ))}
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="Small steps"
                  defaultValue={1}
                  onChange={(e) =>
                    setMyMainObj({
                      ...mymainobj,
                      communicationRate: e.target.value,
                    })
                  }
                  step={1}
                  marks
                  min={1}
                  max={5}
                  name="communicationValue"
                  valueLabelDisplay="auto"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <br />
        <br />

        <Button variant="contained" size="medium" onClick={() => AddEmployee()}>
          Add Employee
        </Button>
        <Button
          variant="contained"
          size="medium"
          color="error"
          onClick={() => navigate("/Employee")}
        >
          Cancel
        </Button>
      </center>
    </Box>
  );
}

export default Add;
