const express = require('express');
const app = express();
const fs = require('fs')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); 

app.get('/', (req, res) => {
    fs.readdir(`./Files`,function(err,Files){
        res.render('index',{Files:Files});
    })
   
});


app.get('/Files/:filename',(req,res)=>{
    fs.readFile(`./Files/${req.params.filename}`,'utf-8' , (err,filedata)=>{
        res.render('show',{filename: req.params.filename , filedata:filedata})
    })
})

app.post('/create' , (req,res)=>{
    fs.writeFile(`./Files/${req.body.title.split(' ').join('')}.txt`, req.body.desc , (err)=>{
        console.log(err)
    })
    res.redirect('/')
})


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
