import React, { useState, useEffect } from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";

function DiscardProcess({ changeDiscard, changeUploadPost }) {
  const addPoststyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "632px",
    height: "608px",
    bgcolor: "#ffffff",
    // border: "2px solid #000",
    borderRadius: "8px",
    boxShadow: 24,
    p: 0,
  };

  const [discard, setDiscard] = useState(false);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    if (cancel) changeDiscard(false);
  }, [cancel]);

  useEffect(() => {
    if (discard) changeUploadPost(true);
  }, [discard]);

  return (
    <div>
      <Box sx={addPoststyle}>
        <Typography id="modal-modal-description" sx={{ m: "118px 38.5px" }}>
          <div>
            <div
              style={{
                height: "204px",
                // width: "216px",
                paddingLeft: "0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "32px",
              }}
            >
              <svg
                width="180"
                height="150"
                viewBox="0 0 119 204"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.4696 137.395L55.6809 137.401C55.7524 132.816 56.7608 128.871 58.7292 125.585L58.7301 125.584C60.7845 122.18 63.4141 119.159 66.5018 116.655C66.5019 116.655 66.502 116.655 66.5021 116.655L66.817 117.043C70.0502 114.416 73.5168 112.091 77.1736 110.096L25.4696 137.395ZM25.4696 137.395C25.5231 128.388 27.0263 120.298 29.9694 113.116C32.9401 105.868 39.0863 99.5098 48.4849 94.0647L48.4915 94.0608C51.3165 92.3658 54.8053 90.4413 58.9599 88.2869L58.962 88.2858C63.2708 86.0258 67.3775 83.3997 71.2367 80.4366C75.1995 77.4372 78.6403 73.8044 81.4204 69.6846L81.4222 69.6819C84.243 65.4433 85.7059 60.4461 85.6163 55.3556C85.691 51.6529 84.897 47.9841 83.2979 44.6435L83.2953 44.6382C81.8197 41.6468 79.7509 38.9869 77.2148 36.8203L77.2101 36.8164C74.6075 34.6475 71.5961 33.0231 68.3542 32.0395C65.0489 30.9965 61.6038 30.4638 58.1379 30.4599C54.1999 30.3952 50.2884 31.1138 46.6306 32.5738L46.6306 32.5738L46.6255 32.5759C43.275 33.9561 40.1316 35.7932 37.2847 38.035L37.2835 38.0359C34.5182 40.2266 32.0162 42.7305 29.8275 45.4974C27.9282 47.8644 26.1626 50.3354 24.5389 52.8989L0.617347 36.4052C2.94486 30.8764 6.16964 25.7689 10.1623 21.2894C14.1536 16.818 18.7985 12.9762 23.9393 9.89455C29.1695 6.78515 34.8125 4.42976 40.7012 2.8981L40.7031 2.89761C46.7778 1.29252 53.036 0.486582 59.3192 0.50017L59.32 0.50017C66.4787 0.503787 73.599 1.5478 80.4574 3.59949L80.4597 3.60015C87.2815 5.60644 93.6353 8.95181 99.1499 13.4409C104.846 18.1536 109.448 24.0491 112.638 30.7183L112.64 30.7237C116.096 37.7338 117.836 46.1201 117.839 55.8993L117.84 55.907C117.924 61.2757 117.213 66.6273 115.73 71.7874C114.383 76.2431 112.34 80.4574 109.675 84.2736C107.038 88.0353 103.921 91.4361 100.402 94.3895C96.5664 97.5891 92.5089 100.513 88.2599 103.139C84.4883 105.412 80.7129 107.585 76.9339 109.657L25.4696 137.395ZM26.047 203.5V165.349H56.5046V203.5H26.047Z"
                  fill="#92E3A9"
                  stroke="black"
                />
              </svg>
              <p
                style={{
                  color: "dark grey",
                  fontSize: "14px",
                  fontWeight: "bold",
                  // marginTop: "32px",
                  fontFamily: "Public sans",
                }}
              >
                {" "}
                Do you really want to discard uploading
              </p>
            </div>
            {/* <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-block",
                }}
              > */}

            <div
              // onClick={() => uploadfiles()}

              style={{
                backgroundColor: "#1890FF",
                marginTop: "30px",
                // mb: "100px",\
                // height: "40px",
                // width: "182px",
                borderRadius: "8px",
                color: "white",
                marginLeft: "186px",
                marginRight: "186px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="contained"
            >
              <div
                style={{
                  padding: "11px 22px",
                  fontFamily: "Public Sans",
                  fontWeight: "bold",
                  fontSize: "15px",
                  fontStyle: "normal",
                  lineHeight: "26px",
                }}
                onClick={() => setDiscard(true)}
              >
                Discard Process
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                marginTop: "15px",
                // mb: "100px",\
                // height: "40px",
                // width: "182px",
                // borderRadius: "8px",
                color: "#1890FF",
                marginLeft: "186px",
                marginRight: "186px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  //   padding: "11px 22px",
                  fontFamily: "Public Sans",
                  fontWeight: "bold",
                  fontSize: "15px",
                  fontStyle: "normal",
                  lineHeight: "26px",
                }}
                onClick={() => setCancel(true)}
              >
                Cancel
              </div>
            </div>

            {/* </div> */}
          </div>
        </Typography>
      </Box>
    </div>
  );
}

export default DiscardProcess;
