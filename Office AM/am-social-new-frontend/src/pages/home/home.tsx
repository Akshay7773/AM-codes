import React, { useState, useEffect } from "react";
import "./home.scss";
import Typography from "@mui/material/Typography";
import "./home.tsx";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { ExpandMore } from "@mui/icons-material";
import { authenticationService } from "../../utils/auth.service";
import AddPost from "./AddPost";

export default function Login() {
  // const token = Cookie.get("_token");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser._id);
  const [posts, setPosts] = useState<any>([]);
  const [cnt, setCnt] = useState<any>(0);
  const [likes, setLikes] = useState<any>(0);
  useEffect(() => {
    const ab = async () => {
      let a = await authenticationService.getAllPosts();
      setPosts(a.results);
    };
    ab();
  }, [cnt, likes]);

  console.log(posts);
  //   const { expand, ...other } = props;
  //   return <IconButton {...other} />;
  // })(({ theme, expand }) => ({
  //   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  //   marginLeft: 'auto',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // }));

  // export default function RecipeReviewCard() {
  //   const [expanded, setExpanded] = React.useState(false);

  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  // console.log(posts.results);
  // console.log(cnt);

  const renderSlides = (imgArr: string[]) =>
    imgArr.map((imagePath) => (
      <CardMedia
        component="img"
        height="100%"
        width="100%"
        image={"http://localhost:8080/assets/posts/" + imagePath}
        alt="Paella dish"
      />
    ));

  const liketoPost = (id: string) => {
    authenticationService
      .likePost(id) //{ email: "fake@example.com", password: "akash@123" })
      .then((response: any) => {
        setLikes((prev) => prev + 1);
        console.log("hello like");
      })
      .catch((error: any) => {
        console.log("error in like post");
      });
  };
  const likeColorHandler = (post: any) => {
    // const activeUser = JSON.parse(localStorage.getItem("currentUser"));
    // const data =
    //   post &&
    //   post.likes &&
    //   post.likes.filter((user) => user === activeUser._id);
    // if (data && data.length > 0) return "red";
    // else return "";
  };
  return (
    <div>
      <AddPost value={setCnt} />
      {posts &&
        posts &&
        posts.map((post: any) => (
          <>
            <Card
              sx={{
                // color: "black",
                maxWidth: 450,
                // maxHeight: 450,
                border: "2px solid skyblue",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                margin: "auto",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "red[500]" }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />

              <div className="App">
                <Slider
                  dots={false}
                  slidesToShow={1}
                  slidesToScroll={1}
                  // autoplay={true}
                  // autoplaySpeed={3000}
                >
                  {renderSlides(post.images)}
                </Slider>
              </div>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon
                    style={likeColorHandler(post)}
                    onClick={() => liketoPost(post._id)}
                  />
                </IconButton>
                {post.likes.length}
                <ExpandMore
                // expand={true}
                // onClick={handleExpandClick}
                // aria-expanded={expanded}
                // aria-label="show more"
                >
                  {/* <ExpandMoreIcon /> */}
                </ExpandMore>
              </CardActions>
              <Collapse in={false} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
            <br />
          </>
        ))}
    </div>
  );
}
