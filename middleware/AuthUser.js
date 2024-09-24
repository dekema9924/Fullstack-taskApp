 
var jwt = require('jsonwebtoken');
require('dotenv').config()



const verifyToken = async (req,res,next)=>{
    const token = req.cookies.jwt;


    if(!token) return res.status(403).json({message: 'unauthorized, jwt token required.'})
        try {
            jwt.verify(token, process.env.TOKEN_SECRET, ((err, decoded)=>{
                req.user= decoded;
                next();
                if(err) return res.status(403).json({message: 'invalid token'})
        }))
            
        } catch (error) {
            console.log(error)
        }
       
    

};

module.exports = verifyToken;