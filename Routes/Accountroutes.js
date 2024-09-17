
const express = require('express')
const accountRoute = express.Router();
const accountdb = require('../Model/accountmodels')
const cors = require('cors')
const bcrypt = require('bcrypt');



accountRoute.use(cors())
accountRoute.use(express.json());

accountRoute.get('/', async (req, res) => {
    res.send('hey from routes')
})


//create account
accountRoute.post('/register', (req, res) => {
    let { email, username, password } = req.body;

    bcrypt.hash(password, 10, (async (err, hash) => {
        await accountdb.find({ email })
            .then(async (found) => {
                if (found.length > 0) return res.status(400).json({  message: 'email already exist' })
                let newuser = await accountdb.create({
                    username, email, password: hash
                })
                await newuser.save()
                    .then((result) => {
                        res.status(200).json({ result, message: 'account created. ' })
                    })

            })
    }))

})










module.exports = accountRoute

//continue from adding user info to db//