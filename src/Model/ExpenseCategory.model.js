const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'users'
	},
    name:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = expenseCategoryModel = mongoose.model("expenseCategory",categorySchema)
