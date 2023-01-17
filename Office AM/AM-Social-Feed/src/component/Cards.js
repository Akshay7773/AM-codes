import React, { useState, useEffect } from "react";
import {
  Card,
  Collapse,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { Skeleton } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";

// import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Message } from "@material-ui/icons";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRef } from "react";
import { Favorite } from "@material-ui/icons";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import NavBar from "./NavBar";

function Cards({ post, likeToPost, respFromPost }) {
  const authValue = localStorage.getItem("authkey");
  const [click1, setClick1] = useState(false);
  const [cmntArray, setCmntArray] = useState([]);
  const [posts, setPosts] = useState([]);
  const [abc, setAbc] = useState("");
  const [comments, setComments] = useState({
    postId: "",
    text: "",
  });
  const [page, setPage] = useState(1);
  let imageUrl = "http://localhost:3300/assets/post/";
  let imageUrl2 = "http://localhost:3300/assets/profile/";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // useEffect(() => {
  //   // console.log(authValue);
  //   axios
  //     .get(`http://localhost:3300/api/post/getPost?page=${page}&limit=1`, {
  //       headers: {
  //         authorization: authValue,
  //       },
  //     })
  //     .then((resp) => setPosts(resp.data))

  //     .catch((err) => {
  //       if (err.response.data === "Invalid token!") localStorage.clear();
  //     });
  // }, []);
  const likePost = (post) => {
    likeToPost("");
    axios
      .put(
        "http://localhost:3300/api/post/likeToPost",
        { postId: post?._id },
        {
          headers: {
            authorization: authValue,
          },
        }
      )
      .then((resp) => {
        likeToPost(post._id);
        respFromPost(resp.data.likes);
      });
  };

  // Like color handler
  const likeColorHandler = (post) => {
    const activeUser = JSON.parse(localStorage.getItem("activeUserId"));
    const data = post?.likes?.filter((user) => user === activeUser);
    if (data?.length > 0) return "red";
    else return "gray";
  };

  const commentClicked = () => {
    let arr = [];
    setClick1(!click1);
    // posts.filter((p) =>
    //   p._id === post._id
    //     ? arr.push({ ...p, isclicked: !p.isclicked })
    //     : arr.push({ ...p, isclicked: false })
    // );
    // setPosts(arr);
    // console.log(post);
    axios
      .get(`http://localhost:3300/api/post/getComment/${post._id}`, {
        headers: {
          authorization: authValue,
        },
      })
      .then((resp) => setCmntArray(resp.data));
  };

  function stringAvatar(name) {
    // console.log(name);
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const postComment = () => {
    if (comments.text) {
      axios
        .post("http://localhost:3300/api/post/addComment", comments, {
          headers: {
            authorization: authValue,
          },
        })
        .then((res) => {
          setCmntArray((prev) => [...prev, res.data]);
          setComments({ ...comments, text: "" });
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3300/api/post/getComment/${post._id}`, {
        headers: {
          authorization: authValue,
        },
      })
      .then((resp) => setCmntArray(resp.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card
      sx={{
        backgroundColor: "white",
        maxWidth: 450,
        // maxHeight: 450,
        // border: "2px solid skyblue",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        margin: "auto",
        // padding: "10px   20px",
      }}
    >
      <div style={{ backgroundColor: "Tomato", padding: "0 0  15px 10px" }}>
        {" "}
        <br />
        {/* {post.name} */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Avatar
              alt="Remy Sharp"
              // src={imageUrl2 + post?.user?.image}
              src={post.userImage}
              sx={{ width: 50, height: 50, bgcolor: "#30B9CE" }}
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {post?.createdBy && post?.createdBy[0]?.toUpperCase()}
            </Avatar>
          </div>

          <div
            style={{
              margin: "10px 0 0 10px",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            {post?.createdBy ? post?.createdBy : "not valid user"}
          </div>
        </div>
      </div>
      <CardMedia
        height="100%"
        width="100%"
        component="img"
        image={imageUrl + post?.image}
        alt="green iguana"
        sx={{ objectPosition: "contain" }}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            fontWeight: "bold",
            color: "black",
            // marginLeft: "40%",
            fontSize: "20px",
          }}
        >
          {post?.caption}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <Favorite
            onClick={() => likePost(post)}
            style={{
              // color: post.likes.length > 0 ? "red" : "",
              color: likeColorHandler(post),
              fontSize: "34px",
            }}
          />
          {post?.likes?.length}likes
        </IconButton>
        <Message
          onClick={() => commentClicked(post)}
          style={{ fontSize: "34px" }}
        />
        {cmntArray?.length} Comments
      </CardActions>
      <Collapse in={click1} sx={{ marginLeft: "20px" }}>
        <div style={{ width: "100%" }}>
          <TextField
            size="small"
            variant="standard"
            value={comments.text}
            sx={{ marginBottom: "20px", width: "80%" }}
            onChange={(e) => {
              if (e.target.value === " ") {
                e.target.value = "";
              }
              setComments({ postId: post?._id, text: e.target.value });
            }}
          />
          <Button
            size="small"
            onClick={() => postComment()}
            style={{ margin: "3px 0 0 0px", fontSize: "15px" }}
          >
            <SendIcon sx={{ color: "black" }} />
          </Button>
        </div>
        <div>
          {Array.isArray(cmntArray) &&
            cmntArray?.map((comn) => {
              return (
                <div key={comn._id} style={{ marginRight: "20px" }}>
                  <Stack direction="row" spacing={1}>
                    <Avatar
                      {...stringAvatar(comn.createdBy ? comn.createdBy : "")}
                      src={comn.userImage}
                    />
                    <h4 style={{ paddingTop: "10px" }}>{comn.createdBy}:</h4>
                    <p style={{ paddingTop: "10px" }}>{comn.text}</p>
                  </Stack>
                  {/* <hr style={{ marginTop: "12px" }} /> */}
                  <br />
                </div>
              );
            })}
        </div>
      </Collapse>
    </Card>
  );
}

export default Cards;
