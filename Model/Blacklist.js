const mongoose=require('mongoose')

const tokenSchema=mongoose.Schema({
   token:String
})

const TokenModel=mongoose.model('blacklisttoken',tokenSchema)


module.exports={TokenModel}