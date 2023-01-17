import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
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
// import { Checkbox } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import { Slider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

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
const hobby = [
  "playing cricket",
  "reading books",
  "watching tv",
  "playing football",
];
function Update() {
  const navigate = useNavigate();
  const id = useParams();
  const i = id.id;
  console.log(id);
  const location = useLocation();
  const state = location.state;
  console.log(state);
  let values = JSON.parse(localStorage.getItem("myArr"));
  const [inputstateValue, setInputstateValue] = useState("");
  const [inputdistValue, setInputdistValue] = useState("");
  const [flag, setFlag] = useState(true);

  const [name, setName] = useState(state.name);
  const [email, setEmail] = useState(state.email);
  const [contact, setContact] = useState(state.contact);

  const [address, setAddress] = useState(state.address);
  const [statess, setStatess] = useState(state.state);
  const [dist, setdist] = useState(state.district);
  const [birthD, setBirthD] = useState(state.birthDate);
  const [gender, setGender] = useState(state.gender);
  const [password, setPassword] = useState(state.password);
  const [communicationRate, setCommunicationRate] = useState(
    state.communicationRate
  );
  const [hobbies, setHobbies] = useState(state.hobbies);
  console.log(birthD);
  const [mymainobj, setMyMainObj] = useState({
    name: name,
    email: email,
    contact: contact,
    address: address,
    state: statess,
    district: dist,
    birthDate: birthD,
    gender: gender,
    password: password,
    hobbies: hobbies,
    communicationRate: communicationRate,
  });
  console.log(mymainobj.birthDate);

  const updateEmployee = () => {
    // console.log(mymainobj, parseInt(i));
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
      let temp = values;
      temp = temp.map((d, j) => (j === parseInt(i) ? (d = mymainobj) : d));
      console.log(temp);
      localStorage.setItem("myArr", JSON.stringify(temp));
      navigate("/Employee");
    }
    // console.log(name);
  };
  const setMobNumber = (e) => {
    console.log(contact);
    if (contact.length > 10) alert("wrong input");
    setMyMainObj({ ...mymainobj, contact: e.target.value });
    setContact(e.target.value);
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
  console.log(hobbies);
  return (
    <div>
      <center>
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
                error={mymainobj.name === "" && flag ? true : false}
                required
                id="outlined-required"
                label="Required"
                defaultValue={name}
                onChange={(e) =>
                  setMyMainObj({ ...mymainobj, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <label>Email:</label>
              <TextField
                // onChange={(e) =>
                //   setMyMainObj({ ...mymainobj, email: e.target.value })
                // }
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
                defaultValue={email}
                onChange={(e) =>
                  setMyMainObj({ ...mymainobj, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <label>Mobile No.:</label>
              <TextField
                //   error
                error={
                  mymainobj.contact.length > 10 || mymainobj.contact.length < 10
                    ? true && flag
                    : false
                }
                onChange={(e) => setMobNumber(e)}
                id="outlined-error-helper-text"
                //   label="Required"
                defaultValue={contact}
                //   helperText="Incorrect entry."
              />
            </Grid>
            <Grid item xs={4}>
              <label>Address:</label>
              <TextField
                //   onChange={(e) => setEmail(e.target.value)}
                required
                id="outlined-required"
                label="Required"
                defaultValue={address}
                onChange={(e) =>
                  setMyMainObj({ ...mymainobj, address: e.target.value })
                }
              />
            </Grid>{" "}
            <Grid item xs={4}>
              <label>States:</label>
              <Autocomplete
                defaultValue={statess}
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
                defaultValue={dist}
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
            <Grid item xs={4}>
              <label>Birth Date:</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={mymainobj.birthDate}
                  // value={mymainobj.birthDate}
                  onChange={(newValue) => {
                    setMyMainObj({ ...mymainobj, birthDate: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
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
                  defaultValue={gender}
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
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <label>Password: </label>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                defaultValue={password}
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
                  control={
                    <Checkbox
                      defaultChecked={hobbies.includes("playing cricket")}
                    />
                  }
                  label="playing cricket"
                />
                <FormControlLabel
                  value="reading books"
                  control={
                    <Checkbox
                      defaultChecked={hobbies.includes("reading books")}
                    />
                  }
                  label="reading books"
                />

                <FormControlLabel
                  value="watching tv"
                  control={
                    <Checkbox
                      defaultChecked={hobbies.includes("watching tv")}
                    />
                  }
                  label="watching tv"
                />
                <FormControlLabel
                  value="playing football"
                  control={
                    <Checkbox
                      defaultChecked={hobbies.includes("playing football")}
                    />
                  }
                  label="playing football"
                /> */}{" "}
                {hobby &&
                  hobby.map((h, i) => (
                    <Grid item xs={15}>
                      <FormControlLabel
                        onChange={(e) => setvalues(e, i)}
                        value={h}
                        control={
                          <Checkbox defaultChecked={hobbies.includes(h)} />
                        }
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
                  defaultValue={communicationRate}
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
        <Button
          variant="contained"
          size="medium"
          onClick={() => updateEmployee()}
        >
          Update
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
    </div>
  );
}

export default Update;
