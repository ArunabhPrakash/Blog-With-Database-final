//jshint esversion:6
/*
The code you provided is a simple Express.js server that serves a blogging website. Here's a breakdown of how it works:
1. Import required modules:
   - `express`: The web framework for Node.js.
   - `body-parser`: Middleware to parse incoming request bodies.
   - `ejs`: Templating engine for rendering dynamic content.
   - `mongoose`: MongoDB object modeling tool.
2. Set up Express and configure middleware:
   - Create an instance of the Express application.
   - Set the view engine to EJS.
   - Configure body-parser to handle URL-encoded form data.
   - Serve static files from the "public" directory.
3. Connect to the MongoDB database:
   - Use the `mongoose.connect` method to establish a connection to a local MongoDB database named "blogDB".
4. Define the blog post schema:
   - Create a Mongoose schema for the blog posts with two fields: `title` and `content`.
5. Create the Post model:
   - Use the `mongoose.model` function to create a Post model based on the post schema.
6. Define routes and their handlers:
   - Home route (`"/"`): Render the home page, fetching all existing posts from the database and passing them to the EJS template for rendering.
   - Compose route (`"/compose"`): Render the compose page where users can create new blog posts.
   - Post creation route (`"/compose"` with POST method): Create a new post in the database based on the submitted form data and redirect back to the home page.
   - Individual post route (`"/posts/:postId"`): Render a specific blog post based on the provided post ID.
   - About route (`"/about"`): Render the about page.
   - Contact route (`"/contact"`): Render the contact page.
7. Start the server:
   - Listen on port 3000 for incoming HTTP requests and log a message to the console when the server starts.
This code sets up a basic blogging website where users can create new posts, view existing posts, and navigate to the about and contact pages. The data is stored in a local MongoDB database named "blogDB" using Mongoose as the ODM (Object Data Modeling) tool. The EJS templating engine is used to render dynamic content in the views.
commited to main~
*/
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
