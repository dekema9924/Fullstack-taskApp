
var jwt = require('jsonwebtoken');
require('dotenv').config()



const jwtAuth =(finduser)=>{
   const token = jwt.sign({ id: finduser._id }, process.env.TOKEN_SECRET, {expiresIn: '1h'} )
   return token
  
}

module.exports = jwtAuth
