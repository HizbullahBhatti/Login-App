import jwt from 'jsonwebtoken'
import ENV from '../config.js'

const Auth = async(req, res, next) => {
    try {
        
        //access authorize header to validate the request/token
        const token = req.headers.authorization.split(" ")[1]
        
        //Retrive the user details for logged in user
        const decodedToken = await jwt.verify(token,ENV.JWT_SECRET)
        req.user = decodedToken
        
        next()



    } catch (error) {
        res.status(401).send({error:"Authentication Failed"})
    }
}

const localVariable = async (req, res, next)=>{
    req.app.locals = {
        OTP:null,
        resetSession:false
    }
    next()
}

export default Auth
export {localVariable}
