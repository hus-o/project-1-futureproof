const express = require('express');
const PORT = process.env.PORT || 4001;
const pug = require('pug')
const path = require('path');
const app= express();

const fs = require('fs');

// let blog = {
//     ID: 1,
//     userName: "text", 
//     postContent: "text",
//     comments: {},
//     gif: "giphy1",
//     emoji: "smiley"
// };
// let data = JSON.stringify(blog)

// fs.writeFileSync('db.json', data, (err) => {
//     if(err){
//         console.log('success')
//     }
// })

function updatePostDb(blog){
	
	let data = JSON.stringify(blog)

	fs.writeFile('db.json', data, (err) => {
		if(err){
			console.log('success')
		}
	})
}




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

app.post("/submitPost", (req, res) => {
    const uName = req.body.userName;
    const blogContent = req.body.postContent;
    updatePostDb(uName);
    updatePostDb(blogContent)
})




app.listen(PORT);
console.log("server is listening");