const mongoose = require('mongoose');
const CONNURL = 'mongodb://localhost:27017/incomeExpense';

const connectDB = ()=>{
    try {
        mongoose.connect(CONNURL);
        console.log("Database connected Successfully...")
    } catch (error) {
        console.log("Server Error "+error.message);
    }
}
module.exports =  connectDB;