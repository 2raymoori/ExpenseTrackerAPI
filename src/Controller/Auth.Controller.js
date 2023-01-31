const UserModel = require('../Model/User.model');
const userSchema = require('../Model/User.model');
const { encryptPassword, decryptValidatePassword, generateToken } = require('../Utils/generalUtils');
const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        console.log(req.body);
        // check if user exists
        const findUser = await UserModel.find({email});
        if(findUser?.length > 0){
            const curUser = findUser[0];
            const hashedPassword = curUser.password;
            const verifyPass =await decryptValidatePassword(password,hashedPassword);
            if(verifyPass){ 
                const getToken = generateToken({"id":curUser.id,"email":curUser.email,"fName":curUser.fName});
                return res.status(200).json({"status":"success","token":getToken,"user":curUser});
            }else{
                return res.status(201).json({"status":"error","msg":"NO such user with these credentials."})
            }
        }
        else{
            return res.status(201).json({"status":"error","msg":"NO such user with these credentials."})
        }
    }catch(err){
        return res.status(500).json({"msg":"Sorry There exists an error in the server."});
    }
};
const Signup = async(req,res)=>{
    
    try {
        const {email,password,fName,lName} = req.body;
        const hashedPassword = await encryptPassword(password);
        // check for emai existence first. 
        const doesUserExists = await UserModel.find({"email":email});
        if(doesUserExists?.length === 0) {
           // console.log(req.body);
            const newUser = new UserModel();
            newUser.email = email;
            newUser.password = hashedPassword;
            newUser.fName = fName; 
            newUser.lName = lName; 
            await newUser.save();
            const getToken = generateToken({"id":newUser.id,"email":newUser.email,"fName":newUser.fName});
            return res.status(200).json({"status":"success","token":getToken,"user":newUser});
        }else{
            return res.status(201).json({"msg":"Sorry There exists a user in the system with this email. Please Try again with a different email"});
        }
    } catch (error) {
        return res.status(500).json({"msg":"Sorry There exists an error in the server."});
    }
}

module.exports = {login,Signup}
