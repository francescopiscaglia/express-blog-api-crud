const express = require("express");
const app = express();

// json middleware
app.use(express.json());

// importazione router
const PostsRouter = require("./routes/posts.js");

// router middleware
app.use("/posts", PostsRouter);

// static assets middleware
app.use(express.static("public"));

// start the server
app.listen(3001, () => {
    console.log("Server is running at http://localhost:3001");
});