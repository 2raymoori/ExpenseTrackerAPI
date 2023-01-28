const jwt = require('jsonwebtoken');
const bcyrptJs = require('bcryptjs');
const config = require('config');

const decryptValidatePassword =async(actPassword,hashedPassword)=>{
    const flag = await bcyrptJs.compare(actPassword,hashedPassword);
    return (flag);

}
// encrypt password 
const encryptPassword = async(inputPassword)=>{
    const salt = await bcyrptJs.genSalt(10);
    const encryptedPassword = await bcyrptJs.hash(inputPassword,salt);
    return encryptedPassword;
}
const generateToken = (userData = {})=>{
    //check if all reaquired fields are provided
    console.log(userData);
    if(Object.keys(userData).includes("id") && Object.keys(userData).includes("email") && Object.keys(userData).includes("fName")){
        const payload = {
            id:userData.id,
            email:userData.email,
            fName:userData.fName
        }
        const token = jwt.sign(payload,config.get("privateKey"),{expiresIn:"2h"})
        return token;
    }
    // return -1 if any of the keys is missing
    else{
        console.log("sdfs SSORRY....");
        return -1;
    }
}

module.exports ={
    decryptValidatePassword,
    encryptPassword,
    generateToken
}