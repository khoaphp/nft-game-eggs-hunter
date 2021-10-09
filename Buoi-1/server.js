var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(process.env.PORT || 3000);

var fs = require("fs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nftblockchain:nLt2GtL7l6xwtLPg@cluster0.qah5q.mongodb.net/Eggs_Hunter_01?retryWrites=true&w=majority', function(err){
    if(err){console.log("Mongo connect error! " + err);}
    else{ console.log("Mongo connected successfully."); }
});

loadConfig("./config.json");
function loadConfig(file){
    var obj;
    fs.readFile(file, "utf-8", function(err, data){
        if(err){throw err;}
        obj=JSON.parse(data);
        require("./routes/user")(app, obj);
    });
}