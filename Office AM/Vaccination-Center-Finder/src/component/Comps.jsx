import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function Comps() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://api.ngminds.com/states.json")
      .then((response) => setPosts(response.data.states));
  }, []);
  console.log(posts);

  const [cl1, setCl1] = useState(false);
  const [cl2, setcl2] = useState(true);
  const [dist, setDist] = useState([]);
  const changeDist = (e) => {
    axios
      .get(`http://api.ngminds.com/${e.target.value}.json`)
      .then((response) => {
        // console.log(response);
        setDist(response.data.districts);
      });
  };

  console.log(dist);
  const [data, setData] = useState([]);

  // const current = new Date();

  // const date = `${current.getDate()}/${
  //   current.getMonth() + 1
  // }/${current.getFullYear()}`;

  // var tomorrow = new Date();
  // tomorrow.setDate(new Date().getDate() + 1);
  // //   console.log(tomorrow);
  // const date1 = `${tomorrow.getDate()}/${
  //   tomorrow.getMonth() + 1
  // }/${tomorrow.getFullYear()}`;

  // console.log(date1);

  // console.log(date);
  const [data1, setData1] = useState([]);

  //
  // var tomorrow2 = new Date();
  // tomorrow.setDate(new Date().getDate() + 2);
  // //   console.log(tomorrow);
  // const date2 = `${tomorrow2.getDate() + 2}/${
  //   tomorrow2.getMonth() + 1
  // }/${tomorrow2.getFullYear()}`;

  //   var startdate = moment();
  // console.log(startdate.format("DD/MM/YYYY"))
  const [startdate, setStartdate] = useState(moment());
  const [date, setDate] = useState(startdate.format("DD/MM/YYYY"));
  const [date1, setDate1] = useState(
    startdate.add(1, "days").format("DD/MM/YYYY")
  );
  const [date2, setDate2] = useState(
    startdate.add(1, "days").format("DD/MM/YYYY")
  );
  const [data2, setData2] = useState([]);
  const [id, setId] = useState([]);
  const setDistricts = (e) => {
    setId(e.target.value);
  };
  const [cnt, setCnt] = useState(true);
  const setCnt1 = () => {
    setCnt(false);
    setcl2(false);
    setCl1(true);
  };
  const setCnt2 = () => {
    setCnt(true);
    setcl2(true);
    setCl1(false);
  };
  console.log(cnt);

  const [value, setValue] = useState("");
  const setInput = (e) => {
    setValue(e.target.value);
  };

  const setAllData = () => {
    console.log(id);
    if (cnt === true) {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
        )
        .then((response) => setData(response.data.sessions));

      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date1}`
        )
        .then((response) => setData1(response.data.sessions));

      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date2}`
        )
        .then((response) => setData2(response.data.sessions));
    } else {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${value}&date=${date}`
        )
        .then((response) => setData(response.data.sessions));

      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${value}&date=${date1}`
        )
        .then((response) => setData1(response.data.sessions));

      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${value}&date=${date2}`
        )
        .then((response) => setData2(response.data.sessions));
    }
  };

  console.log(data);
  console.log(data1);
  console.log(data2);
  // const array3 = [...data1, ...data];
  // console.log(array3);

  //   for (let i = 0; i < data.length; i++) {
  //     for (let j = 0; j < data1.length; j++) {
  //       if (data[i].center_id611049 === data1[j].center_id) {
  //         console.log(
  //           data[i].available_capacity,
  //           " ",
  //           data[j].available_capacity
  //         );
  //       }
  //     }
  //   }

  //   console.log(data2);
  //   console.log(dist);
  const prev = () => {
    console.log("first");
    let a = moment(date, "DD/MM/YYYY").subtract(3, "days").format("DD/MM/YYYY");
    setDate(a);
    let b = moment(date1, "DD/MM/YYYY")
      .subtract(3, "days")
      .format("DD/MM/YYYY");
    setDate1(b);
    let c = moment(date2, "DD/MM/YYYY")
      .subtract(3, "days")
      .format("DD/MM/YYYY");
    setDate2(c);
    console.log(a, b, c);
  };

  const next = () => {
    let a = moment(date, "DD/MM/YYYY").add(3, "days").format("DD/MM/YYYY");
    setDate(a);
    let b = moment(date1, "DD/MM/YYYY").add(3, "days").format("DD/MM/YYYY");
    setDate1(b);
    let c = moment(date2, "DD/MM/YYYY").add(3, "days").format("DD/MM/YYYY");
    setDate2(c);
    console.log(a, b, c);
  };

  useEffect(() => {
    console.log(id, value);
    if (id.length || value)
      if (cnt === true) {
        axios
          .get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
          )
          .then((response) => setData(response.data.sessions));

        axios
          .get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date1}`
          )
          .then((response) => setData1(response.data.sessions));

        axios
          .get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date2}`
          )
          .then((response) => setData2(response.data.sessions));
      } else {
        axios
          .get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${value}&date=${date}`
          )
          .then((response) => setData(response.data.sessions));

        axios
          .get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${value}&date=${date1}`
          )
          .then((response) => setData1(response.data.sessions));

        axios
          .get(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${value}&date=${date2}`
          )
          .then((response) => setData2(response.data.sessions));
      }
  }, [date]);

  //   console.log(cnt);
  //   useEffect(() => {
  //     if (cnt === true) {
  //       console.log("if");
  //       setcl2(true);
  //       setCl1(false);
  //     }
  //     if (cnt === false) {
  //       //   console.log("els if");
  //       setcl2(false);
  //       setCl1(true);
  //     }
  //   }, [cnt]);
  console.log(cl1);
  console.log(cl2);
  const hello = () => {
    console.log("first");
  };
  const hii = () => {
    console.log("second");
  };
  return (
    <div className="container my-5">
      <h3 className="text-center mb-5">
        Search Your Nearest Vaccination Center
      </h3>
      <div className="w-50 mx-auto">
        <div className="mt-4 mb-5">
          <ul className="nav nav-pills justify-content-center">
            <li className="nav-item">
              <button
                id="find_by_dist_anchor"
                className={`nav-link ${cl2 ? "active" : ""}`}
                aria-current="page"
                onClick={() => setCnt2()}
              >
                Find by District
              </button>
            </li>
            <li className="nav-item">
              <button
                id="find_by_pin_anchor"
                className={`nav-link ${cl1 ? "active" : ""}`}
                id="find_by_dist_anchor"
                aria-current="page"
                onClick={() => setCnt1()}
              >
                Find by PIN
              </button>
            </li>
          </ul>
        </div>
        {/* <div className="row" id="find_by_dist">
                  <div className="col">
                    <div className="form-group">
                      <select
                        onClick={(e) => changeDist(e)}
                        name=""
                        id=""
                        className="form-control"
                      >
                        <option value="">Select State</option>

                        {posts &&
                          posts.map((state) => (
                            <option value={state.state_id}>
                              {state.state_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <select
                        onClick={(e) => setDistricts(e)}
                        name=""
                        id=""
                        className="form-control"
                      >
                        <option>Select District</option>
                        {dist &&
                          dist.map((district) => (
                            <option value={district.district_id}>
                              {district.district_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-info" onClick={() => setAllData()}>
                      Search
                    </button>
                  </div>
                </div> */}
        {cnt === true ? (
          <div className="row" id="find_by_dist">
            <div className="col">
              <div className="form-group">
                <select
                  onClick={(e) => changeDist(e)}
                  name=""
                  id=""
                  className="form-control"
                >
                  <option value="">Select State</option>

                  {posts &&
                    posts.map((state) => (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <select
                  onClick={(e) => setDistricts(e)}
                  name=""
                  id=""
                  className="form-control"
                >
                  <option>Select District</option>
                  {dist &&
                    dist.map((district) => (
                      <option
                        key={district.district_id}
                        value={district.district_id}
                      >
                        {district.district_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        ) : (
          <input type="text" onChange={(e) => setInput(e)} />
        )}
        <div className="col-auto">
          <button className="btn btn-info" onClick={() => setAllData()}>
            Search
          </button>
        </div>
        <div className="row d-none" id="find_by_pin">
          <div className="col">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter your PIN"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-auto">
            <button className="btn btn-info">Search</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-5">
          <h6>Slot Search Results ({data.length} Center(s) Found)</h6>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-3 text-end pt-2">
              <div
                onClick={() => prev()}
                className="text-decoration-none text-secondary"
              >
                <h2>&#x3008;</h2>
              </div>
            </div>
            <div className="col">
              <div className="card my-2">
                <div className="card-body py-1 my-1">
                  <strong>
                    <small>{date}</small>
                  </strong>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card my-2">
                <div className="card-body py-1 my-1">
                  <strong>
                    <small>{date1}</small>
                  </strong>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card my-2">
                <div className="card-body py-1 my-1">
                  <strong>
                    <small>{date2}</small>
                  </strong>
                </div>
              </div>
            </div>

            <div className="col-auto pt-2">
              <div
                onClick={() => next()}
                className="text-decoration-none text-secondary"
              >
                <h2>&#12297;</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        {data &&
          data.map((names) => (
            <div className="row py-3 border-bottom">
              <div className="col-3">
                <div className="text-primary">{names.name}</div>
                <div className="text-muted">
                  <small>{names.address}</small>
                </div>
                <div>
                  <span className="me-1">
                    {names.vaccine}: ₹{names.fee}
                  </span>
                  <span
                    className={
                      names.fee_type === "Free"
                        ? "badge bg-success"
                        : "badge bg-warning"
                    }
                  >
                    {names.fee_type}
                  </span>
                </div>
                <small className="d-block">
                  <span className="text-primary me-3">
                    {/* Age: 18 & Above */}
                    Age:
                    {names.max_age_limit
                      ? `${names.min_age_limit} to ${names.max_age_limit}`
                      : `${names.min_age_limit} & above`}
                  </span>
                  <span>
                    Dose:{" "}
                    {(names.available_capacity_dose1 === 0 &&
                      names.available_capacity_dose2 === 0) ||
                    (names.available_capacity_dose1 !== 0 &&
                      names.available_capacity_dose2 !== 0)
                      ? "Precaution"
                      : names.available_capacity_dose1 === 0
                      ? "#2"
                      : "#1"}
                  </span>
                </small>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body d-table">
                    <div className="d-table-cell h-100 align-middle text-center">
                      <strong className="text-warning">
                        {names.available_capacity === 0 ? (
                          <div style={{ color: "red" }}>Booked</div>
                        ) : (
                          names.available_capacity
                        )}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body d-table">
                    <div className="d-table-cell h-100 align-middle text-center">
                      <strong className="text-success">
                        {data1 &&
                        data1.find(
                          (element) => element.center_id === names.center_id
                        )
                          ? data1 &&
                            data1.find(
                              (element) => element.center_id === names.center_id
                            ).available_capacity
                          : "NA"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body d-table">
                    <div className="d-table-cell h-100 align-middle text-center">
                      <strong className="text-success">
                        {data2 &&
                        data2.find(
                          (element) => element.center_id === names.center_id
                        )
                          ? data2 &&
                            data2.find(
                              (element) => element.center_id === names.center_id
                            ).available_capacity
                          : "NA"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="row py-3 border-bottom"></div>
      </div>
    </div>
  );
}

export default Comps;
