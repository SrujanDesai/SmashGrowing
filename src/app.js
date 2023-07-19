const express = require("express");
const app = express();
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const user = require("./models/userdata");
const port = process.env.PORT || 8000;

// setting the path
const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use('/css' , express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js' , express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq' , express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.set("view engine" , "hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath); 

// routing
app.get("/",(req,res) => {
    res.render("index");
})


app.post("/contact",async(req,res) => {
    try {
        // res.send(req.body);
        const userData = new user({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message
        });
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error)
    }
})

// server create 
app.listen(port , () =>{
    console.log(`running at port number ${port}`);
})