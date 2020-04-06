const express = require('express');
const PORT = process.env.PORT || 4001;
const pug = require('pug')
const path = require('path');
const fs = require('fs');
const app= express();

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));
app.use(express.static(path.join(__dirname,'uploads')));

const compiledHomepPageTemplate = pug.compileFile('views/home.pug');


app.get("/", (req,res) => {
          
    let homepage = compiledHomepPageTemplate({
        descriptionShort: "",      
        details:"",
    })
    
    res.send(homepage) 
})

app.post("/submission",(req,res,next) => {
    log = req.body;
    console.log(log);
    res.send(log)
    fs.readFile('./data.json', 'utf-8', function(err, data) {
        if (err) throw err
    
        var dataObject = JSON.parse(data)
        dataObject.push({log})
        
  
    // fs.writeFile('data.json', dataString, (err) => {
    //     if (err) throw err;
    //     console.log('Data written to file');
    // });
    
    // console.log('This is after the write call');
    
        fs.writeFile('./data.json', JSON.stringify(dataObject), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
    })
});


app.listen(PORT);
console.log("server is listening");