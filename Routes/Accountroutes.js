
const express = require('express')
const accountRoute = express.Router();
const accountdb = require('../Model/accountmodels')

accountRoute.get('/', async (req,res)=>{
    res.send('hey from routes')
})


module.exports = accountRoute