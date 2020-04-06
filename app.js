const express = require('express');
const PORT = process.env.PORT || 4001;
const pug = require('pug')
const path = require('path');
const app= express();

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));
app.use(express.static(path.join(__dirname,'uploads')));

const compiledHomepPageTemplate = pug.compileFile('views/home.pug');


app.get("/", (req,res) => {
          
    let homepage = compiledHomepPageTemplate({
        descriptionShort: "",
        condition: "",
        price:"",
        details:"",
    })
    
    res.send(homepage) 
})

app.listen(PORT);
console.log("server is listening");