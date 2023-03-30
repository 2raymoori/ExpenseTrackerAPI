const mongoose = require('mongoose');
const config = require('config');
const dbURL = config.get("DB_URL");
const CONNURL = 'mongodb://localhost:27017/incomeExpense';

const connectDB = async ()=>{
    try {
        await mongoose.connect(dbURL);
        console.log("Database connected Successfully...")
    } catch (error) {
        console.log("Server Error "+error.message);
    }
}
module.exports =  connectDB;

/*
  mongodb+srv://lo2raymoori:<password>@cluster0.gq9beyn.mongodb.net/?retryWrites=true&w=majority
  mongodb+srv://lot:15216800556njieS_!@cluster0.dsxagt5.mongodb.net/?retryWrites=true&w=majority
*/