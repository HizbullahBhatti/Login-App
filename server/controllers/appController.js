import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "otp-generator";


//Middleware for verify user
export const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    //check the user existence
    let exist = userModel.findOne({ username });
    if (!exist) {
      res.status(404).send({ error: "can't find User!" });
    }
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Failed" });
  }
};

//POST: http://localhost:8080/api/register
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // check the existing user
    const existUsername = new Promise((resolve, reject) => {
      userModel
        .findOne({ username })
        .then((user) => {
          if (user) {
            reject({ error: "Please use unique username" });
          } else {
            resolve();
          }
        })
        .catch((err) => reject(new Error(err)));
    });

    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
        userModel.findOne({ email })
        .then(em => {
          if (em) {
            reject({ error: "Please use unique Email" });
          } else {
            resolve();
          }
        })
        .catch(err => reject(new Error(err)));
      
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new userModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

// POST: http://localhost:8080/api/login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    userModel
      .findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).send({ error: "Password did not Match" });
            }
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "1h" }
            );

            return res.status(200).send({
              msg: "Login Successfull",
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Incorrect Password" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "User not found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

//GET: http://localhost:8080/api/user/example123
const getUser = async (req, res) => {
  
    const { username } = req.params;

    try {
        
        if(!username) return res.status(501).send({ error:"Invalid Username"})

        userModel.findOne({ username })
        .then((user) => {
            // if(err) return res.status(500).send({err})
            if(!user) return res.status(501).send({error:"Could not find user"})

            const{password, ...rest} = user._doc

            return res.status(201).send(rest)
        })
        .catch((error) => {});

    } catch (error) {
        return res.status(404).send({ error: "User not found" })
    }

};

//PUT: http://localhost:8080/api/updateuser
const updateUser = async (req, res) => {
  
    try {
        //const id  = req.query.id
        const {userId} = req.user

        if(userId) {
            const body = req.body

            //update the data
            userModel.updateOne({ _id:userId }, body)
            .then(()=>{
                return res.status(201).send({data:"User Updated Successfully"})
            })
            .catch(err=>{
                throw err
            })
        }
        else{
            return res.status(401).send({error:"User not found..."})
        }


    } catch (error) {
        res.status(401).send({error})
    }
};

//GET: http://localhost:8080/api/generateOTP
const generateOTP = async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
  res.status(201).send({ code:req.app.locals.OTP })
};

//GET: http://localhost:8080/api/verifyOTP
const verifyOTP = async (req, res) => {
  res.json("verifyOTP route");
};

//GET: http://localhost:8080/api/createResetSession
const createResetSession = async (req, res) => {
  res.json("createResetSession route");
};

//PUT: http://localhost:8080/api/resetPassword
const resetPassword = async (req, res) => {
  res.json("resetPassword route");
};

export {
  login,
  getUser,
  updateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
};
