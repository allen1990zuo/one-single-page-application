var express=require("express")
var request=require("request")
var qs=require("qs")
var mongoose=require('mongoose');
var morgan=require('morgan');
var bodyParser=require('body-parser');
var methodOverride=require('method-override');
var app= express();
var User=require('./app/model.js');
var router=express.Router();
mongoose.connect("mongodb://localhost/userinfo"); 
// Setup middleware
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use(morgan('dev'));  
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());
require('./app/routes.js')(app);
require('./app/modelroutes.js')(app);
require('./app/facebookroutes.js')(app);
require('./app/twitterroutes.js')(app);
require('./app/linkedinroutes.js')(app);
app.listen(process.env.PORT);