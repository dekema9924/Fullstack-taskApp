const express = require('express');
const app = express();
require('dotenv').config()
const port =  3000;
const accountRoute = require('./Routes/Accountroutes')
const mongoose = require('mongoose')
const TaskRouter = require('./Routes/TaskRoute')



//ROUTERS
app.use('/accountroute', accountRoute)
app.use('/taskroute', TaskRouter)





app.listen(port,async ()=>{
    await mongoose.connect(process.env.MONGODBURL)
    .then(()=>{
        console.log('connected to mongoose')
    })
    console.log(`server open on port ${port}`)
}) 

app.get('/', async (req,res)=>{
   res.redirect('/accountroute')

})
