const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Post = require('./models/post');


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
  res.header("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");

  next();

});

app.post("/api/posts",(req,res,next)=>{


  const post = new Post({

    title:req.body.title,
    content:req.body.content

  });

  post.save().then(createdPost=>{

    res.status(201).json({

      message:"Post added Succesfully",
      postId:createdPost._id
    });
  });
});

app.get('/api/posts',(req,res,next)=>{

  Post.find()
    .then(documents=>{

      console.log(documents);
      res.status(200).json({

        message:'Posts fetched succesfully!',
        posts:documents
      });
    })
    .catch(err=>{
      console.log(err);
    });

});

app.delete('api/posts/:id',(req,res,next)=>{

    Post.deleteOne({_id:req.params.id})
        .then(res =>{
          res.status(200).json({message:"Post deleted"});
      });
});

module.exports = app;
