import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function PlaceOrder() {
  const navigate = useNavigate();
  let dispArray = JSON.parse(localStorage.getItem("dispArray"));
  let values = JSON.parse(localStorage.getItem("values"));
  let amount = JSON.parse(localStorage.getItem("amount"));
  let arrLen = localStorage.getItem("cartLen");
  console.log(dispArray);

  const data = dispArray.map((itms, i) => {
    return {
      productID: itms.data._id,
      qty: values[i],
      price: itms.data.price,
      total: values[i] * itms.data.price,
    };
  });
  // console.log(data);
  const [postData, setPostData] = useState({
    personName: "",
    deliveryAddress: "",
    productsOrdered: data,
    orderedTotal: amount,
  });

  console.log(postData);

  const ConfirmOrder = () => {
    axios
      .post("http://interviewapi.ngminds.com/api/placeOrder", postData)
      .then((response) => {
        console.log("Ordered Placed Successfully ");
        navigate("/SuccessPlaceOrder");
      });
  };
  return (
    <div>
      <div class="container">
        <div class="row">
          <h1>
            <a href="/">My Ecommerce Site</a>

            <span class="pull-right">
              <a href="cart.html">Cart ({arrLen})</a>
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
                    {dispArray &&
                      dispArray.map((arr, i) => (
                        <tbody>
                          <tr>
                            <td>{arr.data.name} </td>
                            <td>{values[i]}</td>
                            <td>
                              <i class="fa fa-inr"></i>
                              {arr.data.price * values[i]}
                            </td>
                          </tr>
                        </tbody>
                      ))}
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
                        name="personName"
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            [e.target.name]: e.target.value,
                          })
                        }
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
                        name="deliveryAddress"
                        class="form-control"
                        id="inputEmail3"
                        placeholder="Deliver Address"
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label"></label>
                    <div class="col-sm-6">
                      <a onClick={() => ConfirmOrder()} class="btn btn-warning">
                        Confirm Order
                      </a>
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
