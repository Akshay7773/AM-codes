import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function PlaceOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  let list = location.state.newList;
  let cnt = location.state.cnt;
  let price = location.state.price;
  // console.log(list);

  const [uniqueArray, setUniqueArray] = useState([]);
  useEffect(() => {
    setUniqueArray([
      ...new Map(list.map((item) => [JSON.stringify(item), item])).values(),
    ]);
  }, [list]);

  let data = [];
  for (let i = 0; i < list.length; i++) {
    data.push(list[i].list.data);
  }
  console.log(data);
  // const [obj, setObj] = useState({});
  //set(array.map(data=> {return{_id:data._id,name:data.name}}))

  const obj =
    data &&
    data.map((d, index) => {
      return {
        price: d.price,
        productID: d._id,
        qty: cnt[index],
        total: parseInt(d.price) * cnt[index],
      };
    });

  console.log(obj);
  // console.log("hello", ob);s

  const [myObj, setMyObj] = useState({
    personName: "",
    deliveryAddress: "",
    productsOrdered: obj,
    orderedTotal: parseInt(price),
  });

  console.log(myObj);
  const ConfirmOrder = () => {
    axios
      .post("http://interviewapi.ngminds.com/api/placeOrder", myObj)
      .then((response) => {
        console.log("Ordered Placed Successfully ");
        navigate("/SuccessPlaceOrder");
      });
  };
  console.log(myObj);
  return (
    <div>
      <div class="container">
        <div class="row">
          <h1>
            <a href="/">My Ecommerce Site</a>

            <span class="pull-right">
              <a href="cart.html">Cart ({uniqueArray.length})</a>
            </span>
          </h1>
          <hr />
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="panel-heading">Place Order</div>
              <div class="panel-body">
                <form class="form-horizontal" role="form">
                  <table class="table table-striped">
                    <thead class="table-head">
                      <tr>
                        <td>Product Name</td>
                        <td> Quntity</td>
                        <td> SubTotal</td>
                      </tr>
                    </thead>

                    <tbody>
                      {list &&
                        list.map((ls, index) => (
                          <tr>
                            <td>{ls.list.data.name} </td>
                            <td>{cnt[index]}</td>
                            <td>
                              <i class="fa fa-inr">
                                {parseInt(ls.list.data.price) *
                                  parseInt(cnt[index])}
                              </i>
                              {}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <br />

                  <br />
                  <div class="form-group">
                    <label for="inputName3" class="col-sm-2 control-label">
                      Enter Order Details
                    </label>
                  </div>
                  <div class="form-group">
                    <label for="inputName3" class="col-sm-2 control-label">
                      Name
                    </label>
                    <div class="col-sm-6">
                      <input
                        onChange={(e) =>
                          setMyObj({ ...myObj, personName: e.target.value })
                        }
                        name="personName"
                        class="form-control"
                        id="inputName3"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">
                      Address
                    </label>
                    <div class="col-sm-6">
                      <textarea
                        onChange={(e) =>
                          setMyObj({
                            ...myObj,
                            deliveryAddress: e.target.value,
                          })
                        }
                        name="deliveryAddress"
                        class="form-control"
                        id="inputEmail3"
                        placeholder="Deliver Address"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label"></label>
                    <div class="col-sm-6">
                      <button
                        type="button"
                        onClick={() => ConfirmOrder()}
                        class="btn btn-warning"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
