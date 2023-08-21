const express=require('express')
const {UserModel}=require('../Model/UserModel')
const {TokenModel}=require('../Model/Blacklist')
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken');

const userRoute=express.Router()

userRoute.post('/register',async(req,res)=>{
    console.log(req.body)
    const {name,email,gender,password,age,city,is_married}=req.body
    try{
      const existingUser=await UserModel.findOne({email})
      if(existingUser){
        res.status(200).send({'msg':'User already exist, please login'})
      }else{
        bcrypt.hash(password,5,async function(err, hash) {
            if(err){
                res.send({'err':err})
            }else{
                const user=new UserModel({name,email,gender,password:hash,age,city,is_married})
                await user.save()
                res.status(200).send({'msg':'New User is Registered'})
            }
        });
      }
    }
    catch(err){
        res.status(400).send({'error':err})
    }

})

userRoute.post('/login',async(req,res)=>{
    const {password,email}=req.body
    console.log(req.body)
    try{
      const user=await UserModel.findOne({email})
      if(user){
        bcrypt.compare(password,user.password, function(err, result) {
            if(err){
                res.send({'err':err})
            }
            else{
                var token = jwt.sign({userID:user._id,user:user.name}, 'masai');
                res.status(200).send({'msg':'User logged in',token})
            }
        });
      }  
    }
    catch(err){
        res.status(400).send({'error':err})
    }

})

userRoute.get('/logout',async(req,res)=>{
  const token=req.headers.authorization?.split(' ')[1]
    try{
      const savetoken=await new TokenModel(token)
      await savetoken.save()
      res.status(200).send({'msg':'User is logged out'})
    }
    catch(err){
      res.status(400).send({'error':err})
  }
})


module.exports={userRoute}



