var mongoose = require("mongoose")
var Schema = mongoose.Schema 

var commentSchema = new Schema({
    name:{
      type:String, 
      required:true  
    },
    comment:{
     type:String,
     required:true
    },
    createdAt:{
     type:Date,
     default:Date.now
    }
})

var comment = mongoose.model("comment",commentSchema)
module.exports = comment     