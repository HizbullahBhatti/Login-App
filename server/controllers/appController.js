
//POST: http://localhost:8080/api/register 
const register = async(req, res) => {
    res.json("register route");
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

export { register, login, getUser, updateUser, generateOTP, verifyOTP, createResetSession, resetPassword}
