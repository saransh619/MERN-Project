const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

// step 2: heroku
const PORT = process.env.PORT || 5000;

require('./db/conn');
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

// we link the router files to make our route easy 
app.use(require('./router/auth'));

// app.get('/about', (req, res)=>{
//     // console.log('I am about page');
//     res.send('This is about page');
// })
// app.get('/contact',(req, res)=>{
//     res.send('This is contact page');
// })
// app.get('/signin',(req, res)=>{
//     res.send('This is signin page');
// })
// app.get('/signup',(req, res)=>{
//     res.send('This is signup page');
// });


// step 3: heroku
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(PORT,()=>{
    console.log(`Server is running at port no. ${PORT}`);
})