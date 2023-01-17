const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

// Other middlewares
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

// Importing routes
const authRoute = require("./routes/auth");
const imageRoute = require("./routes/image");
const postRoute = require("./routes/posts");
const profileRoute = require("./routes/profile");

// Routes middlewares
app.use("/api/user", authRoute);
app.use("/api/image", imageRoute);
app.use("/api/post", postRoute);
app.use("/api/profile", profileRoute);
app.use("/assets/post", express.static(path.join(__dirname + "/assets/post")));
app.use(
  "/assets/profile",
  express.static(path.join(__dirname + "/assets/profile"))
);

// Connecting to database
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("\u001b[" + 32 + "m" + "Connected to DB ✔" + "\u001b[0m");
  })
  .catch(() => {
    console.log(
      "\u001b[" + 31 + "m" + "Error while connecting to DB 🚫   " + "\u001b[0m"
    );
  });

// Starting the server
app.listen(3300, () => {
  process.stdout.write("\x1Bc"); //clear console
  console.log("API is now live... ✔");
  console.log(
    "\u001b[" + 36 + "m" + "Waiting for DB to connect ⏳" + "\u001b[0m"
  );
});
