import React, { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useRef } from "react";
function Hello() {
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("reached bottom");
      }
    }
  };
  return (
    <div>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "200px", overflowY: "auto" }}
      >
        {Array(200)
          .fill()
          .map((_, i) => {
            return <p key={i}>{i}</p>;
          })}
      </div>
    </div>
  );
}

export default Hello;
