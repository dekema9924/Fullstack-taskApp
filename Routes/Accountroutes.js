
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
                if (found.length > 0) return res.status(400).json({ message: 'email already exist' })
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

//login account

accountRoute.post('/login', async (req, res) => {
    let { email, password } = req.body
    await accountdb.findOne({email})
    .then((found)=>{
        if(!found) return res.status(400).json({emailerr: 'Invalid email'})
            bcrypt.compare(password, found.password, ((err, hash)=>{
                if(!hash) return res.status(404).json({passworderr: 'Inalid Password'})
                    res.status(200).json({found, message: 'Loggin In'})
                if(err){
                    res.status(400).json({err, message: 'inavlid credentials'})
                }
                    
        }))
    })

})











module.exports = accountRoute

//continue from adding user info to db//