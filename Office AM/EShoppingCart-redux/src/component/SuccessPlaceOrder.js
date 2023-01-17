import React from "react";
import { useNavigate } from "react-router-dom";
import { reset } from "../actions/action";
import { useDispatch } from "react-redux";
function SuccessPlaceOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gotoHome = () => {
    dispatch(reset());
    navigate("/");
  };
  return (
    <div>
      <h1>Thank You</h1>
      <button onClick={() => gotoHome()}>Home</button>
    </div>
  );
}

export default SuccessPlaceOrder;
