import React from "react";
import { useNavigate } from "react-router-dom";
function SuccessPlaceOrder() {
  const navigate = useNavigate();
  const gotoHome = () => {
    localStorage.clear();
    navigate("/Home");
  };
  return (
    <div>
      <h1>Order Placed Successfully</h1>
      <button
        onClick={() => gotoHome()}
        style={{ color: "green", backgroundColor: "yellow" }}
      >
        Go To Home
      </button>
    </div>
  );
}

export default SuccessPlaceOrder;
