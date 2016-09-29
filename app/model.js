// Pulls Mongoose dependency for creating schemas
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

// Creates a User Schema. This will be the basis of how user data is stored in the db

var UserSchema = new Schema({
    id:{type:String},
    name: {type: String},
    email: {type: String},
    picture: {type: String},
    locale: {type: String}, 
    posts:[{
       
        postcontent:{type:String},
        comments:[{
            person:{type:String},
            commentcontent:{type:String}      
        }]
    }]

});





module.exports = mongoose.model('User', UserSchema);
