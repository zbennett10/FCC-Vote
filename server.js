const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');

const app = express();

app.use(bodyParser.json()); //user body parser middleware
route(app); //connect server to routes
app.use((err,req,res,next) => {
  res.status(422).send({error: err.message});
});

//run server
app.listen(3001, () => {
    console.log("Server running on port 3001.");
  });


module.exports = app;