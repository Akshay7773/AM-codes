import React, { memo } from "react";

function Child() {
  return (
    <div>
      <h2>Child Component</h2>
      {console.log("Hello Child component ")}
    </div>
  );
}

export default memo(Child);
