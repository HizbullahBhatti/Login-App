import { toast } from "react-hot-toast"
// Validate Username

export async function userNameValidate(values){
    const errors = verifyUserName({},values)
    return errors;
}

export async function passwordValidate(values){
    const errors = verifyPassword({},values)
    return errors;
}

export async function resetPasswordValidate(values){
    const errors = resetPassword({},values)
    return errors;
}

const verifyUserName = (error={},values)=>{
    if(!values.username){
        error.username = toast.error('Username is required')
    }
    else if(values.username.includes(" ")){
        error.username = toast.error('Username cannot contain spaces')
    }
    return error
}

const verifyPassword = (error={},values)=>{

    const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/;

    if(!values.password){
        error.password = toast.error('Password is required')
    }
    else if(values.password.includes(" ")){
        error.password = toast.error('Password cannot contain spaces')
    }
    else if(values.password.length < 6){
        error.password = toast.error('Password must be atleast 6 characters')
    }
    else if(!specialChar.test(values.password)){
        error.password = toast.error('Password must contain atleast one special character')
    }
    return error
}

const resetPassword = (error={},values)=>{
    if(!values.confirm_pwd){
        error.confirm_pwd = toast.error('Confirm Password is required')
    }
    else if(!values.password){
        error.password = toast.error('Password is required')
    }
    else if(values.confirm_pwd !== values.password){
        error.confirm_pwd = toast.error('Password and Confirm Password must be same')
    }
    return error
}