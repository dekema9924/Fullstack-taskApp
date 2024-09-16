const express = require('express');
const app = express();
require('dotenv').config()
const port =  3000;
const accountRoute = require('./Routes/Accountroutes')
const mongoose = require('mongoose')


//middlesware
app.use('/accountroute', accountRoute)


app.listen(port,async ()=>{
    await mongoose.connect('mongodb://localhost:27017/accounts')
    .then(()=>{
        console.log('connected to mongoose')
    })
    console.log(`server open on port ${port}`)
}) 

app.get('/', async (req,res)=>{
   res.redirect('/accountroute')

})
