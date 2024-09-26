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
const corsOptions ={
    origin:'http://localhost:5173/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));





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
