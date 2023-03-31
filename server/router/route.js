import { Router } from 'express';
const router = Router();

import * as controller from '../controllers/appController.js';




//POST Request 
router.route('/register').post((req,res)=>{res.json("register route")}) //Register User
router.route("/registerMail").post(); //Send the verification mail to the user
router.route("/authenticate").post(); //Authenticate the user
router.route("/login").post(); //Login the user

//GET Request
router.route('/user/:username').get(); //get user with username
router.route('/generateOTP').get(); //generate OTP
router.route('/verifyOTP').get(); //verify OTP
router.route('/createResetSession').get(); //reset all the varaibles for reset password

//PUT Request
router.route('/updateUser').put(); // is used to update the user details
router.route('/resetPassword').put(); // use to reset the password

export default router;