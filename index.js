//set up
var express = require('express')
var app = express();
var bodyParser = require('body-parser')

//If a client asks for a file,
//look in the public folder. If it's there, give it to them.
app.use(express.static(__dirname + '/public'));

//this lets us read POST data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//make an empty list of ideas
var posts = [];
var idea = {};

idea.text = "Buy 2 oreo get 1 free!";
idea.price = "Only $100";
idea.image = "http://www.farmlib.org/wp-content/uploads/2016/03/oreo_cookie_ima.d144b164022.original1.jpg";

posts.push(idea);

//let a client GET the list of ideas
var sendIdeasList = function (request, response) {
  response.send(posts);
}
app.get('/ideas', sendIdeasList);

//let a client POST new ideas
var saveNewIdea = function (request, response) {
  console.log(request.body.idea);
  console.log(request.body.image);
  console.log(request.body.price); //write it on the command prompt so we can see
  var idea = {};
idea.text = request.body.idea;
idea.image = request.body.image;
idea.price = request.body.price;
posts.push(idea);
  response.send("thanks for your idea. Press back to add another");
}
app.post('/ideas', saveNewIdea);

//listen for connections on port 3000
app.listen(process.env.PORT || 3000);
console.log("I am listening...");
