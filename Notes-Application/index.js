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
app.get('/edit/:filename',(req,res)=>{
   res.render('edit' , {filename:req.params.filename})
})
app.post('/edit', (req, res) => {
    const oldName = req.body.previoustitle.split(' ').join('');
    const newName = req.body.newtitle.split(' ').join('');

    fs.rename(`./Files/${oldName}`, `./Files/${newName}`, (err) => {
        if (err) {
            console.error("Error renaming file:", err);
            return res.status(500).send("An error occurred.");
        }
        res.redirect('/');
    });
});

app.post('/create' , (req,res)=>{
    fs.writeFile(`./Files/${req.body.title.split(' ').join('')}.txt`, req.body.desc , (err)=>{
        console.log(err)
    })
    res.redirect('/')
})
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
