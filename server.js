const _ = require('lodash');
//import { Express } from 'express';
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./model/blog');
const { render } = require('ejs');

const app = express();
//Umd79cZkXJkcTzq7

//CONNECT TO MONGO DB
const dbURI = 'mongodb+srv://admin:Umd79cZkXJkcTzq7@cluster0.1gklr.mongodb.net/node?retryWrites=true&w=majority';
mongoose.connect( dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=> console.log('connected to db.....'))
 .catch((err)=> console.log(err))


//register view engine 
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/',(req,res)=>{
   res.redirect('blogs');
});

app.get('/blogs', (req,res)=>{
    Blog.find().sort({ createdAt: -1})
     .then(result =>{
         res.render('index' , { title: 'all Blogs', blogs: result})
     })
     .catch(err => console.log(err)); 
});

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);

    blog.save()
     .then((result)=>{
        res.redirect('/blogs');        
     })
     .catch((err)=>{
         console.log(err);
     })
    //  console.log(req.body);
});

app.get('/blogs/:id', (req,res)=>{
    const id = req.params.id
    Blog.findById(id)
     .then(result => {
         res.render('details' , {blog: result , title: 'Blog Details'});
     })
     .catch(err => console.log(err));
})

app.get('/about', (req,res)=>{
    res.render('about',{title: "About"});
});

app.get('/blogs/create', (req,res)=>{
    res.render('create',{title: "Create a new Blog"})
});



app.use((req,res)=>{
    res.status(404).render('404',{title: "404"})
})

//
const port = process.env.PORT || 5000; 
app.listen(port , ()=> console.log(`We're running on port ${port}...`));
