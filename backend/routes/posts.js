const express = require("express");
const multer = require("multer");
const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {

  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'

};

const storage = multer.diskStorage({

  destination:(req,file,callback)=>{

    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");

    if(isValid){
      error = null;
    }
    callback(null,"backend/images");
  },
  filename:(req,file,callback)=>{

    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];

    callback(null,name + '-'+Date.now()+' '+ext);
  }
});

router.post("",multer({storage:storage}).single("image"),(req,res,next)=>{

  const url = req.protocol +'://'+req.get("host");

  const post = new Post({

    title:req.body.title,
    content:req.body.content,
    imagePath: url +"/images/" +req.file.filename

  });

  post.save().then(createdPost=>{

    res.status(201).json({

      message:"Post added Succesfully",
      post:{
        ...createdPost,
        id:createdPost._id,
      }
    });
  });
});


router.get('',(req,res,next)=>{

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

router.delete('/:id',(req,res,next)=>{

    Post.deleteOne({_id:req.params.id})
        .then(res =>{
          //res.status(200).json({message:"Post deleted"});
          console.log("postdeleted");
      })
      .catch(err=>{
        console.log(err);
      });

});

router.get("/:id",(req,res,next)=>{

  Post.findById(req.params.id)
      .then(post =>{

        if(post){
            res.status(200).json(post);
        }
        else{

          res.status(404).json({message:'Post not found'});
        }

      })

});
router.put("/:id",multer({storage:storage}).single("image"),(req,res,next)=>{

  let imagePath = req.body.imagePath;

  if(req.file){

    const url = req.protocol +'://'+req.get("host");
    imagePath = url +"/images/" +req.file.filename

  }
  const post = new Post({
    _id:req.body.id,
    title:req.body.title,
    content:req.body.content,
    imagePath:imagePath
  });
  Post.updateOne({_id:req.params.id},post).then(result=>{

    console.log(result);
    res.status(200).json({mesage:'Update Successful'});

  });

});

module.exports = router;
