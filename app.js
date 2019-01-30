const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

var bodyparser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/gameentries",{
    useMongoClient:true
})
.then(function(){console.log("MongoDB Connected")})
.catch(function(err){console.log(err)});

//Load entry model
require('./models/Entry');
var Entry = mongoose.model('Entries');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public/portfolio'));
app.use(express.static(__dirname + '/public/portfolio/js'));
app.use(express.static(__dirname + '/public/portfolio/images'));
app.use(express.static(__dirname + '/public/portfolio/videos'));

//Callback to about page
router.get('/about',function(req,res){
    res.sendFile(path.join(__dirname + '/about.html'));
 });

//Route to index.html
app.get('/entries',function(req,res){
    res.sendFile(path.join(__dirname + '/entries.html'));
});

app.get('/entrySchema',function(req,res){
    res.sendFile(path.join(__dirname + '/entrySchema.html'));
});


//  //Callback to sitemap
 router.get('/public/portfolio/portfoliopage',function(req,res){
    res.sendFile(path.join(__dirname + '/public/portfolio/portfoliopage.html'));
 });

 router.get('/contact',function(req,res){
     res.sendFile(path.join(__dirname + '/contact.html'));
 });

//Callback to home page
router.get('/',function(req,res){
    //Get the directory
    res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = router;

app.get('/getdata', function(req, res){
    console.log("Request made from fetch");
    Entry.find({})
    .then(function(entries){
        res.send({
            entries:entries
        });
    });
})

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


//routes for paths
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/scripts'));

//Post from form on index.html
app.post('/', function(req,res){
    // res.send("form posted");
    console.log(req.body);    
    var newEntry = {
        title:req.body.title,
        genre:req.body.genre
    }
    new Entry(newEntry)
    .save().then(function(entry){
        res.redirect('/')
    });
});

 //add middleware to app
 app.use('/', router);
 //Return  requested port to user
 app.listen(process.env.port || 3000);

 console.log('Running at Port 3000');