const express = require("express");
const router = express.Router();

// impostazione controller
const PostsController = require("../controllers/postsController.js");


// API
router.get("/list", PostsController.api);

// index
router.get("/", PostsController.index);

// show
router.get("/:slug", PostsController.show)

// store
router.post("/", PostsController.store)

// update
router.put("/", PostsController.update)



module.exports = router