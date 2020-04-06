const express = require('express');
const PORT = process.env.PORT || 4001;
const pug = require('pug')
const path = require('path');
const app= express();
const fs= require('fs');

app.set('view engine', 'pug');

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));
app.use(express.static(path.join(__dirname,'uploads')));

const compiledHomepPageTemplate = pug.compileFile('views/home.pug');


function savePost(postData){

    // let post = { 
    //     id: null, 
    //     title: postData.title,
    //     message: postData.message,
    //     comments: {},
    //     emoji: null,
    //     giphy: null    
    // };

    let post = { 
        descriptionShort: postData.descriptionShort,
        condition: postData.condition,
        price: postData.price,
        details: postData.details,
    };

    var fs = require('fs')

    fs.readFile('./posts.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        
        if(arrayOfObjects[0] === undefined){
            arrayOfObjects= []
        }
        
        arrayOfObjects.push(post)
                
        fs.writeFile('./posts.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
    })
}


app.get("/", (req,res) => {
          
    let homepage = compiledHomepPageTemplate({
        descriptionShort: "",
        condition: "",
        price:"",
        details:"",
    })
    
    res.send(homepage) 
})

app.post("/submitPost", (req,res) => {
    
    console.log("data recieved", req.body)
    savePost(req.body)
    res.send("sucessfully saved post")

})

app.listen(PORT);
console.log("server is listening");