const express = require('express');
const PORT = process.env.PORT || 4001;
const pug = require('pug')
const path = require('path');
const app= express();
const fs = require("fs");

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));

app.set('view engine', 'pug')

const compiledHomePageTemplate = pug.compileFile('views/home.pug');

function savePost(postData){

    let post = { 
        "ID":postData.ID,
        "userName":postData.userName,
        "postContent": postData.postContent,
        "comments": {},
        "gif": postData.selectedGif,
        "emoji": postData.emoji,
    };

    fs.readFile('./db.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        
        if(arrayOfObjects[0] === undefined){
            arrayOfObjects= []
        }
        
        arrayOfObjects.unshift(post)
                
        fs.writeFile('./db.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('post added to db.json')
        })
    })

}


function addComment(postComment){
    //get id
    //append comment to empty
    //re load the results


}


app.get("/", (req,res) => {

    let homepage = compiledHomePageTemplate({
        "ID": "",
        "userName":"",
        "postContent":"",
        "comments":[],
        "gif":"",
        "emoji":""
    })
    
    res.send(homepage) 
})

app.get("/blogPosts", (req,res) =>{
    let rawData = fs.readFileSync("db.json")
    let blogData = JSON.parse(rawData)
    res.render("results",{blogData:blogData})
})

app.post("/submitPost", (req,res) =>{
    savePost(req.body);
    res.redirect("/blogPosts")
})

app.post("/addComment",(req,res) =>{
    console.log(req.body)
    addComment(req.body);
    res.send("successfuly added post")

})



app.listen(PORT);
console.log("server is listening");