
const express = require('express')
const accountRoute = express.Router();
const accountdb = require('../Model/accountmodels')
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwtAuth = require('../Auth/jwt');
const verifyToken = require('../middleware/AuthUser')
var cookieParser = require('cookie-parser')





accountRoute.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
accountRoute.use(express.json());
accountRoute.use(express.urlencoded({extended: true}));
accountRoute.use(cookieParser())




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
                        result.password = null
                        res.status(200).json({result, message: 'account created. ' })
                    })

            })
    }))

})

//login account

accountRoute.post('/login',  async  (req, res) => {
    let { email, password } = req.body
    await accountdb.findOne({email})
    .then((found)=>{
        if(!found) return res.status(400).json({emailerr: 'Invalid email'})
            bcrypt.compare(password, found.password, ((err, hash)=>{
                if(!hash) return res.status(404).json({passworderr: 'Inalid Password'})
                    //authenticate user
                    const accesstoken = jwtAuth(found)
                    res.cookie('jwt', accesstoken, {maxAge:1000 * 60 * 15})
                    res.status(200).json({accesstoken, userId:found, message: 'Loggin In', isLoggedIn: true})
                if(err){
                    res.status(400).json({err, message: 'inavlid credentials', isLoggedIn: false})
                }                
        }))
    })

})

accountRoute.get('/notes', verifyToken, ((req,res)=>{
    let authUser = req.user;
    accountdb.findById(authUser.id).select('-password')
    .then((result)=>{
        // console.log(result)
        if(result) return res.status(200).json({result, isLoggedIn: true })

    })
}))

accountRoute.get('/logoff', ((req,res)=>{
    res.status(200).json({message: 'logged off successfully'})

}))












module.exports = accountRoute

