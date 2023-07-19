const mongoose = require("mongoose");

// creating a database
mongoose.connect("mongodb://localhost:27017/SmashGrowing")
.then(() =>{
    console.log("connection successfull");
}).catch(() =>{
    console.log("No connection");
})  