// importazione array
const posts = require("../db/db.js");

// path middleware
const path = require("path");

// fs middleware
const fs = require("fs");

// API
const api = (req, res) => {
    res.json({
        data: posts,
        counter: posts.length
    });
};

// index
/*
const index = (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/html/main.html"))
};
*/

// index (bonus)
const index = (req, res) => {
    res.json({
        data: posts,
        counter: posts.length
    });
};

// show
const show = (req, res) => {

    // find
    const findPostWithSlug = posts.find(post => post.slug.toLowerCase() == req.params.slug.toLowerCase());

    // verifica
    if (!findPostWithSlug) {
        return res.status(404).json({
            error: "404! Not found"
        });
    };

    // risposta trovata
    res.json({
        data: findPostWithSlug
    });  
};

// store
const store = (req, res) => {

    // creazione del nuovo dolce
    const newObj = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    };

    posts.push(newObj);

    // update db
    fs.writeFileSync("./db/db.js", `module.exports = ${JSON.stringify(posts, null, 4)}`);
    
    res.json({
        status: 201,
        data: posts,
        counter: posts.length
    });
};


module.exports = {
    api,
    index,
    show,
    store
};