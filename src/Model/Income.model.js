const mongoose= require("mongoose");

const incomeSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
    incomeCategory:{
        type:mongoose.Types.ObjectId,
        ref:"incomeCategory"
    }
});

module.exports = IncomeSchems = mongoose.model("incomes",incomeSchema);