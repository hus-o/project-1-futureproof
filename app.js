const express = require('express');
const PORT = process.env.PORT || 4001;
const pug = require('pug')
const path = require('path');
const app= express();
const fs = require("fs");
const bodyParser = require("body-parser")

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));
app.use(bodyParser.json())


app.set('view engine', 'pug')

const compiledHomePageTemplate = pug.compileFile('views/home.pug');

function generateRandomId(){
    return Math.floor(Math.random()*100000).toString() 
}

function savePost(postData){

    let post = { 
        "ID": generateRandomId(),
        "userName":postData.userName,
        "postContent": postData.postContent,
        "comments": " ",
        "gif": {url:postData.selectedGifURL, title:postData.selectedGifALT},
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
  
    fs.readFile('./db.json', 'utf-8', function(err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(data)
    
        if(arrayOfObjects[0] === undefined){
            arrayOfObjects= [];
        }
    
        console.log("post id from comments submit", postComment.ID)

        if(arrayOfObjects.find(x => x.ID === postComment.ID).comments === " "){
            arrayOfObjects.find(x => x.ID === postComment.ID).comments = []
        }

        arrayOfObjects.find(x => x.ID === postComment.ID).comments.push(postComment.comment)

        fs.writeFile('./db.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('post added to db.json')
        })
    })
}

function getComments(postComment){

    return new Promise(resolve=>{
        fs.readFile('./db.json', 'utf-8', function(err, data) {
            if (err) throw err
            var arrayOfObjects = JSON.parse(data)
            let allComments = arrayOfObjects.find(x =>x.ID === postComment.ID).comments
            var lastAddedComment= allComments.pop()
            console.log("last added", lastAddedComment)
            resolve(lastAddedComment)
        })   
    })
}


app.get("/", (req,res) => {

    let homepage = compiledHomePageTemplate({
        "ID": "",
        "userName":"",
        "postContent":"",
        "comments": " ",
        "gif":"",
        "emoji":""
    })
    
    res.send(homepage) 
})

app.get("/blogPosts", (req,res) =>{
    let rawData = fs.readFileSync("db.json")
    let blogData = JSON.parse(rawData)
    res.render("results", {blogData:blogData})
})

app.post("/submitPost", (req,res) =>{
    savePost(req.body);
    res.redirect("/blogPosts")
})

app.post("/addComment",(req,res) =>{
    console.log(req.body)
    addComment(req.body);
    res.end()
})

app.post("/comments", (req,res)=>{
    console.log("in the comments function")

    getComments(req.body).then((result) =>{
        res.send(result);
    })
})

app.listen(PORT);
console.log("server is listening");