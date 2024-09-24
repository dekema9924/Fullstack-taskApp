const express = require('express');
const app = express();
require('dotenv').config()
const port =  3000;
const accountRoute = require('./Routes/Accountroutes')
const mongoose = require('mongoose')
const TaskRouter = require('./Routes/TaskRoute')
const cors = require('cors')



//ROUTERS
app.use('/accountroute', accountRoute)
app.use('/taskroute', TaskRouter)





app.listen(port,async ()=>{
    await mongoose.connect('mongodb://localhost:27017/Taskify')
    .then(()=>{
        console.log('connected to mongoose')
    })
    console.log(`server open on port ${port}`)
}) 

app.get('/', async (req,res)=>{
   res.redirect('/accountroute')

})
