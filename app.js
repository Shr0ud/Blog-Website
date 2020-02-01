//jshint esversion:6

// SET UP APP AND DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// FILLER CONTENT
const homeStartingContent = "My name is Michael, this is my...... journal, where I post interesting things :)";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// ARRAY OF POSTS
let posts = [];

// GET HOME PAGE
app.get("/", (req, res) =>{

  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
  
});

// GET ABOUT PAGE
app.get("/about", (req, res) =>{
  res.render("about", {startingContent: aboutContent});
});

// GET CONTACTS PAGE
app.get("/contact", (req, res) =>{
  res.render("contact", {startingContent: contactContent});
});

// GET COMPOSE PAGE
app.get("/compose", (req, res) =>{
  res.render("compose");
});

// POSTING ON COMPOSE PAGE
app.post("/compose", (req, res) =>{
  
  // create and store in an object
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

// GET INDIVIDUAL POSTS
app.get("/posts/:postName", (req, res) =>{

  const requestedPostTitle = _.lowerCase(req.params.postName);

  posts.forEach( post =>{
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedPostTitle){
      //renders the appropriate post
      res.render("post", {
        title: post.title,
        content: post.content
      });

    }

  });

});

// SERVER START
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
