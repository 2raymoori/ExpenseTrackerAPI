const mongoose= require("mongoose");

const incomeSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    dateCreated:{
        type:Date,
        default:new Date.now
    },
    incomeCategory:{
        type:mongoose.Types.ObjectId,
        ref:"incomeCategory"
    }
}) 