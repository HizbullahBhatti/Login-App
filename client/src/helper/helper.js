import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

export const authenticate = async()=>{
    try {
        return await axios.post('/api/authenticate',{username})
    } catch (error) {
        return {error:"Username does not exist"}
    }
}

export const getUser = async({username})=>{
    try {
        const {data} = await axios.get(`api/user/${username}`)
        return {data}
    } catch (error) {
        return {error:'Password does not match ...'}
    }
}

export const registerUser = async(credentials)=>{
    try {
        const { data : {msg} , status } = await axios.post(`/api/register`,credentials)

        let {username,email} = credentials
        
        //send email for registration
        if(status === 201){
            await axios.post('/api/sendmail',{username,email:email,text:msg})
        }

        return Promise.resolve(msg)


    } catch (error) {
        return Promise.reject(error)
    }
}

export const verifyPassword = async({username,password})=>{
    try {
        if({username}){
            const {data} = await axios.post('/api/login',{username,password})        
            return Promise.resolve({data})
        }
    } catch (error) { 
        return Promise.reject({error:'Password does not match ...'})
    }
}

//Update user
export const updateUser = async(response)=>{
    try {
        const token = localStorage.getItem('token')
        const {data} = await axios.put('/api/updateUser',response,{headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve({data})

    } catch (error) {
        return Promise.reject({error:'could not update user'})
    }
}

//generate OTP
export const generateOTP = async(username)=>{
    try {
        const {data:{code},status} =  await axios.get('api/generateOTP',{params:{username}})
        if(status === 201){
            let {data:{email}} =  await getUser({username})
            let text = `Your Password Reset OTP is ${code} Verify it to reset your password`
            await axios.post('/api/registerMail',{username,email,text,subject:'Password Reset OTP'})
        }
        return Promise.resolve(code)
    } catch (error) {
        return Promise.reject({error:'could not generate OTP'})
    }

}

export const verifyOTP = async({username,code})=>{
    try {
        const {data,status} = await axios.get('api/verifyOTP',{params:{username,code}})
        return{data,status}
    } catch (error) {
        return Promise.reject({error:'could not verify OTP'})
    }
}

export const resetPassword = async({username,password})=>{
    try {
        const {data,status} = await axios.put('/api/resetPassword',{username,password})
        return Promise.resolve({data,status})
    } catch (error) {
        Promise.reject({error})
    }
}