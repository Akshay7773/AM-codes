import React, { useState, createContext } from "react";
import ComponentB from "./ComponentB";

export const UserContext = createContext();

function ComponentA() {
  const [user, setUser] = useState("Hello World!!!");
  //   const [employee, setEmployee] = useState("employee1");
  return (
    <div>
      <UserContext.Provider
        value={{
          user,
          setUser,
          // employee, setEmployee
        }}
      >
        <ComponentB
        // user={user}
        // setUser={setUser}
        //   employee={employee}
        //   setEmployee={setEmployee}
        />
      </UserContext.Provider>
    </div>
  );
}

export default ComponentA;
