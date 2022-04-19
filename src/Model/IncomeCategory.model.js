const mongoose  = require("mongoose");

const incomeCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports = IncomeCategorySchema = mongoose.model("incomeCategory",incomeCategorySchema);