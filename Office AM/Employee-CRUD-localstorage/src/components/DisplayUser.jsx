import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function DisplayUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [cnt, setcnt] = useState(0);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [cnt]);

  function calculateExp(exp, i) {
    let total = exp.reduce(function (prev, current) {
      return prev + +current.duration;
    }, 0);
    return total;
  }
  const deleteUser = (i) => {
    let arr = user;
    setcnt((prev) => prev + 1);
    arr.splice(i, 1);
    setUser(arr);
    localStorage.setItem("user", JSON.stringify(arr));
  };
  const editProfile = (person, i) => {
    console.log(person);
    navigate(`/edit/${i}`, { state: person });
  };
  return (
    <div class="container my-4">
      <main>
        <div class="py-5">
          <h2>
            Candidates List
            <button
              class="btn btn-primary float-end"
              onClick={() => navigate("/register")}
            >
              Add Candidate
            </button>
          </h2>
        </div>

        <div class="row">
          <div class="col-12 ms-auto me-auto">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number of Skills</th>
                    <th>Total Work Experience (in months)</th>
                    <th>Actions</th>
                  </tr>
                  {/* <tr> */}
                  {user &&
                    user.map((person, i) => (
                      <tr>
                        {" "}
                        <td>{i + 1}</td>
                        <td>
                          {person.fname} {person.lname}
                        </td>
                        <td>{person.email}</td>
                        <td>{person.skill.length}</td>
                        <td>{calculateExp(person.experience, i)}</td>
                        <td>
                          <a href="#" onClick={() => editProfile(person, i)}>
                            Edit
                          </a>
                          <a
                            class="text-danger ms-2"
                            onClick={() => deleteUser(i)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DisplayUser;
