const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require('../model/userSchema');

// router.get('/', (req,res)=>{
//     res.send(`Hello world from the server router js`);
// });

// using promises 

// router.post('/register', (req,res) => {
//     // console.log(req.body);
//     //  res.json({message:req.body});//esle postman ma data show garxa
//     // // res.send(`My register page`);
//     const {name, email, phone, work, password, cpassword} = req.body;
//     // console.log(name);
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "Please fill the field properly"})
//     }
    
//     User.findOne({email : email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error: "Email already exist"});
//         }
//         // eta left side ko 'name' hamro database ma bhako ani right side ma bhako 'name' new register garda ho ani hamile "name" matra lekhda ni hunxa
//         const user = new User({name:name, email, phone, work, password, cpassword});
//         // .save() method returns promises
//         user.save().then(()=>{
//             res.status(201).json({message: "User registered successfully"});
//         }).catch((err)=>{
//             res.status(500).json({error: "Failed to registered"})});
//     }).catch((err)=>{console.log(err);});
// });

// using async/await 
router.post('/register', async (req,res) => {
    // console.log(req.body);
    //  res.json({message:req.body});//esle postman ma data show garxa
    // // res.send(`My register page`);
    const {name, email, phone, work, password, cpassword} = req.body;
    // console.log(name);
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "Please fill the field properly"})
    }
    
    try{
        const userExist = await User.findOne({email : email});
        if (userExist) {
            return res.status(422).json({error: "Email already exist"});
        } else if (password!==cpassword) {
            res.status(422).json({error:"Password are not matching"});
        } else {
            // eta left side ko 'name' hamro database ma bhako ani right side ma bhako 'name' new register garda ho ani hamile "name" matra lekhda ni hunxa
            const user = new User({name:name, email, phone, work, password, cpassword});

            // BcryptJS- Hashing..data lai get ani save method lai call garnu vanda pahila password Hashing garnu parxa..esko kaam model-UserSchema ma bhako xa

            await user.save();
            res.status(201).json({message: "User registered successfully"});
        } 
    } 
    catch (err){
        console.log(err);
    }
});

// login route 
router.post('/signin', async (req,res) => {
    try{
        // console.log(req.body);
        // res.json({message:"Login successful"});
        const {email, password} = req.body;
        // console.log(name);
        if(!email || !password){
            return res.status(422).json({error: "Please fill the field properly"})
        }
        const userLogin = await User.findOne({email:email}); 
        // console.log(userLogin);
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);//1st parameter ma user le login garda fill gareko password ani 2nd parameter ma database ma hashing bhako password compare garna lai..

            // if(!userLogin){
            //     res.status(400).json({error:"User error"});
            // }else{
            //     res.json({message:"User Signin successfully"});
            // }

            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2589200000), //after 30 days expire
                httpOnly: true
            })

            if(!isMatch){
                res.status(400).json({error:"Invalid credentials pass"});
            }else{
                res.json({message:"User signin successfully"});
            }
        } else {
            res.status(400).json({error:"Invalid credentials"});
            } 
    } catch (err) {
        console.log(err);
    }
});

// Anout Us page 
router.get('/about', authenticate, (req, res)=>{
    res.send(req.rootUser);
})

// get user data for contact us and home page  
router.get('/getdata' , authenticate, (req, res)=>{
    res.send(req.rootUser);
})

//contact us page
router.post('/contact', authenticate, async (req,res) => {
    try{
        const {name,email,phone,message} = req.body;

        if(!name || !email || !phone || !message){
            console.log("Error in contact page");
            return res.json({error: "please filled all fields properly"})
        }

        const userContact = await User.findOne({_id : req.userID});

        if(userContact){
            const userMessage = await userContact.addMessage(name,email,phone,message);
            await userContact.save();
            res.status(201).json({message: "User contact successfully"});
        }
    }catch(err){
        console.log(err);
    }
});

// Logout page 
router.get('/logout', (req,res) => {
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('User logout successfully');
});


module.exports = router;