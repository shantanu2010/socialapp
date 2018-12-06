const express = require('express');
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{

  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");

  next();

});

app.post("/api/posts",(req,res,next)=>{

  const post = req.body;
  console.log(post);

  res.status(201).json({

    message:"Post added Succesfully"
  });
});

app.get('/api/posts',(req,res,next)=>{

  const posts = [
    {id:'fadf124211',title:'First server side-post',content:'This is a post coming from the server!'},
    {id:'ssdflkfdor234',title:'Second server side-post',content:'This is a post coming from the server!'},

  ];
  res.status(200).json({

    message:'Posts fetched succesfully!',
    posts:posts
  });
});

module.exports = app;
