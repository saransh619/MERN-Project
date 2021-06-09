const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    messages:[
        {
            name:{
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true
            },
            phone:{
                type: Number,
                required: true
            },
            message:{
                type: String,
                required: true
            }, 
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});


//we are doing hasing the password
userSchema.pre('save', async function(next){
    //console.log(this);
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});
//hasing password done


//we are generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token}); //1st token maathi ko Schema ma database ko ho ani 2nd token esko maathi ko generate token bata ho, hamile aru naam ni rakhna sakxam..
        await this.save(); // save always returns promise, so aaile hamile async/await use garne vayera await use gareko..
        return token;
    }catch(err){
        console.log(err);
    }
}

// stored the message 
userSchema.methods.addMessage = async function (namevalue,email,phone,message){
    try{
        this.messages = this.messages.concat({name:namevalue,email,phone,message})// 1st name messages bhitra ko name ho
        await this.save();
        return this.messages;
    }catch(err){
        console.log(err);
    }
}


// collection creation 
const User = mongoose.model('USER', userSchema);
module.exports = User;