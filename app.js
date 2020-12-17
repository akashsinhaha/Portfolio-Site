//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Here I will be showcasing all my projects and updates. So stay tuned!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros.";
const contactContent = "Feel free to connect with me. Together we can build great things.";
let posts = [];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', function(req, res) {

  res.render('home', {
    homeParagraph: homeStartingContent,
    posts: posts
  });
});
app.get('/posts/:topic', function (req, res) {
  const requestedTitle = req.params.topic;

posts.forEach(function(post){
  if (_.lowerCase(requestedTitle) === _.lowerCase(post.title) ) {
    res.render('post', {
      blogTitle: post.title,
      blogBody: post.body
    });

  }
});

});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/contact', function(req, res) {
  res.render('contact', {
    contactParagraph: contactContent
  });
});




app.get('/compose', function(req, res) {
  res.render('compose');
});

app.post('/compose', function(req, res) {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };
  posts.push(post);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});





// <% for (var i = 0; i < posts.length; i++) { %>
//   <h1><%= posts[i].title %></h1>
//   <p><%= posts[i].body %></p>
// <% }; %>
