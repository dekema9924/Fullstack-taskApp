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
    origin:'https://fullstack-taskapp.onrender.com', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "React app URL"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });





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
