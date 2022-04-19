const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    expenseDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    expenseCategory:{
        type:mongoose.Types.ObjectId,
        ref:'expenseCategory',
    }
});

module.exports = ExpenseSchema = mongoose.model("expenses",expenseSchema);