import React from "react";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MessageIcon from "@mui/icons-material/Message";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";

import {
  Avatar,
  Card,
  CardActions,
  //   CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  //   Typography,
} from "@mui/material";
// import { ExpandMore } from "@mui/icons-material";
function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [navHeight, setNavheight] = useState(0);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("user")));
  const [likes, setLikes] = useState(0);
  let imageUrl = "http://localhost:3300/assets/post/";

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user") === null)) navigate("/login");
  }, []);

  useEffect(() => {
    setNavheight(document.getElementById("navContainer").offsetHeight);
    axios
      .get("http://localhost:3300/api/profile/getProfile", {
        headers: {
          authorization: token?.token,
        },
      })
      .then((resp) => setUser(resp.data))
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3300/api/post/getPost", {
        headers: {
          authorization: token?.token,
        },
      })
      .then((resp) => {
        setPosts(resp.data);
      });
  }, [likes]);

  console.log(posts);
  const likeTopost = (postId) => {
    // console.log("postId", postId);
    axios
      .put(
        "http://localhost:3300/api/post/likeToPost",
        { postId: postId },
        {
          headers: {
            authorization: token?.token,
          },
        }
      )
      .then((res) => setLikes((prev) => prev + 1))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div id="navContainer">
        <NavBar />
      </div>
      <div
        style={{
          height: `calc(100vh - ${navHeight}px )`,
          overflow: "auto",
        }}
      >
        {posts &&
          posts.map((post, i) => (
            <div className="posts" key={i}>
              <Card sx={{ maxWidth: 600 }}>
                <CardHeader
                  avatar={
                    post && post.userImage ? (
                      <Avatar src={post.userImage} />
                    ) : (
                      <Avatar sx={{ bgcolor: "red[500]" }} aria-label="recipe">
                        {post && post.createdBy && post.createdBy.charAt(0)}
                      </Avatar>
                    )
                  }
                  action={
                    <IconButton aria-label="settings">
                      {/* <MoreVertIcon /> */}
                    </IconButton>
                  }
                  title={post?.createdBy}
                  subheader={<Moment>{post?.createdAt}</Moment>}
                />
                <CardMedia
                  component="img"
                  height="194"
                  //   image="/static/images/cards/paella.jpg"
                  image={imageUrl + post?.image}
                  alt="Paella dish"
                />

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon
                        onClick={() => likeTopost(post._id)}
                        sx={{
                          color:
                            post &&
                            post.likes &&
                            post.likes.includes(user && user._id)
                              ? "red"
                              : "",
                          width: "40px",
                          height: "30px",
                        }}
                      />{" "}
                      {post?.likes?.length} likes
                    </IconButton>
                  </div>
                  <div>
                    <IconButton aria-label="share">
                      <MessageIcon sx={{ width: "40px", height: "30px" }} />
                    </IconButton>
                  </div>
                </div>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Posts;
