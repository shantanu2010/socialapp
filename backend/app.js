const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");


const postsRoutes = require("./routes/posts");

mongoose.connect("mongodb+srv://shanu:RWZQJIo3DRr4Stdo@cluster0-ojatq.mongodb.net/node-angular?retryWrites=true")
        .then(()=>{

          console.log("Connecter to database!");
        })

        .catch(()=>{
          console.log("Connection Failed!!");
        })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{

  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");

  next();

});

app.use("/api/posts",postsRoutes);
module.exports = app;
