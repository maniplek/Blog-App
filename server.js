const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

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

app.get('/about', (req,res)=>{
    res.render('about',{title: "About"});
});

// blog routes
app.use('/blogs',blogRoutes);

// 404
app.use((req,res)=>{
    res.status(404).render('404',{title: "404"})
})

//
const port = process.env.PORT || 5000; 
app.listen(port , ()=> console.log(`We're running on port ${port}...`));
