import React, { useContext, createContext } from "react";
import { UserContext } from "./ComponentA";

function ComponentC() {
  const {
    user,
    setUser,
    // employee, setEmployee
  } = useContext(UserContext);

  const changeHandler = () => {
    setUser("new user");
    // setEmployee("employee2");
  };
  return (
    <div>
      {console.log(user)}
      {/* {console.log(employee)} */}
      <button onClick={changeHandler}>Update user</button>
    </div>
  );
}

export default ComponentC;
