const express = require("express");
const app = express();

// importazione router
const PostsRouter = require("./routes/posts.js");

// import error 404 middleware
const notFoundMiddleware = require("./middlewares/notFound.js");


// json middleware
app.use(express.json());

// router middleware
app.use("/posts", PostsRouter);

// static assets middleware
app.use(express.static("public"));



// start the server
app.listen(3001, () => {
    console.log("Server is running at http://localhost:3001");
});


// use error middleware
app.use(notFoundMiddleware);