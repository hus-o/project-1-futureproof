const express = require('express');
const PORT = process.env.PORT || 4001;
const pug = require('pug')
const path = require('path');
const app= express();
const fs = require("fs")

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));
app.use(express.static(path.join(__dirname,'uploads')));
app.set('view engine', 'pug')

const compiledHomePageTemplate = pug.compileFile('views/home.pug');


app.get("/", (req,res) => {
          
    let homepage = compiledHomePageTemplate({
        descriptionShort: "",
        condition: "",
        price:"",
        details:"",
    })
    
    res.send(homepage) 
})

app.get("/blogposts", (req,res) =>{
    let rawData = fs.readFileSync("db.json")
    let blogData = JSON.parse(rawData)
    console.log(blogData)
    res.render("results",{blogData:blogData})
    
})

app.listen(PORT);
console.log("server is listening");