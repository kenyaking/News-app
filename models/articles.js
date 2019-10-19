var mongoose = require("mongoose")
var Schema = mongoose.Schema 

var articleSchema = new Schema({
    title:{
      type:String, 
      required:true  
    },
    link:{
     type:String,
     required:true
    },
    summary:{
     type:String,
     required:false
    },
    image:{
    type:String,
    required:false
    },
    comments:[{
    type:Schema.Types.ObjectId,
    ref:"Comment"
    }]
  })

var article = mongoose.model("article",articleSchema)
module.exports = article