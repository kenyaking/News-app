var express = require("express")
var expHbs = require("express-handlebars")
var mongoose = require("mongoose")
var axios = require("axios")
var cheerio = require("cheerio")
var bodyParser = require("body-parser")
require("dotenv").config()

var app = express ()
var port = process.env.PORT || 3000

var models = require("./models")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.static("public"))
app.engine("handlebars",expHbs({
    defaultLayout:"main"
}))
app.set("view engine","handlebars")
console.log(process.env.MONGODB_URI)
var MONGODB_URI = "mongodb://userkknews:Lovemlab19b@ds141208.mlab.com:41208/heroku_ctdp4z3d"; //|| process.env.MONGOLAB_ROSE_URI;

mongoose.connect(MONGODB_URI);

app.get("/", function(req,res){
    models.article.find().then(function(data){
        var result = {
            article:data
        }
        res.render("partials/articles",result)
    })
})

app.get("/scrape",function(req,res){
    axios.get("https://www.washingtonpost.com/business/technology/").then(function(response) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);
      
        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $(".story-list-story").each(function(i, element) {
      
            var title = $(element).find(".story-headline h2").text();
            var link = $(element).find(".story-headline h2 a").attr("href");
            var summary = $(element).find(".story-description p").text();
            var image = $(element).find(".story-image a img").attr("src");
      
            models.article.findOne({ "title": title }).then(function(data){
                if(data == null){
                    models.article.create({
                        title, 
                        link,
                        summary,
                        image
                    }).then(function(article){
                        console.log(article)
                    })
                }
            })

            res.json("scraped to database")
        });
    });
})

app.get("/articles", function(req,res){
    models.article.find().then(function(data){
        res.json(data)
    })
})

//    /articles/5da74f22f7df94d503dbc69e
app.get("/articles/:id", function(req,res){
    models.article.findOne({
        _id: req.params.id
    }).populate({
        path: "comments",
        model: models.comment
    }).then(function(data){
        res.json(data)
    })                                                                                                                                                                                                                                                                                                   
})

app.post("/articles/:id", function(req,res){
    models.comment.create(req.body).then(function(comment){        
        models.article.findOne({
            _id: req.params.id
        }).then(function(article){
            article.comments.push(comment._id)
            article.save()
            res.json(article)
        })
    })
})

app.delete("/comments/:id",function(req, res){
    models.comment.remove({
        _id: req.params.id
    }).then(function(data){
        console.log("comment deleted")
    })
})
 
app.listen(port, function(){
    console.log("listening on port 3000")
})