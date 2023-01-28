const mongoose= require("mongoose");

const incomeSchema = new mongoose.Schema({
	user:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
	amount:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    incomeCategory:{
        type:mongoose.Types.ObjectId,
        ref:"incomeCategory"
    }
});

module.exports = IncomeSchems = mongoose.model("incomes",incomeSchema);
