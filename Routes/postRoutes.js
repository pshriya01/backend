const express=require('express')
const {PostModel}=require('../Model/PostModel')
const {auth}=require('../middlewares/authmiddleware')

const postRoute=express.Router()


postRoute.post('/add',auth,
async(req,res)=>{
    try{
        const post=new PostModel(req.body)
        await post.save()
        res.status(200).send({'msg':'post added'})
    }
    catch(err){
        res.status(400).send({'error':err})
    }
})


postRoute.get('/',auth,async(req,res)=>{
    let device=req.query
    let {device1,device2}=req.query
    try{
       if(device){
        const posts=await PostModel.find({userID:req.body.userID,device:device})
       res.status(200).send(posts)
       }
       else if(device1 && device2){
        const posts=await PostModel.find({userID:req.body.userID,device:{device1,device2}})
       res.status(200).send(posts)
       }
       const posts=await PostModel.find({userID:req.body.userID})
       res.status(200).send(posts)
    }
    catch(err){
        res.status(400).send({'error':err})
    }
})

postRoute.patch('/update/:postId',auth,async(req,res)=>{
     const {postId}=req.params
     const note=await PostModel.findOne({_id:postId})
     try{
        if(req.body.userID!==note.userID){
            res.status(400).send({'error':'You are not authorized'})
        }
        else{
            await PostModel.findByIdAndUpdate({_id:postId},req.body)
            res.status(200).send({'msg':'post updated'})
        }
     }
     catch(err){
        res.status(400).send({'error':err})
    }
})

postRoute.delete('/delete/:postId',auth,async(req,res)=>{
    const {postId}=req.params
    const note=await PostModel.findOne({_id:postId})
    try{
       if(req.body.userID!==note.userID){
           res.status(400).send({'error':'You are not authorized'})
       }
       else{
           await PostModel.findByIdAndDelete({_id:postId},req.body)
           res.status(200).send({'msg':'post deleted'})
       }
    }
    catch(err){
       res.status(400).send({'error':err})
   }
})




module.exports={postRoute}