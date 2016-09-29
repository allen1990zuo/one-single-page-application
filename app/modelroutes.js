var express=require("express");
var request=require("request");
var qs=require("qs");
var mongoose=require('mongoose');
var morgan=require('morgan');
var User= require('./model.js');
var router=express.Router();
var newuser = new User();
module.exports = function(app){
 router.route('/posts').post(function(req,res)
{
    var user=new User();
    user.posts=req.body.posts;
    user.save(function(err){
        if(err)
         {return res.send(err);}
         
        res.send({message: 'posts created!'})
    });
})
.get(function(req,res){
    User.findOne(function(err,user){
       if(err)
        {return res.send(err);}
        
       res.send(user);
    });
});
router.route('/posts/:id').get(function(req, res) {
        User.findOne({'id':req.params.id}, function(err, user) {
            if (err)
               {return res.send(err);}
            res.send(user.posts);
        });
    })
     // update the user
.post(function(req, res) {

        console.log(req.body);
        User.update({'id':req.params.id}, {$push:{'posts':{'postcontent':req.body.posts}}}, function(err, user) {

            if (err)
                {return res.send(err);}
           // user=user[0];
           
                res.send({ message: 'successful insert post' });
           
           
            

        });
    })
.put(function(req, res) {

       console.log(req.body)
        User.update({'id':req.params.id,'posts.postcontent':req.body.oldpost}, {$set:{'posts':{'postcontent':req.body.posts}}}, function(err, user) {

            if (err)
                {return res.send(err);}
           
                res.send({ message: 'posts updated post' });
           
           

        });
    })
 .delete(function(req, res) {
        console.log(req.body);
        User.update({'id':req.params.id},{$pull:{'posts':{'postcontent':req.body}}} , function(err, user) {
            if (err)
                {return res.send(err);}

            res.send({ message: 'Successfully deleted post' });
        });
       
    });
router.route('/findposts/:postcontent')
.get(function(req, res) {
        User.findOne({'posts':{$elemMatch:{'postcontent':req.params.postcontent}}}, function(err, user) {
            if (err)
               {return res.send(err);}
            res.send(user);
        });
    })
.put(function(req, res) {

       console.log(req.body)
        User.update({'posts.postcontent':req.params.postcontent}, {$set:{'posts':{'postcontent':req.body.postcontent}}}, function(err, user) {

            if (err)
                {return res.send(err);}
           
                res.send({ message: 'posts updated post' });
           
           

        });
    })
.delete(function(req,res){
     User.update({'posts.$.postcontent':req.params.postcontent},{$pull:{'posts.$.postcontent':req.params.postcontent}} , function(err, user) {
            if (err)
                {return res.send(err);}

            res.send({ message: 'Successfully deleted post' });
        });
});
router.route('/showcomments/:postcontent')
.get(function(req, res) {
     User.findOne({'posts.postcontent':req.params.postcontent},{_id:0,'posts':{$elemMatch :{'postcontent':req.params.postcontent}}}, function(err, user) {
            if (err)
               {return res.send(err);}
            res.send(user.posts[0].comments);
        });
})
.post(function(req, res) {
    console.log(req.body)
    User.update({'posts.postcontent':req.params.postcontent},{$push:{'posts.$.comments':{'commentcontent':req.body.content}}},
    function(err,user){
        if (err)
                {return res.send(err);}

            res.send({ message: 'Successfully insert comment' });
    });
})
.put(function(req, res) {
     User.update({'posts.postcontent':req.params.postcontent,'posts.comments.commentcontent':req.body.oldcomment},{$set:{'posts':{'comments':{'commentcontent':req.body.comment}}}},
     function(err,user){
          if (err)
                {return res.send(err);}

            res.send({ message: 'Successfully update comment' });
     });
})
.delete(function(req, res) {
    console.log(req.body)
      User.update({'posts.postcontent':req.params.postcontent},{$pull:{'posts.$.comments':{'commentcontent':req.body}}},
      function(err,user){
           if (err)
                {return res.send(err);}

            res.send({ message: 'Successfully delete comment' });
      });
});
router.route('/comments/:id')
.get(function(req, res) {
     User.findOne({'id':req.params.id}, function(err, user) {
            if (err)
               {return res.send(err);}
            res.send(user);
        });
})
.post(function(req, res) {
    console.log(req.body)
    User.update({'id':req.params.id,'posts.postcontent':req.body.post},{$push:{'posts.$.comments':{'commentcontent':req.body.comment}}},
    function(err,user){
        if (err)
                {return res.send(err);}

            res.send({ message: 'Successfully insert comment' });
    });
})
.put(function(req, res) {
     User.update({'id':req.params.id,'posts.postcontent':req.body.post,'posts.comments.commentcontent':req.body.oldcomment},{$set:{'posts':{'comments':{'commentcontent':req.body.comment}}}},
     function(err,user){
          if (err)
                {return res.send(err);}

            res.send({ message: 'Successfully update comment' });
     });
})
.delete(function(req, res) {
      User.update({'id':req.params.id,'posts.postcontent':req.body.post},{$pull:{'posts.$.comments':{'commentcontent':req.body.comment}}},
      function(err,user){
           if (err)
                {return res.send(err);}

            res.send({ message: 'Successfully delete comment' });
      });
});
app.use('/api',router);
}