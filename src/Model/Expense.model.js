const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'users'
	},
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        default:""
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
