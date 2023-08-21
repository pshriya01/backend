const jwt=require('jsonwebtoken')


const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]
    

    if(token){
        var decoded = jwt.verify(token, 'masai');
        console.log(decoded)
        req.body.userID=decoded.userID
        req.body.user=decoded.user
        next()
    }
    else{
        res.send({'err':'User not Authorized'})
    }
}

module.exports={auth}