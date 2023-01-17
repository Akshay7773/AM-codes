import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userArray = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userArray[id]);
  const [states, setStates] = useState([]);
  const countr = Country.getAllCountries();

  // console.log(user);
  // console.log(countr);
  //only for practice
  const [isocode, setIsoCode] = useState("");
  useEffect(() => {
    const country = countr.find((element) => {
      return element.name === user.country;
    });
    setStates(State.getStatesOfCountry(country.isoCode));
    setIsoCode(country.isoCode);
  }, []);

  const selectedCountry = (e) => {
    // console.log(e.target.value);
    setStates(State.getStatesOfCountry(e.target.value));
    const myCountry = countr.find((c) => {
      return c.isoCode === e.target.value;
    });
    setUser({ ...user, country: myCountry.name });
  };
  let [arr2, setArr2] = useState([]);
  const setSkill = (e, skill) => {
    arr2 = skill;
    console.log(arr2);
    if (e.target.checked === true) {
      arr2.push(e.target.value);
    } else {
      setUser({
        ...user,
        skill: user.skill.filter((skill) => skill !== e.target.value),
      });
    }
    //react, java
    if (e.target.checked === true) setUser({ ...user, skill: arr2 });
  };
  const [flag, setFlag] = useState(false);
  const saveUser = () => {
    setFlag(true);
    if (
      user.fname === "" ||
      user.lname === "" ||
      user.gender === "" ||
      user.email === "" ||
      user.address === "" ||
      user.country === "" ||
      user.pin === "" ||
      user.skill.length < 3 ||
      user.experience.length < 2 ||
      user.experience.filter(
        (exp) =>
          exp.Cname === "" || exp.duration === "" || exp.responsibility === ""
      ).length
    )
      return;

    const arr2 = userArray;
    console.log(id);
    userArray &&
      userArray.map((singleUser, i) =>
        i === parseInt(id) ? (arr2[i] = user) : arr2
      );

    console.log(arr2);
    localStorage.setItem("user", JSON.stringify(arr2));
  };
  var pattern =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return (
    <div class="container my-4">
      <main>
        <div class="py-5 text-center">
          <h2>Edit Profile</h2>{" "}
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "blue",
              color: "white",
              position: "absolute",
              marginLeft: "25%",
            }}
          >
            Home
          </button>
        </div>

        <div class="row g-5">
          <div class="col-md-7 col-lg-8 ms-auto me-auto">
            <h4 class="mb-3">Basic Info</h4>
            <div class="row g-3">
              <div class="col-sm-6">
                <label class="form-label">First name</label>
                <input
                  onChange={(e) => setUser({ ...user, fname: e.target.value })}
                  value={user.fname}
                  type="text"
                  class="form-control"
                />
                {flag && user.fname === "" ? (
                  <p style={{ color: "red" }}>first name is required</p>
                ) : (
                  ""
                )}
              </div>

              <div class="col-sm-6">
                <label class="form-label">Last name</label>
                <input
                  onChange={(e) => setUser({ ...user, lname: e.target.value })}
                  value={user.lname}
                  type="text"
                  class="form-control"
                />
                {flag && user.lname === "" ? (
                  <p style={{ color: "red" }}>last name is required</p>
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
                        setUser({ ...user, gender: e.target.value })
                      }
                      checked={user.gender === "Male"}
                      value="Male"
                      class="form-check-input"
                      type="radio"
                    />
                    <label class="form-check-label">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                      checked={user.gender === "Female"}
                      value="Female"
                      class="form-check-input"
                      type="radio"
                    />
                    <label class="form-check-label">Female</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                      checked={user.gender === "Other"}
                      value="Other"
                      class="form-check-input"
                      type="radio"
                    />
                    <label class="form-check-label">Other</label>
                  </div>
                </div>
                {flag && user.fname === "" ? (
                  <p style={{ color: "red" }}>Gender is required</p>
                ) : (
                  ""
                )}
              </div>

              <div class="col-12">
                <label class="form-label">Email</label>
                <input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                  type="email"
                  class="form-control"
                  placeholder="you@example.com"
                />
                {flag && (user.email === "" || !user.email.match(pattern)) ? (
                  <p style={{ color: "red" }}>valid email is require</p>
                ) : (
                  ""
                )}
              </div>

              <div class="col-12">
                <label class="form-label">Address</label>
                <textarea
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                  value={user.address}
                  class="form-control"
                  placeholder="1234 Main St"
                ></textarea>
                {flag && user.address === "" ? (
                  <p style={{ color: "red" }}>address is required</p>
                ) : (
                  ""
                )}
              </div>

              <div class="col-md-5">
                <label class="form-label">Country</label>
                <select
                  onChange={(e) => selectedCountry(e)}
                  value={isocode}
                  //   onChange={(e) => selectedCountry(e)}
                  class="form-select"
                >
                  <option value="">Choose...</option>
                  {Country.getAllCountries().map((country) => (
                    <option value={country.isoCode}>{country.name}</option>
                  ))}
                </select>
              </div>

              <div class="col-md-4">
                <label class="form-label">State</label>
                <select
                  onChange={(e) => setUser({ ...user, state: e.target.value })}
                  value={user.state}
                  class="form-select"
                >
                  <option value="">Choose...</option>
                  {states &&
                    states.map((state) => (
                      <option selected={user.state} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                </select>
              </div>

              <div class="col-md-3">
                <label class="form-label">Pin / Zip</label>
                <input
                  onChange={(e) => setUser({ ...user, pin: e.target.value })}
                  value={user.pin}
                  type="text"
                  class="form-control"
                />
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
                      //   onChange={(e) => setUser()}
                      onChange={(e) => setSkill(e, user.skill)}
                      value="Angular"
                      checked={user.skill.includes("Angular")}
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Angular</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => setSkill(e, user.skill)}
                      value="React"
                      checked={user.skill.includes("React")}
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">React</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => setSkill(e, user.skill)}
                      value="Node.JS"
                      checked={user.skill.includes("Node.JS")}
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Node.JS</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => setSkill(e, user.skill)}
                      value="JavaScript"
                      checked={user.skill.includes("JavaScript")}
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">JavaScript</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => setSkill(e, user.skill)}
                      value="Flutter"
                      checked={user.skill.includes("Flutter")}
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Flutter</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      onChange={(e) => setSkill(e, user.skill)}
                      value="Java"
                      checked={user.skill.includes("Java")}
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label class="form-check-label">Java</label>
                  </div>
                  {flag && user.skill.length < 3 ? (
                    <p style={{ color: "red" }}>
                      minimum 3 skills are required
                    </p>
                  ) : (
                    ""
                  )}
                </div>
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
                {user.experience &&
                  user.experience.map((exp, i) => (
                    <div class="card mx-3 mt-3">
                      <div class="card-body">
                        <h6 class="card-title text-muted mb-3">
                          Experience #{i + 1}
                          <a
                            onClick={() =>
                              user.experience.length > 2
                                ? setUser({
                                    ...user,
                                    experience: user.experience.filter(
                                      (exp, j) => i !== j
                                    ),
                                  })
                                : user
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
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  experience: user.experience.map((exp, j) =>
                                    i === j
                                      ? {
                                          ...user.experience[i],
                                          Cname: e.target.value,
                                        }
                                      : exp
                                  ),
                                })
                              }
                              value={exp.Cname}
                              type="text"
                              class="form-control"
                            />
                            {flag && user.experience[i].Cname === "" ? (
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
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  experience: user.experience.map((exp, j) =>
                                    i === j
                                      ? {
                                          ...user.experience[i],
                                          duration: e.target.value,
                                        }
                                      : exp
                                  ),
                                })
                              }
                              value={exp.duration}
                              type="number"
                              class="form-control"
                            />
                            {flag && user.experience[i].duration === "" ? (
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
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  experience: user.experience.map((exp, j) =>
                                    i === j
                                      ? {
                                          ...user.experience[i],
                                          responsibility: e.target.value,
                                        }
                                      : exp
                                  ),
                                })
                              }
                              value={exp.responsibility}
                              class="form-control"
                            ></textarea>
                            {flag &&
                            user.experience[i].responsibility === "" ? (
                              <p style={{ color: "red" }}>
                                responsibility required
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <a
                  class="d-block mt-3"
                  onClick={() =>
                    user.experience.length < 5
                      ? setUser({
                          ...user,
                          experience: [
                            ...user.experience,
                            {
                              Cname: "",
                              duration: "",
                              responsibility: "",
                            },
                          ],
                        })
                      : user
                  }
                >
                  Add more experience
                </a>
                {flag &&
                user.experience.filter(
                  (exp) =>
                    exp.Cname === "" ||
                    exp.duration === "" ||
                    exp.responsibility === ""
                ).length ? (
                  <p style={{ color: "red" }}>All fields are required </p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <hr class="my-4" />

            <button
              onClick={() => saveUser()}
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

export default Edit;
