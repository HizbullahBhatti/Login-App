import { Router } from 'express';
const router = Router();

import * as controller from '../controllers/appController.js';




//POST Request 
router.route('/register').post(controller.register) //Register User
//router.route("/registerMail").post(); //Send the verification mail to the user
router.route("/authenticate").post((req,res)=>res.end()); //Authenticate the user
router.route("/login").post(controller.login); //Login the user

//GET Request
router.route('/user/:username').get(controller.getUser); //get us er with username
router.route('/generateOTP').get(controller.generateOTP); //generate OTP
router.route('/verifyOTP').get(controller.verifyOTP); //verify OTP
router.route('/createResetSession').get(controller.createResetSession); //reset all the varaibles for reset password

//PUT Request
router.route('/updateUser').put(controller.updateUser); // is used to update the user details
router.route('/resetPassword').put(controller.resetPassword); // use to reset the password

export default router;