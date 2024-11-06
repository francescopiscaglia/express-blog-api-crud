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

// update
const update = (req, res) => {

    // find the post by slug
    const post = posts.find(post => post.slug.toLowerCase() === req.params.slug.toLowerCase());

    // check if post exists
    if (!post) {
        return res.status(404).json({
            error: `404! Not found post with this slug: ${req.params.slug}`
        });
    }

    // update the post
    post.title = req.body.title;
    post.slug = req.body.slug;
    post.content = req.body.content;
    post.tags = req.body.tags;
    post.image = req.body.image;

    // update the db
    fs.writeFileSync("./db/db.js", `module.exports = ${JSON.stringify(posts, null, 4)}`);

    // return the new post 
    res.json({
        status: 201,
        data: post
    });
    
};

/*

/:id [PUT] - rotta update del crud che riceverà dei dati e modificherá un post esistente. Questa dovrà riceve i dati in formato json e dovrà restituire il json dell’elemento appena creato.

/:id [DELETE] - rotta destroy del crud che dovrà restituire un 404 nel caso non sia stato trovato un post corrispondente.
Restituire come responso la nuova array escluso il post eliminato

*/


module.exports = {
    api,
    index,
    show,
    store,
    update
};