import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Cart() {
  const [mydisp, setMyDisp] = useState([]);
  const [count, setCount] = useState([]);
  const [amount, setAmount] = useState(localStorage.getItem("sum"));
  let [cartArrLength, setCartArrayLength] = useState(
    localStorage.getItem("cartLen")
  );

  const navigate = useNavigate();
  // const [quantity, setQuantity]=useState(0);
  let [value, setValue] = useState(
    JSON.parse(localStorage.getItem("arrValue"))
  );

  const [data, setData] = useState(JSON.parse(localStorage.getItem("mydata")));

  useEffect(() => {
    let arr = [];

    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        let cnt = 0;
        for (let j = i + 1; j < data.length; j++) {
          if (data[i].data._id === data[j].data._id) {
            cnt++;
          }
        }
        setCount([...count, cnt]);
        if (cnt === 0) arr.push(data[i]);
      }
      setMyDisp(arr);
      console.log(arr);
    }
  }, [data, value]);
  console.log(mydisp);

  const increment = (index, mydata, e) => {
    let val = value && value.map((val, i) => (i === index ? val + 1 : val));
    setValue(val);
    localStorage.setItem("arrValue", JSON.stringify(val));
    let amt = amount;
    for (let i = 0; i < mydisp.length; i++) {
      if (mydisp[i].data._id === mydata.data._id)
        amt = parseInt(amt) + parseInt(mydata.data.price);
    }
    setAmount(amt);
    localStorage.setItem("sum", amt);
    let newData = [mydata, ...data];
    setData(newData);
    localStorage.setItem("mydata", JSON.stringify(newData));
  };

  const decreament = (index, mydata) => {
    let val =
      value &&
      value.map((val, i) => (i === index ? (val === 1 ? val : val - 1) : val));
    console.log(val);

    if (val[index] > 0) setValue(val);
    console.log(value);
    localStorage.setItem("arrValue", JSON.stringify(val));

    let amt = amount;

    if (value[index] > 1) {
      for (let i = 0; i < mydisp.length; i++) {
        if (mydisp[i].data._id === mydata.data._id)
          amt = parseInt(amt) - parseInt(mydata.data.price);
      }
      console.log(amt);
    }
    localStorage.setItem("arrValue", JSON.stringify(val));
    console.log(amt);
    setAmount(amt);
    localStorage.setItem("sum", amt);
    console.log(data);

    // let newData = data;

    // if (value[index] > 1) {
    //   if (data.length > 2) {
    //     for (let i = 0; i < data.length; i++) {
    //       if (data[i].data._id === mydata.data._id) {
    //         newData.splice(0, 1);
    //         break;
    //       }
    //     }
    //   }
    // }
    // console.log(newData);
    // setData(newData);

    // localStorage.setItem("mydata", JSON.stringify(newData));
  };
  function handleChange(event) {
    // console.log(event.target.value);
    setValue(event.target.value);
  }
  const removeItem = (id) => {
    let arr = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].data._id !== id) {
        arr.push(data[i]);
      }
    }
    let a = cartArrLength - 1;
    setCartArrayLength(a);
    localStorage.setItem("cartLen", a);
    console.log(arr);

    let amt = amount;
    for (let i = 0; i < mydisp.length; i++) {
      if (mydisp[i].data._id === id) {
        amt = amt - mydisp[i].data.price * value[i];
      }
    }
    setAmount(amt);
    localStorage.setItem("sum", amt);
    let arr2 = [];
    for (let i = 0; i < mydisp.length; i++) {
      if (mydisp[i].data._id !== id) {
        arr2.push(value[i]);
      }
    }

    setValue(arr2);
    localStorage.setItem("arrValue", JSON.stringify(arr2));

    setData(arr);
    setMyDisp(arr);
    localStorage.setItem("mydata", JSON.stringify(arr));
  };

  const placeOrder = (data) => {
    localStorage.setItem("dispArray", JSON.stringify(mydisp));
    localStorage.setItem("amount", amount);
    localStorage.setItem("values", JSON.stringify(value));
    if (amount > 500) navigate("/Home/Cart/PlaceOrder", { state: data });
    else alert("Please Shop above 500 Rs");
  };

  const continueShopping = () => {
    navigate("/Home");
  };
  // console.log(mydisp)
  return (
    <div className="container">
      <div className="row">
        <h1>
          <a href="/">My Ecommerce Site</a>

          <span className="pull-right">
            <p>Cart ({cartArrLength})</p>
          </span>
        </h1>
        <hr />
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">MY CART (1)</div>

            {mydisp &&
              mydisp.map((mydata, index) => (
                <div className="panel-body">
                  <div>
                    <div className="row">
                      <div className="col-md-3">
                        {" "}
                        <img
                          src={`http://interviewapi.ngminds.com/${mydata.data.image}`}
                          width="100px"
                          height="200px"
                          alt=""
                        />
                      </div>
                      <div className="col-md-3">
                        {" "}
                        {mydata.data.name}
                        <br />
                        <i className="fa fa-inr"></i>
                        {mydata.data.price}
                      </div>
                      <div className="col-md-3">
                        {" "}
                        quantity
                        <br />
                        <button
                          onClick={() => decreament(index, mydata)}
                          className="qtyminus"
                        >
                          -
                        </button>
                        <input
                          ng-model="qty"
                          type="text"
                          name="quantity"
                          className="qty"
                          size="5px"
                          value={value[index]}
                          onChange={handleChange}
                        />
                        <button onClick={(e) => increment(index, mydata, e)}>
                          +
                        </button>
                      </div>
                      <div className="col-md-3">
                        {" "}
                        <a
                          className="btn btn-warning"
                          onClick={() => removeItem(mydata.data._id)}
                        >
                          remove
                        </a>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            <div class="row">
              <div class="col-md-9">
                <label class="pull-right">Amount Payable</label>
              </div>
              <div class="col-md-3 ">{amount === 0 ? 0 : amount}</div>
            </div>
            <div className="panel-footer">
              <a onClick={() => continueShopping()} className="btn btn-success">
                Continue Shopping
              </a>
              <a
                onClick={() => placeOrder(data)}
                className="pull-right btn btn-danger"
              >
                Place Order
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
