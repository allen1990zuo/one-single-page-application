var express=require("express");
var router=express.Router();
var request=require("request");
var qs=require("qs");
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
	consumerKey: 'T96lzxxuouGGlbzS1iE37R4ry',
	consumerSecret: 'UdvC8ZHQ4atufDEjZnUXd99wddn6HRSTAxJfuZUs1Uwl5HEX4z',
	callback: 'https://xzuo8-ece9065-finalproject-xzuo8-1.c9users.io/api/twittercallback'
});
var Twitter = require('twitter');
var token,access_secret,name;
module.exports = function(app){
var param;
router.route('/twitterlogin')
.get(function(req, res){
  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
	if (error) {
		console.log("Error getting OAuth request token : " + error);
	} 
		 else {
        param = {
        token: requestToken,
        token_secret: requestTokenSecret
      };
      console.log(param);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('https://twitter.com/oauth/authorize?oauth_token='+requestToken)
    } 
	
});
});
router.route('/twittercallback').get(function(req, res, next){
if (param) {
    param.verifier = req.query.oauth_verifier;
    var oauth_data = param;
 
    twitter.getAccessToken(
      oauth_data.token,
      oauth_data.token_secret,
      oauth_data.verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results) {
        if (error) {
          console.log(error);
          return res.send("Authentication Failure!");
        }
        else {
          param.access_token = oauth_access_token;
          token=oauth_access_token;
          param.access_token_secret = oauth_access_token_secret;
          access_secret=oauth_access_token_secret;
          console.log(results);
          name=results.screen_name;
          console.log(name);
          console.log(token);
          console.log(access_secret);
          console.log(param);
          var output = '<html><head></head><body onload="window.close();">Close this window</body></html>';
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(output);
        }
       }
      );

  }
  else {
    return res.redirect('/login'); // Redirect to login page
  }
});

router.route('/twitteruserinfo')
.get(function(req, res) {
    var credentialsparams={
      "include_entities":"true",
      "skip_status":"true",
      "include_email":"true"
    };
    twitter.verifyCredentials(token, access_secret, credentialsparams, function(error, data, response) {
	if (error) {
	
  	 } else {
	
		console.log(data);
		res.send(data);  
	         }
  });
});
router.route('/twitterpost')
.get(function(req,res){
    var params = {screen_name: name};
  twitter.getTimeline("user_timeline",params, token,access_secret,function(error, tweet, response) {
		if (error) {
			 return res.send(error); 
		 } else {
		  res.send(tweet);
		        }
	   });
})
.post(function(req,res){
  console.log(req.body);
  twitter.statuses("update", {
		status: req.body.posts
	},
	token,
	access_secret,
	function(error, data, response) {
		if (error) {
			return res.send(error); 
		} else {
		 res.send(data);
		}
	}
);
})
router.route('/twitterdestroypost/:id')
.post(function(req,res){
  var param={'id':req.params.id}
	  twitter.statuses("destroy",param,
	   token,
	   access_secret,
	   function(error, tweet, response) {
		  if (error) {
			 return res.send(error); 
		   }  else {
		    res.send(tweet);
		   }
	  }
);
})
app.use('/api',router);
}