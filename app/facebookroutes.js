var express=require("express");
var request=require("request");
var qs=require("qs");
var morgan=require('morgan');
var router=express.Router();
module.exports = function(app){

var client_id='1534735253494963',
    client_secret= "6cfef4f7f2d5b14a5615542fe3125a6a",
    redirect_url="https://xzuo8-ece9065-finalproject-xzuo8-1.c9users.io/api/facebookcallback";
var access_token="";
router.route("/facebooklogin").get(function(req, res) {
    var state = Math.floor(Math.random() * 1e18);
    
    var params = {
        response_type: "code",
        client_id: client_id,
        redirect_uri: redirect_url,
        state: state,
        scope: "email,publish_actions,user_posts"
    };
    params = qs.stringify(params);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("https://www.facebook.com/dialog/oauth?" + params);
});
router.route("/facebookcallback").get(function(req, res) {

    var code = req.query.code;
    var state=req.query.state;
    var params = {
                grant_type:'authorization_code',
                code:code,
                redirect_uri:redirect_url,
                client_id: client_id,
                client_secret:client_secret,
                
            };
    var url="https://graph.facebook.com/oauth/access_token" ;
     request.post(url, {form: params}, function(err, resp, body) {
         console.log(body);
         var results=body.toString();
         var x=results.substr(13,results.length-12);
         access_token=x.substr(0,x.length-16);
         console.log(access_token);
         var output = '<html><head></head><body onload="window.close();">Close this window</body></html>';
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.end(output);
     });
});
router.route("/facebookinfo").get(function(req, res) {
    var url = "https://graph.facebook.com/me/feed";
        var params = {
            access_token: access_token
        };

        // Send the request
        request.get({url: url, qs: params}, function(err, resp, user) {
            var userinfo=JSON.parse(user);
            res.send(user);
        })
})
.post(function(req, res) {
     console.log(req.body);
     var params={
         access_token:access_token,
         message:req.body.posts
         
     };
     var url = 'https://graph.facebook.com/me/feed';
     request.post(url,{form:params},function(err,resp,bodys){
             res.send(bodys);
             if (err) 
             {return res.send(err);}
     });
})

router.route('/facebookcomment/:id')
.get(function(req,res){
    var url='https://graph.facebook.com/'+req.params.id+'/comments';
     var params = {
            access_token: access_token
        }; 
    request.get({url: url, qs: params},function(err, resp, bodys) {
         res.send(bodys);
             if (err) 
             {return res.send(err);}
    })
})
.post(function(req,res){
     var params={
         access_token: access_token,
         message:req.body.content}
     var url='https://graph.facebook.com/'+req.params.id+'/comments/';
     request.post(url,{form:params},function(err, resp, bodys) {
         res.send(bodys);
             if (err) 
             {return res.send(err);}
    })
})
.delete(function(req,res){
   
     var url='https://graph.facebook.com/'+req.params.id;
     var params = {
            access_token: access_token
        };
     request({url:url,qs:params,method:'DELETE'},function(err, resp, bodys) {
         res.send(bodys);
             if (err) 
             {return res.send(err);}
    })
})

app.use('/api',router);
}