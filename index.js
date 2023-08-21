const express=require('express')
const {connection}=require('./db')
const cors=require('cors')
const {userRoute}=require('./Routes/userRoutes')
const {postRoute}=require('./Routes/postRoutes')
const app=express()
app.use(express.json())
app.use(cors())
app.use('/users',userRoute)
app.use('/posts',postRoute)



app.listen(8000,async()=>{
    try{
        await connection
        console.log('connected to DB')
        console.log('server is running at port 8000')
    }
    catch(err){
        console.log(err)
    }
})