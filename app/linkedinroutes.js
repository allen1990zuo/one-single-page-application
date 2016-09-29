var express=require("express");
var request=require("request");
var qs=require("qs");
var morgan=require('morgan');
var router=express.Router();
module.exports = function(app){

var client_id='77952up5skz8sa',
    client_secret= "eApNF23BYb28Eugo",
    redirect_url="https://xzuo8-ece9065-finalproject-xzuo8-1.c9users.io/api/linkincallback";
var access_token="";

router.route("/linkinlogin").get(function(req, res) {
    var state = Math.floor(Math.random() * 1e18);
    
    var params = {
        response_type: "code",
        client_id: client_id,
        redirect_uri: redirect_url,
        state: state,
        scope: "r_basicprofile r_emailaddress w_share"
    };
    params = qs.stringify(params);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("https://www.linkedin.com/uas/oauth2/authorization?" + params);
});
router.route("/linkincallback").get(function(req, res) {

    var code = req.query.code;
    var state=req.query.state;
    var params = {
                grant_type:'authorization_code',
                code:code,
                redirect_uri:redirect_url,
                client_id: client_id,
                client_secret:client_secret
            };
    var url="https://www.linkedin.com/uas/oauth2/accessToken" ;
     request.post(url, {form: params}, function(err, resp, body) {
         console.log(body);
         var results=JSON.parse(body);
         access_token=results.access_token;
         console.log(access_token);
         var output = '<html><head></head><body onload="window.close();">Close this window</body></html>';
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.end(output);
     });
});
router.route("/linkedinuser")
.get(function(req, res){
   
    var url="https://api.linkedin.com/v1/people/~?format=json&oauth2_access_token="+access_token;
    request(
    { url: url,
    method:'GET'
    },function(err, resp, body) {

    console.log(body)
    res.send(body);
    });
router.route('/linkedinpost')
.get(function(req, res) {
    
})
.post(function(req,res){
    console.log(req.body)
    var url="https://api.linkedin.com/v1/people/~/shares?format=json&oauth2_access_token="+access_token;
    request(
    { url: url,
      headers:{
        "Content-Type":"application/json"
              },
      method:'POST',
      body:JSON.stringify({
          "comment": req.body.posts,
          "visibility":  {
                      "code": "anyone"
                         }
      })
    },function(err, resp, body) {
    console.log(body);
    // var reuslt=JSON.parse(body);
    res.send(body);
    });

})
.delete(function(req,res){
    
})
})
app.use('/api',router);
}