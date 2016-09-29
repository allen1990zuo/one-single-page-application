var express=require("express");
var request=require("request");
var qs=require("qs");
var mongoose=require('mongoose');
var morgan=require('morgan');
var User= require('./model.js');
var router=express.Router();
var newuser = new User();
module.exports = function(app) {

 // Define API credentials callback URL
var callbackURL = "https://xzuo8-ece9065-finalproject-xzuo8-1.c9users.io/api/callback"
  , CLIENT_ID = '449753505212-aofjfnnhdb7mkfev68lp45is4mi9adk8.apps.googleusercontent.com'
  , CLIENT_SECRET = 'UAM9ELJfmW4XRcLoBTLUG8_I';
  // Initialize our oauth variables used to store access_token and related data
var state = ''
  , access_token = ''
  , token_type = ''
  , expires = '';

router.use(function(req,res,next){
    console.log('something is happening.');
    next();
})

// Start the OAuth flow by generating a URL that the client (index.html) opens 
// as a popup. The URL takes the user to Google's site for authentication
router.route("/login").get(function(req, res) {
  

    // Generate a unique number that will be used to check if any hijacking
    // was performed during the OAuth flow
    state = Math.floor(Math.random() * 1e18);
    
    var params = {
        response_type: "code",
        client_id: CLIENT_ID,
        redirect_uri: callbackURL,
        state: state,
        display: "popup",
        scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
    };
    
    params = qs.stringify(params);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("https://accounts.google.com/o/oauth2/auth?" + params);
});

// The route that Google will redirect the popup to once the user has authed.
// The data passed back will be used to retrieve the access_token
router.route("/callback").get(function(req, res) {
  
    // Collect the data contained in the querystring
    var code = req.query.code
      , cb_state = req.query.state
      , error = req.query.error;
  
    // Verify the 'state' variable generated during '/login' equals what was passed back
    if (state == cb_state) {
        if (code !== undefined) {
          
            // Setup params and URL used to call API to obtain an access_token
            var params = {
                code: code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: callbackURL,
                grant_type: "authorization_code"
            };
            var url = "https://accounts.google.com/o/oauth2/token";
            
            // Send the API request
            request.post(url, {form: params}, function(err, resp, body) {
              
                // Handle any errors that may occur
                if (err) return console.error("Error occured: ", err);
                console.log(body);
                var results = JSON.parse(body);
                if (results.error) return console.error("Error returned from Google: ", results.error);
                
                // Retrieve and store access_token to session
                access_token = results.access_token;
                token_type = results.token_type;
                expires = results.expires_in;
                
                console.log("Connected to Google");
                
                // Close the popup. This will trigger the client (index.html) to redirect
                // to '/user' which will test out the access_token.
                var output = '<html><head></head><body onload="window.close();">Close this window</body></html>';
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(output);
            });
        } else {
            console.log("Code is undefined: " + code);
            console.log("Error: " + error);
        }
    } else {
        console.log('Mismatch with variable "state". Redirecting to /');
        return res.redirect("/api");
    }
});

// Test out the access_token by making an API call
router.route("/user").get(function(req, res) {
  
    // Check to see if user as an access_token first
    if (access_token) {
      
        // URL endpoint and params needed to make the API call  
        var url = "https://www.googleapis.com/oauth2/v1/userinfo";
        var params = {
            access_token: access_token
        };

        // Send the request
        request.get({url: url, qs: params}, function(err, resp, user) {
            var userinfo=JSON.parse(user);
            
            User.find({'email':userinfo.email},function(err,user){
                if(user.length<1)
                {
                    newuser.id = userinfo.id;
                    newuser.email = userinfo.email;
                    newuser.name = userinfo.name; 
                    newuser.picture = userinfo.picture;
                    newuser.locale = userinfo.locale;
        
                    newuser.save(function(err){
                        if(err)
                        return res.send(err);
                         });
                   
                }
            })
            // Check for errors
            if (err) return console.error("Error occured: ", err);
            // Send output as response
            res.send(user);
           // console.log(user);
    
            
           });
    } else {
        console.log("Couldn't verify user was authenticated. Redirecting to /");
        return res.redirect("/api");
    }
});



app.use('/api',router);

};  
