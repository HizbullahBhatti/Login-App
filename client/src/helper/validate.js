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
    if(!values.password){
        error.password = toast.error('Password is required')
    }
    else if(values.password.includes(" ")){
        error.password = toast.error('Password cannot contain spaces')
    }
    else if(values.password.length < 6){
        error.password = toast.error('Password must be atleast 6 characters')
    }
    return error
}