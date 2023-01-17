import React, { useEffect, useState } from "react";
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
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import Cards from "./Cards";
// import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ContactSupportOutlined, Message } from "@material-ui/icons";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRef } from "react";
import { Favorite } from "@material-ui/icons";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import NavBar from "./NavBar";

function Posts({ updatedUser }) {
  const [click1, setClick1] = useState(false);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const authValue = localStorage.getItem("authkey");
  const [cmntArray, setCmntArray] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterColor, setToasterColor] = useState("");
  const uploadRef = useRef();
  const [likedPost, setlikedPost] = useState("");
  const [likedPostResp, setLikedPostResp] = useState("");

  const [page, setPage] = useState(1);
  const [isupdate, setIsUpdate] = useState(false);
  let imageUrl = "http://localhost:3300/assets/post/";
  let imageUrl2 = "http://localhost:3300/assets/profile/";
  //in navbar
  useEffect(() => {
    setIsUpdate(true);

    axios
      .get("http://localhost:3300/api/profile/getProfile", {
        headers: {
          authorization: authValue,
        },
      })
      .then((resp) => {
        setIsUpdate(false);

        setUserDetails(resp.data);
      });
  }, []);
  const [userData, setUserData] = useState({});

  // console.log(userDetails);
  // const [sampleLikeState, setSampleLikeState] = useState("");
  const [comments, setComments] = useState({
    postId: "",
    text: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3300/api/post/getPost?page=${page}&limit=1`, {
        headers: {
          authorization: authValue,
        },
      })
      .then((resp) => setPosts(resp.data))

      .catch((err) => {
        if (err.response.data === "Invalid token!") localStorage.clear();
      });
  }, []);

  useEffect(() => {
    if (typeof localStorage.getItem("authkey") === "object") navigate("/login");
  }, []);

  const [obj, setObj] = useState({
    photo: "",
    caption: "",
  });
  // console.log(obj.photo.name);

  // const [arr, setArr] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3300/api/post/getPost", {
  //       headers: {
  //         authorization: authValue,
  //       },
  //     })
  //     .then((resp) => setArr(resp.data));
  // }, []);
  const uploaddata = () => {
    const formData = new FormData();
    formData.append("image", obj.photo);
    formData.append("caption", obj.caption);

    // console.log(formData.get("image"));
    axios
      .post("http://localhost:3300/api/post/addPost", formData, {
        headers: {
          authorization: authValue,
        },
      })
      .then((resp) => {
        setPosts((prev) => [resp.data, ...prev]);
        setObj({ photo: "", caption: "" });
        setOpen55(true);
        uploadRef.current.value = null;
        setToasterColor("success");
        setPage(1);
        setToasterMessage("successfully data uploaded");
        // axios
        //   .get(`http://localhost:3300/api/post/getPost?page=${page}&limit=1`, {
        //     headers: {
        //       authorization: authValue,
        //     },
        //   })
        //   .then((resp) => setPosts(resp.data))
        // .catch((err) => console.log(err));
        formData.delete("image");
        formData.delete("caption");
      })
      .catch((err) => {
        setToasterColor("error");

        setToasterMessage(err.response.data.message);
        // console.log(err.response.data);
        setOpen55(true);
      });
  };

  // useEffect(() => {
  //   if (posts.length > 0) {
  //     posts.map((post) => {
  //       axios
  //         .get(`http://localhost:3300/api/post/getComment/${post._id}`, {
  //           headers: {
  //             authorization: authValue,
  //           },
  //         })
  //         .then((resp) => setCmntArray(resp.data));
  //     });
  //   }
  // }, [posts]);

  const commentClicked = (post) => {
    let arr = [];
    setClick1(!click1);
    posts.filter((p) =>
      p._id === post._id
        ? arr.push({ ...p, isclicked: !p.isclicked })
        : arr.push({ ...p, isclicked: false })
    );
    setPosts(arr);

    axios
      .get(`http://localhost:3300/api/post/getComment/${post._id}`, {
        headers: {
          authorization: authValue,
        },
      })
      .then((resp) => setCmntArray(resp.data));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const open1 = (false);
  useEffect(() => {
    // console.log(posts.length);
    if (posts && posts.length > 0) {
      let arr = [];
      for (let i = 0; i < posts.length; i++) {
        arr.push({ ...posts[i], isclicked: false });
      }
    }
    const value = localStorage.getItem("name");
    if (!value) navigate("/login");
  }, []);

  useEffect(() => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === likedPost ? { ...p, likes: likedPostResp } : p
      )
    );
  }, [likedPost, likedPostResp]);
  // const likePost = (post) => {
  //   console.log(post._id);
  //   axios
  //     .put(
  //       "http://localhost:3300/api/post/likeToPost",
  //       { postId: post._id },
  //       {
  //         headers: {
  //           authorization: authValue,
  //         },
  //       }
  //     )
  //     .then((resp) => {
  //       console.log(resp);
  //       setPosts((prev) =>
  //         prev.map((p) =>
  //           p._id === post._id ? { ...p, likes: resp.data.likes } : p
  //         )
  //       );
  //     });
  // };
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

  function stringAvatar(name) {
    // console.log(name);
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const fetchMoreData = () => {
    setTimeout(() => {
      axios
        .get(
          `http://localhost:3300/api/post/getPost?page=${page + 1}&limit=1`,
          {
            headers: {
              authorization: authValue,
            },
          }
        )
        .then((resp) => {
          setPosts((prev) => [...prev, ...resp.data]);
          setPage((prev) => prev + 1);
        });
    }, 1500);
  };
  // console.log(posts);
  const [open55, setOpen55] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose55 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen55(false);
  };
  console.log(userDetails, "================");
  console.log(posts, "++++++++++++++++");
  // Like color handler
  const likeColorHandler = (post) => {
    const activeUser = JSON.parse(localStorage.getItem("activeUserId"));
    const data = post.likes.filter((user) => user === activeUser);
    if (data.length > 0) return "red";
    else return "gray";
  };

  // const commentHandler = async (id) => {
  //   await axios(`http://localhost:3300/api/post/getComment/${id}`, {
  //     method: "GET",
  //     headers: {
  //       authorization: authValue,
  //     },
  //   }).then((res) => {
  //     const d = res.data.length;
  //     return d;
  //   });
  //   // await axios
  //   //   .get(`http://localhost:3300/api/post/getComment/${id}`, {
  //   //     headers: {
  //   //       authorization: authValue,
  //   //     },
  //   //   })
  //   //   .then((resp) => resp.data.length);
  //   // noOfComments = resp.data.length;
  //   // .catch((err) => console.log(err));
  // };
  const commentHandler = () => {};

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      {/* <h1>Posts</h1> */}
      <div>
        <div>
          <NavBar
            user={{
              users: userDetails,
              isclicked: isupdate,
              headerName: "POSTS",
            }}
          />

          <br />
          <br />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            style={{
              maxWidth: 400,
              backgroundColor: "rosybrown",
              border: "2px solid black",
              borderRadius: "10px",
              margin: "20px 40px",
              padding: "30px",
              alignItems: "center",
            }}
          >
            <Grid container>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  wordWrap: "none",
                }}
              >
                <div>
                  <label style={{ fontWeight: "bold", width: "max-content" }}>
                    Upload Image:{" "}
                  </label>
                </div>
                <div>
                  <Grid item>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        setObj({ ...obj, photo: e.target.files[0] })
                      }
                      size="small"
                      ref={uploadRef}
                      style={{ marginLeft: "20px" }}
                      // value={obj.photo.name}
                    />
                  </Grid>
                </div>
              </div>
            </Grid>

            <br />
            <Grid container>
              {/* <Grid
                item
                style={{
                  // marginTop: "20px",
                  marginBottom: "10px",
                  marginLeft: "15px",
                }}
              > */}
              {/* </Grid> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  wordWrap: "none",
                  marginTop: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontWeight: "bold",
                      width: "max-content",
                    }}
                  >
                    Caption:{" "}
                  </label>
                </div>
                <Grid
                  item
                  // alignItems="stretch"
                  // style={{
                  //   display: "flex",
                  //   marginTop: "20px",
                  //   marginLeft: "40px",
                  // }}
                >
                  <textarea
                    onChange={(e) =>
                      setObj({ ...obj, caption: e.target.value })
                    }
                    type="text"
                    value={obj.caption}
                    style={{
                      width: "200px",
                      height: "30px",
                      marginLeft: "60px",
                    }}
                  />
                </Grid>
              </div>
              <br />
              {/* <CardContent></CardContent> */}
              <CardActions>
                <Button
                  // variant="contained"
                  size="small"
                  onClick={() => uploaddata()}
                  style={{
                    marginLeft: "130px",
                    background: "indianred",
                    color: "white",
                    marginTop: "10px",
                  }}
                >
                  Upload Post
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </div>
      </div>
      {toasterMessage && (
        <Snackbar open={open55} autoHideDuration={2000} onClose={handleClose55}>
          <Alert
            onClose={handleClose55}
            severity={toasterColor}
            sx={{ width: "100%" }}
          >
            {toasterMessage}
          </Alert>
        </Snackbar>
      )}

      {/* just now commented */}

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <Box sx={{ width: 450, m: "auto" }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        }
      >
        {/* second commented */}
        {posts &&
          posts.map((post, i) => {
            return (
              <Box sx={{ m: 4 }}>
                {/* {<Card post={post} />} */}
                <Cards
                  post={post}
                  likeToPost={(value) => setlikedPost(value)}
                  respFromPost={(value) => setLikedPostResp(value)}
                  userData={userData}
                />
              </Box>
            );
          })}
      </InfiniteScroll>
    </div>
  );
}

export default Posts;
