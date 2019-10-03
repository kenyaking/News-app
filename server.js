var express = require("express")
var expHbs = require("express-handlebars")
var mongoose = require("mongoose")
var axios = require("axios")
var cheerio = require("cheerio")

var app = express ()
var port = 3000

app.use(express.static("public"))
app.engine("handlebars",expHbs({
    defaultLayout:"main"
}))
app.set("view engine","handlebars")

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.listen(port, function(){
    console.log("listening on port 3000")
})