const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const bodyParser = require("body-parser");

require("dotenv/config");
app.use(bodyParser.json());

app.use("/auth", userRoute);
app.use("/auth/posts", postRoute);
app.get("/", (req, res) => {
  res.send("Hello world");
});

mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("connected to db")
);

app.listen(3000);
