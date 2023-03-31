import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

//POST: http://localhost:8080/api/register 
export async function register(req,res){

    try {
        const { username, password, profile, email } = req.body;        

        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function(err, user){
                if(err) reject(new Error(err))
                if(user) reject({ error : "Please use unique username"});

                resolve();
            })
        });

        // check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function(err, email){
                if(err) reject(new Error(err))
                if(email) reject({ error : "Please use unique Email"});

                resolve();
            })
        });


        Promise.all([existUsername, existEmail])
            .then(() => {
                if(password){
                    bcrypt.hash(password, 10)
                        .then( hashedPassword => {
                            
                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                                .catch(error => res.status(500).send({error}))

                        }).catch(error => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send({ error })
            })


    } catch (error) {
        return res.status(500).send(error);
    }

}

// POST: http://localhost:8080/api/login 
const login = async(req, res) => {
    res.json("Login route");
}

//GET: http://localhost:8080/api/user/example123
const getUser = async(req, res) => {
    res.json("getUser route");
}

//PUT: http://localhost:8080/api/updateuser 
const updateUser = async(req, res) => {
    res.json("updateUser route");
}

//GET: http://localhost:8080/api/generateOTP
const generateOTP = async(req, res) => {
    res.json("generateOTP route");
}

//GET: http://localhost:8080/api/verifyOTP
const verifyOTP = async(req, res) => {
    res.json("verifyOTP route");
}

//GET: http://localhost:8080/api/createResetSession
const createResetSession = async(req, res) => {
    res.json("createResetSession route");
}

//PUT: http://localhost:8080/api/resetPassword
const resetPassword = async(req, res) => {
    res.json("resetPassword route");
}

export {login, getUser, updateUser, generateOTP, verifyOTP, createResetSession, resetPassword}
