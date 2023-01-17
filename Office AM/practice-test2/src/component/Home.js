import React, { useState, useEffect } from "react";
import axios from "axios";
function Home() {
  const data = JSON.parse(localStorage.getItem("mydata"));
  const [alldata, setAllData] = useState(data && data.length ? data : []);
  const [datas, setDatas] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  let [arr, setArr] = useState([]);
  let [j, setj] = useState(0);
  const [dispArr, setDispArr] = useState([]);
  const [hideBtn, setHideBtn] = useState("");
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (datas && datas.length) {
      let arr1 = [];
      if (datas.length % itemsPerPage === 0) {
        let size = parseInt(datas.length / itemsPerPage);
        for (let i = 1; i <= size; i++) {
          arr1.push(i);
        }
      } else {
        let size = parseInt(datas.length / itemsPerPage) + 1;
        for (let i = 1; i <= size; i++) {
          arr1.push(i);
        }
      }
      setArr(arr1);
    }
  }, [datas, itemsPerPage]);
  // console.log(arr);
  useEffect(() => {
    axios
      .get("http://interviewapi.ngminds.com/api/getAllProducts")
      .then((response) => setDatas(response.data.products));
  }, []);
  console.log(datas);
  const incCartValue = (data, id) => {
    setAllData([...alldata, { data }]);
  };

  useEffect(() => {
    let arr1 = [];
    console.log(j);
    let start = j * itemsPerPage; //5
    let end = start + parseInt(itemsPerPage); //
    if (flag === true) {
      start = 0;
      end = start + itemsPerPage;
    }
    console.log(start);
    console.log(end);
    if (end > datas.length) end = datas.length;
    // console.log(end);
    if (datas && datas.length) {
      for (let i = start; i < end; i++) {
        arr1.push(datas[i]);
      }
      console.log(arr1);
      setDispArr(arr1);
    }
    setFlag(false);
  }, [itemsPerPage, j, datas]);
  let hii = "none";
  // console.log(dispArr);
  //   console.log(alldata);
  const sort = (e) => {
    setj(0);
    setFlag(true);
    let arr = [];
    if (e.target.value === "default") {
      axios
        .get("http://interviewapi.ngminds.com/api/getAllProducts")
        .then((response) => setDatas(response.data.products));
    } else if (e.target.value === "Low to High") {
      for (let i = 0; i < datas.length; i++) {
        for (let j = i + 1; j < datas.length; j++) {
          if (parseInt(datas[i].price) > parseInt(datas[j].price)) {
            let temp = datas[i];
            datas[i] = datas[j];
            datas[j] = temp;
          }
        }
        arr.push(datas[i]);
      }
    } else {
      for (let i = 0; i < datas.length; i++) {
        for (let j = i + 1; j < datas.length; j++) {
          if (parseInt(datas[i].price) < parseInt(datas[j].price)) {
            let temp = datas[i];
            datas[i] = datas[j];
            datas[j] = temp;
          }
        }
        arr.push(datas[i]);
      }
    }
    setDatas(arr);
  };
  console.log("first");
  const changeDatas = (i) => {
    setj(i);
    console.log("first");
    console.log(i);
  };
  console.log("hide", hideBtn);
  const increment = () => {
    if (j < arr[arr.length - 2]) setj((prev) => prev + 1);
    if (j === arr.length - 1) setHideBtn("none");
  };
  const decrement = () => {
    if (j > 0) setj((prev) => prev - 1);
    if (j === 0) setHideBtn("none");
  };
  console.log(hideBtn);
  console.log(j);
  return (
    <div>
      <div className="container">
        <h1>
          <a>My Ecommerce Site</a>
          <span className="pull-right">
            <a>Cart (0)</a>
          </span>
        </h1>
        <hr />
        <div className="row">
          <div className="col-sm-12">
            <div className="secondDiv">
              <label className="control-label">Sort by:</label>
              <select onChange={(e) => sort(e)} name="" id="">
                <option value="default">Default</option>
                <option value="High to Low">High to Low</option>
                <option value="Low to High">Low to High</option>
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          {dispArr &&
            dispArr &&
            dispArr.map((datas, i) => (
              <div className="col-md-3" key={i}>
                <div
                  key={i}
                  className={
                    i % 4 === 0
                      ? "bg-info"
                      : i % 4 !== 0 && i % 2 == 0
                      ? "bg-warning"
                      : i % 4 === 1
                      ? "bg-danger"
                      : "bg-success"
                  }
                >
                  <img
                    src={`http://interviewapi.ngminds.com/${datas.image}`}
                    width="100"
                    height="200"
                  />
                  <br />
                  <br />
                  <p>{datas.name}</p>
                  <p>
                    <i className="fa fa-inr"></i>
                    {datas.price}
                  </p>
                  <a
                    className="btn btn-warning"
                    onClick={() => incCartValue(datas, datas._id)}
                  >
                    Add to Cart
                  </a>
                </div>
                <br></br>
                <br></br>
                <hr style={{ backgroundColor: "#000" }} />
              </div>
            ))}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                style={{ display: j === 0 ? "none" : "" }}
                onClick={() => decrement()}
              >
                Previous
              </a>
            </li>
            {arr &&
              arr.map((ar, i) => (
                <li
                  key={ar}
                  onClick={() => changeDatas(i)}
                  className={i === j ? "active" : ""}
                >
                  <a className="page-link">{ar}</a>
                </li>
              ))}
            <li className="page-item">
              <a
                style={{ display: j === arr.length - 1 ? "none" : "" }}
                className="page-link"
                onClick={() => increment()}
                href
              >
                Next
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm-4 text-right">
          <div className="lastDiv">
            <label className="control-label">Items Per Page:</label>
            <select
              onChange={(e) => setItemsPerPage(e.target.value)}
              name=""
              id=""
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
