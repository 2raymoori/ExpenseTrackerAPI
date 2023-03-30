const jwt = require('jsonwebtoken');
const config = require('config');

const authenticate = (req,res,next)=>{
    // fetch the token from the request header
    ;
	const token = req.header('user-auth-token')
    // return error if no token given from the header and terminate the request.
    console.log("Token!!!");
    console.log(token);
    if(!token){

        return res.status(401).json({
            status:"Error",
            msg: {info:'No Token, authorization denied'}
        })
    }else{
        try{
            // validate the token
            const decode = jwt.verify(token,config.get('privateKey'));
            req.user = {
                email:decode.email,
                id:decode.id,
                fName:decode.fName
            }
            next();
        }catch(error){
            return res.status(500).json({
                status:'Error',
                data:[{msg:'Invalid token, authorization denied'}]
            })
        }
    }
}

module.exports = authenticate;
