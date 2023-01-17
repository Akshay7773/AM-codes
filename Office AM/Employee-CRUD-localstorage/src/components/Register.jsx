import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  // console.log(Country.getAllCountries());
  const countr = Country.getAllCountries();
  //   console.log(State.getStatesOfCountry("AF"));
  const [states, setStates] = useState([]);

  const [basicObj, setBasicObj] = useState({
    fname: "",
    lname: "",
    gender: "",
    email: "",
    address: "",
    country: "",
    state: "",
    pin: "",
    skill: [],
    experience: [
      {
        Cname: "",
        duration: "",
        responsibility: "",
      },
      {
        Cname: "",
        duration: "",
        responsibility: "",
      },
    ],
  });

  const selectedCountry = (e) => {
    // console.log(e.target.value);
    setStates(State.getStatesOfCountry(e.target.value));
    const myCountry = countr.find((c) => {
      return c.isoCode === e.target.value;
    });
    setBasicObj({ ...basicObj, country: myCountry.name });
  };

  // console.log(states);
  const setEmail = (e) => {
    setBasicObj({ ...basicObj, email: e.target.value });
  };

  // console.log(basicObj);
  const [arr2, setArray2] = useState([]);
  const changeSkill = (e) => {
    // console.log(e.target.checked);

    if (e.target.checked === true) {
      arr2.push(e.target.value);
    } else {
      setBasicObj({
        ...basicObj,
        skill: basicObj.skill.filter((skill) => skill !== e.target.value),
      });
    }
    if (e.target.checked === true) setBasicObj({ ...basicObj, skill: arr2 });
    // console.log(arr2);
  };
  var pattern =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [flag, setFlag] = useState(false);
  const saveCandidate = () => {
    setFlag(true);
    if (
      basicObj.fname === "" ||
      basicObj.lname === "" ||
      basicObj.gender === "" ||
      basicObj.email === "" ||
      basicObj.address === "" ||
      basicObj.country === "" ||
      basicObj.pin === "" ||
      basicObj.skill.length < 3 ||
      basicObj.experience.length < 2 ||
      basicObj.experience.filter(
        (exp) =>
          exp.Cname === "" || exp.duration === "" || exp.responsibility === ""
      ).length
    )
      return;
    let arrays = [];
    arrays.push(basicObj);
    let valueFromLocal = JSON.parse(localStorage.getItem("user"));
    console.log(typeof valueFromLocal);
    if (valueFromLocal === "null" || valueFromLocal === null) {
      console.log("hello");
      localStorage.setItem("user", JSON.stringify(arrays));
    } else {
      console.log("hii");
      valueFromLocal.push(basicObj);
      console.log(valueFromLocal);
      localStorage.setItem("user", JSON.stringify(valueFromLocal));
    }
    console.log(valueFromLocal);
    navigate("/");
  };
  console.log(basicObj);
  return (
    <div class="container my-4">
      <main>
        <div class="py-5 text-center">
          <h2>Add Candidate</h2>
        </div>

        <div class="row g-5">
          <div class="col-md-7 col-lg-8 ms-auto me-auto">
            <h4 class="mb-3">Basic Info</h4>
            <div class="row g-3">
              <div class="col-sm-6">
                <label class="form-label">First name</label>
                <input
                  onChange={(e) =>
                    setBasicObj({ ...basicObj, fname: e.target.value })
                  }
                  type="text"
                  class="form-control"
                />
                {flag && basicObj.fname === "" ? (
                  <p style={{ color: "red" }}>Name is require</p>
                ) : (
                  ""
                )}
              </div>

              <div class="col-sm-6">
                <label class="form-label">Last name</label>
                <input
                  onChange={(e) =>
                    setBasicObj({ ...basicObj, lname: e.target.value })
                  }
                  type="text"
                  class="form-control"
                />
                {flag && basicObj.lname === "" ? (
                  <p style={{ color: "red" }}>Last Name is require</p>
                ) : (
                  ""
                )}
              </div>

              <div class="col-12">
                <label class="form-label">Gender</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) =>
                        setBasicObj({ ...basicObj, gender: e.target.value })
                      }
                      name="gender"
                      value="Male"
                      class="form-check-input"
                      type="radio"
                    />
                    <label class="form-check-label">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) =>
                        setBasicObj({ ...basicObj, gender: e.target.value })
                      }
                      name="gender"
                      value="Female"
                      class="form-check-input"
                      type="radio"
                    />
                    <label class="form-check-label">Female</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) =>
                        setBasicObj({ ...basicObj, gender: e.target.value })
                      }
                      name="gender"
                      value="Other"
                      class="form-check-input"
                      type="radio"
                    />
                    <label class="form-check-label">Other</label>
                  </div>
                  {flag && basicObj.gender === "" ? (
                    <p style={{ color: "red" }}>Gender is require</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div class="col-12">
                <label class="form-label">Email</label>
                <input
                  onChange={(e) => setEmail(e)}
                  type="email"
                  class="form-control"
                  placeholder="you@example.com"
                />
                {flag &&
                (basicObj.email === "" || !basicObj.email.match(pattern)) ? (
                  <p style={{ color: "red" }}>valid Email is require</p>
                ) : (
                  ""
                )}
              </div>

              <div class="col-12">
                <label class="form-label">Address</label>
                <textarea
                  onChange={(e) =>
                    setBasicObj({ ...basicObj, address: e.target.value })
                  }
                  class="form-control"
                  placeholder="1234 Main St"
                ></textarea>
                {flag && basicObj.address === "" ? (
                  <p style={{ color: "red" }}>Name is require</p>
                ) : (
                  ""
                )}
              </div>

              <div class="col-md-5">
                <label class="form-label">Country</label>
                <select
                  onChange={(e) => selectedCountry(e)}
                  class="form-select"
                >
                  <option value="">Choose...</option>

                  {Country.getAllCountries().map((country) => (
                    <option value={country.isoCode}>{country.name}</option>
                  ))}
                </select>
                {flag && basicObj.country === "" ? (
                  <p style={{ color: "red" }}>Country name is require</p>
                ) : (
                  ""
                )}
              </div>

              <div class="col-md-4">
                <label class="form-label">State</label>
                <select
                  onChange={(e) =>
                    setBasicObj({ ...basicObj, state: e.target.value })
                  }
                  class="form-select"
                >
                  <option value="">Choose...</option>
                  {/* <option>Maharashtra</option>
                  <option>Karnataka</option> */}
                  {states &&
                    states.map((state) => (
                      <option value={state.name}>{state.name}</option>
                    ))}
                </select>
                {flag && basicObj.state === "" ? (
                  <p style={{ color: "red" }}>state is require</p>
                ) : (
                  ""
                )}
              </div>

              <div class="col-md-3">
                <label class="form-label">Pin / Zip</label>
                <input
                  onChange={(e) =>
                    setBasicObj({ ...basicObj, pin: e.target.value })
                  }
                  type="text"
                  class="form-control"
                />
                {flag && basicObj.fname === "" ? (
                  <p style={{ color: "red" }}>Pin is require</p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <hr class="my-4" />

            <h4 class="mb-3">Professional Info</h4>

            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">
                  Choose your skills
                  <span class="small text-muted">(min 3 skills)</span>
                </label>
                <div class="mb-3">
                  <div class="form-check form-check-inline">
                    <input
                      onClick={(e) => changeSkill(e)}
                      value="Angular"
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Angular</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onClick={(e) => changeSkill(e)}
                      value="React"
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">React</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onClick={(e) => changeSkill(e)}
                      value="Node.JS"
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Node.JS</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onClick={(e) => changeSkill(e)}
                      value="JavaScript"
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">JavaScript</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onClick={(e) => changeSkill(e)}
                      value="Flutter"
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Flutter</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onClick={(e) => changeSkill(e)}
                      value="Java"
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Java</label>
                  </div>
                </div>
                {flag &&
                (basicObj.skill.length <= 0 || basicObj.skill.length < 3) ? (
                  <p style={{ color: "red" }}>
                    minimum three skills are required
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div class="row gy-3">
              <div class="col-12">
                <label class="form-label">
                  <strong>
                    Experience
                    <span class="small text-muted">(min 2, max 5 items)</span>
                  </strong>
                </label>
                <div class="card mx-3 mt-3">
                  {basicObj.experience &&
                    basicObj.experience.map((e, i) => (
                      <div class="card-body">
                        <h6 class="card-title text-muted mb-3">
                          Experience #{i + 1}
                          <a
                            // onClick={() => removeOpt(i)}
                            onClick={() =>
                              basicObj.experience.length > 2
                                ? setBasicObj({
                                    ...basicObj,
                                    experience: basicObj.experience.filter(
                                      (exp, j) => j !== i
                                    ),
                                  })
                                : basicObj
                            }
                            class="float-end text-danger fw-normal"
                          >
                            Remove
                          </a>
                        </h6>
                        <div class="row g-3">
                          <div class="col-6">
                            <label class="form-label">Company Name</label>
                            <input
                              value={e.Cname}
                              onChange={(e) =>
                                setBasicObj({
                                  ...basicObj,
                                  experience: basicObj.experience.map(
                                    (exp, j) =>
                                      i === j
                                        ? {
                                            ...basicObj.experience[i],
                                            Cname: e.target.value,
                                          }
                                        : exp
                                  ),
                                })
                              }
                              type="text"
                              class="form-control"
                            />
                            {basicObj.experience[i].Cname === "" && flag ? (
                              <p style={{ color: "red" }}>
                                Company name required
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div class="col-6">
                            <label class="form-label">
                              Duration{" "}
                              <span class="text-muted">(in months)</span>
                            </label>
                            <input
                              // onChange={(e) => setDuration(e, i)}
                              onChange={(e) =>
                                setBasicObj({
                                  ...basicObj,
                                  experience: basicObj.experience.map(
                                    (exp, j) =>
                                      i === j
                                        ? {
                                            ...basicObj.experience[i],
                                            duration: e.target.value,
                                          }
                                        : exp
                                  ),
                                })
                              }
                              type="number"
                              class="form-control"
                            />
                            {basicObj.experience[i].duration === "" && flag ? (
                              <p style={{ color: "red" }}>duration required</p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div class="col-12">
                            <label class="form-label">
                              Describe your responsibilities
                            </label>
                            <textarea
                              // onChange={(e) => setResp(e, i)}
                              onChange={(e) =>
                                setBasicObj({
                                  ...basicObj,
                                  experience: basicObj.experience.map(
                                    (exp, j) =>
                                      i === j
                                        ? {
                                            ...basicObj.experience[i],
                                            responsibility: e.target.value,
                                          }
                                        : exp
                                  ),
                                })
                              }
                              class="form-control"
                            ></textarea>
                            {basicObj.experience[i].responsibility === "" &&
                            flag ? (
                              <p style={{ color: "red" }}>
                                responsibility required
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {flag && basicObj.experience.length < 2 ? (
                          <p style={{ color: "red" }}>
                            Minimum two experiences are require
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                </div>
                {flag &&
                basicObj.experience.filter(
                  (exp) =>
                    exp.Cname === "" ||
                    exp.duration === "" ||
                    exp.responsibility === ""
                ).length ? (
                  <p style={{ color: "red" }}>All fields are required </p>
                ) : (
                  ""
                )}
                <a
                  class="d-block mt-3"
                  aria-disabled
                  onClick={() =>
                    basicObj.experience.length < 5
                      ? setBasicObj({
                          ...basicObj,
                          experience: [
                            ...basicObj.experience,
                            { Cname: "", duration: "", responsibility: "" },
                          ],
                        })
                      : basicObj
                  }
                  href
                >
                  Add more experience
                </a>
              </div>
            </div>

            <hr class="my-4" />

            <button
              onClick={() => saveCandidate()}
              class="btn btn-primary"
              type="submit"
            >
              Save Candidate
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
