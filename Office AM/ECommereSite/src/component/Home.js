import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const data = JSON.parse(localStorage.getItem("mydata"));
  let sortData = JSON.parse(localStorage.getItem("sortdata"));

  const [alldata, setAllData] = useState(data && data.length ? data : []);
  // console.log(data);
  // console.log(alldata);
  let [cartArrLength, setCartArrayLength] = useState(0);
  const navigate = useNavigate();
  const [datas, setDatas] = useState(
    sortData && sortData.length ? sortData : []
  );
  console.log(sortData);
  let newCartArrLen = localStorage.getItem("cartLen");
  // console.log(sortData);
  let val = localStorage.getItem("valueForSort");
  // console.log(val);
  const [valueForSort, setValueForSort] = useState(val);
  console.log(valueForSort);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  let [arr, setArr] = useState([]);
  let [j, setj] = useState(0);
  const [hideBtn, setHideBtn] = useState("");
  const [flag, setFlag] = useState(false);
  const [myflag, setMyFlag] = useState("true");
  const [dispArr, setDispArr] = useState([]);
  const [mydata, setMydata] = useState([]);
  useEffect(() => {
    myflag === "true" ? setMydata(dispArr) : setMydata(datas);
  }, [myflag, dispArr, datas]);
  console.log(mydata);
  // console.log(newCartArrLen);
  // console.log(datas);
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
      // console.log(arr1);
    }
  }, [datas, itemsPerPage]);
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
  console.log(dispArr);
  useEffect(() => {
    axios
      .get("http://interviewapi.ngminds.com/api/getAllProducts")
      .then((response) => setDatas(response.data.products));
  }, []);

  console.log(datas);
  const incCartValue = (data, id) => {
    setAllData([...alldata, { data }]);
    let datas = [...alldata, { data }];
    let arr = [];
    for (let i = 0; i < datas.length; i++) {
      let cnt = 0;
      for (let j = i + 1; j < datas.length; j++) {
        if (datas[i].data._id === datas[j].data._id) cnt++;
      }
      if (cnt === 0) arr.push(datas[i]);
    }
    setCartArrayLength(arr.length);
    localStorage.setItem("cartLen", arr.length);
  };

  const goToCart = () => {
    localStorage.setItem("mydata", JSON.stringify(alldata));
    console.log(alldata);
    let arr = [];
    let sum = 0;
    for (let i = 0; i < alldata.length; i++) {
      sum = sum + parseInt(alldata[i].data.price);
      let cnt = 0;
      for (let j = i + 1; j < alldata.length; j++) {
        if (alldata[i].data._id === alldata[j].data._id) {
          cnt++;
          break;
        }
      }

      if (cnt === 0) {
        let cnt2 = 0;
        for (let k = 0; k <= i; k++) {
          if (alldata[i].data._id === alldata[k].data._id) {
            cnt2++;
          }
        }
        arr.push(cnt2);
      }
      localStorage.setItem("arrValue", JSON.stringify(arr));
    }
    localStorage.setItem("sum", sum);
    navigate("/Home/Cart");
  };

  useEffect(() => {
    let arr = [];
    if (valueForSort === "default") {
      setj(0);
      window.localStorage.removeItem("sortdata");
      axios
        .get("http://interviewapi.ngminds.com/api/getAllProducts")
        .then((response) => setDatas(response.data.products));
    }
    if (valueForSort === "Low to High") {
      setj(0);
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
      setj(0);
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
    console.log(arr);
    setDatas(arr);
    localStorage.setItem("sortdata", JSON.stringify(arr));
  }, [valueForSort]);
  const sort = (e) => {
    localStorage.setItem("valueForSort", e.target.value);
    let d = localStorage.getItem("valueForSort");
    setValueForSort(d);
  };

  if (myflag === "false") console.log("first");
  if (myflag === "true") console.log("second");
  const changeDatas = (i) => {
    console.log(i);
    setj(i);
  };
  console.log("first");
  console.log("hide", hideBtn);
  const increment = () => {
    if (j < arr[arr.length - 2]) setj((prev) => prev + 1);
    if (j === arr.length - 1) setHideBtn("none");
  };
  const decrement = () => {
    if (j > 0) setj((prev) => prev - 1);
    if (j === 0) setHideBtn("none");
  };
  const setItems = (e) => {
    setj(0);
    setItemsPerPage(e.target.value);
    if (e.target.value === "default") setMyFlag("false");
  };
  console.log(myflag);
  return (
    <div>
      <div className="container">
        <h1>
          <a href="/">My Ecommerce Site</a>
          <span className="pull-right">
            <a onClick={() => goToCart()}>
              Cart (
              {parseInt(newCartArrLen) > 0 ? newCartArrLen : cartArrLength})
            </a>
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
          {mydata &&
            mydata &&
            mydata.map((datas, i) => (
              <div className="col-md-3">
                <div
                  key={i}
                  className={
                    i % 4 === 0
                      ? "bg-info"
                      : i % 4 !== 0 && i % 2 == 0
                      ? "bg-warning"
                      : i % 3 === 0 ||
                        (i % 3 === 1 && i % 4 !== 0 && i % 2 !== 0 && i !== 1)
                      ? "bg-danger"
                      : "bg-success"
                  }
                >
                  <img
                    src={`http://interviewapi.ngminds.com/${datas.image}`}
                    width="100"
                    height="200"
                    alt=""
                  />
                  <br />
                  <br />
                  <p>{datas.name}</p>
                  <p>
                    <i className="fa fa-inr"></i>
                    {datas.price}
                  </p>
                  <button
                    className="btn btn-warning"
                    onClick={() => incCartValue(datas, datas._id)}
                  >
                    Add to Cart
                  </button>
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
                  key={i}
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
              defaultValue="5"
              onChange={(e) => setItems(e)}
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
