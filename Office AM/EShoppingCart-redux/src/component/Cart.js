import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addData, remData, remove } from "../actions/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Cart() {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.todoReducer.price);
  const list = useSelector((state) => state.todoReducer.list);
  const navigate = useNavigate();

  let baseUrl = "http://xapi.ngminds.com/";

  const [newList, setNewList] = useState([]);
  const [numArray, setNumArray] = useState([]);

  console.log(newList);
  useEffect(() => {
    // if (list === []) console.log("first");
    const arrObjOne = [
      ...new Map(list.map((item) => [JSON.stringify(item), item])).values(),
    ];
    setNewList(arrObjOne);
  }, [price, list]);

  useEffect(() => {
    const arrObjOne = [
      ...new Map(list.map((item) => [JSON.stringify(item), item])).values(),
    ];
    let nArray = [];
    for (let i = 0; i < arrObjOne.length; i++) {
      let cnt = 0;
      for (let j = 0; j < list.length; j++) {
        if (arrObjOne[i].list.data._id === list[j].list.data._id) {
          cnt++;
        }
      }
      nArray.push(cnt);
    }
    setNumArray(nArray);
  }, [newList]);

  // console.log(newList);
  const increament = (data, index, num) => {
    console.log(data.list.data);
    dispatch(addData(data.list.data));
  };
  // console.log(list);
  // console.log(newList);
  const decreament = (data, index, num) => {
    if (num > 1) dispatch(remData(data, index));
  };
  console.log(list);
  return (
    <div>
      {" "}
      <div class="container">
        <div class="row">
          <h1>
            <a href="/product">My Ecommerce Site</a>

            <span class="pull-right">
              <a href="cart.html">Cart ({newList.length})</a>
            </span>
          </h1>
          <hr />
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="panel-heading">MY CART (1)</div>
              <div class="panel-body">
                <form>
                  {newList &&
                    newList.map((ls, index) => (
                      <div class="row">
                        <div class="col-md-3">
                          {/* {console.log(ls.list.data.image)}{" "} */}
                          <img
                            src={`${baseUrl}${ls.list.data.image}`}
                            width="100px"
                            height="200px"
                          />
                        </div>
                        <div class="col-md-3">
                          {" "}
                          {ls.list.data.name}
                          <br />
                          <i class="fa fa-inr"></i>
                          {ls.list.data.price}
                        </div>

                        <div class="col-md-3">
                          {" "}
                          quantity
                          <br />
                          <button
                            type="button"
                            onClick={() =>
                              decreament(ls, index, numArray[index])
                            }
                            // class="qtyminus"
                            // ng-disabled="qty<=0"
                          >
                            -
                          </button>
                          <input
                            ng-model="qty"
                            type="text"
                            name="quantity"
                            class="qty"
                            size="5px"
                            value={numArray[index]}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              increament(ls, index, numArray[index])
                            }
                          >
                            +
                          </button>
                        </div>
                        <div class="col-md-3">
                          {" "}
                          <button
                            type="button"
                            class="btn btn-warning"
                            onClick={() =>
                              dispatch(remove(ls, numArray[index]))
                            }
                          >
                            remove
                          </button>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                      </div>
                    ))}
                </form>
                <hr />
                <div class="row">
                  <div class="col-md-9">
                    <label class="pull-right">Amount Payable</label>
                  </div>
                  <div class="col-md-3 ">{price}</div>
                </div>
              </div>
              <div class="panel-footer">
                <button
                  class="btn btn-success"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
                <button
                  type="button"
                  onClick={() =>
                    navigate("/PlaceOrder", {
                      state: { newList, cnt: numArray, price: price },
                    })
                  }
                  class="pull-right btn btn-danger"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
