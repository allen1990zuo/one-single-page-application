# one-single-page-application
third party application for facebook, twitter, linkined


Installation
apply for google,Facebook,Twitter, Linkined API key for your workplace

for google api, change this part in /app/routes.js

var callbackURL = "https://xzuo8-ece9065-finalproject-xzuo8-1.c9users.io/api/callback"
  , CLIENT_ID = '449753505212-aofjfnnhdb7mkfev68lp45is4mi9adk8.apps.googleusercontent.com'
  , CLIENT_SECRET = 'UAM9ELJfmW4XRcLoBTLUG8_I';

for Facebook api, change this part in /app/facebookroutes.js
var client_id='1534735253494963',
    client_secret= "6cfef4f7f2d5b14a5615542fe3125a6a",
    redirect_url="https://xzuo8-ece9065-finalproject-xzuo8-1.c9users.io/api/facebookcallback";
    
for Twitter api, change this part in /app/twitterroutes.js
var twitter = new twitterAPI({
	consumerKey: 'T96lzxxuouGGlbzS1iE37R4ry',
	consumerSecret: 'UdvC8ZHQ4atufDEjZnUXd99wddn6HRSTAxJfuZUs1Uwl5HEX4z',
	callback: 'https://xzuo8-ece9065-finalproject-xzuo8-1.c9users.io/api/twittercallback'
});

for Linkined api, change this part in /app/linkinedroutes.js
var client_id='77952up5skz8sa',
    client_secret= "eApNF23BYb28Eugo",
    redirect_url="https://xzuo8-ece9065-finalproject-xzuo8-1.c9users.io/api/linkincallback";
    
    
    
npm install


use
start mongodb    mongod


start server     node.js
