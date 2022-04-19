const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true

    }
})

module.exports = expenseCategoryModel = mongoose.model("expenseCategory",categorySchema)