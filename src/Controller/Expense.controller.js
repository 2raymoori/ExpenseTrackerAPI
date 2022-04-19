const ExpenseModel = require('../Model/Expense.model');

const addExpense = async(req,res)=>{
    try {
        const {name,amount,expenseDate,expenseCategory} = req.body;
        const newExpense = new ExpenseModel();
        newExpense.name = name;
        amount > 0 ? 
        newExpense.amount = amount : 
        res.status(201).send({"status":"error","data":"The Amount for Expense cannot be or less than 0."})
        newExpense.expenseCategory = expenseCategory;
        if(expenseDate){
            newExpense.expenseDate = expenseDate
        }
        await newExpense.save();
        res.status(200).send({"status":"Success","data":newExpense});
    } catch (error) {
        res.status(500).send({"status":"Error","data":error.message})
    }
}
const updateExpense = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,amount,expenseDate,expenseCategory} = req.body;
        const expenseToUpdate = await ExpenseModel.findByIdAndUpdate(id);
        if(expenseToUpdate){
            if(name){
                expenseToUpdate.name = name;
            }
            if(amount){
                amount > 0 ? 
                expenseToUpdate.amount = amount : 
                res.status(201).send({"status":"error","data":"The Amount for Expense cannot be or less than 0."})
        
            }
            if(expenseCategory){
                expenseToUpdate.expenseCategory = expenseToUpdate;
            }
            if(expenseDate){
                expenseToUpdate.expenseDate = expenseDate;
            }
            console.log(expenseToUpdate);
            await expenseToUpdate.save();
            res.status(200).send({"status":"success","data":expenseToUpdate});
        }else{
            res.status(201).send({"status":"error","data":"Sorry There is no such Expense with this id."})
        }
    } catch (error) {
        if(error.kind ==="ObjectId"){
            res.status(201).send({"status":"error","data":"Sorry There is no such Expense with this id."})
        }
        res.status(500).send({"status":"error","data":error.message})
    }
}
const deleteExpense = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,amount,expenseDate,expenseCategory} = req.body;
        const expenseToUpdate = await ExpenseModel.findByIdAndDelete(id);
        if(expenseToUpdate){
            await expenseToUpdate.delete();
            res.status(200).send({"status":"success","data":expenseToUpdate});
        }else{
            res.status(201).send({"status":"error","data":"Sorry There is no such Expense with this id."})
        }
    } catch (error) {
        if(error.kind ==="ObjectId"){
            res.status(201).send({"status":"error","data":"Sorry There is no such Expense with this id."})
        }
        res.status(500).send({"status":"error","data":error.message})
    }
}
const allExpense = async(req,res)=>{
    try {
        const allExpense = await ExpenseModel.find();
        res.status(200).send({"status":"Success","data":allExpense})
    } catch (error) {
        res.status(500).send({"status":"error","data":error.message})
    }
}
const expenseByid = async(req,res)=>{
    try{
        const {id} = req.params;
        const currentExpense = await ExpenseModel.findById(id);
        if(currentExpense){
            res.status(200).send({"status":"Success","data":currentExpense})
        }else{
            res.status(201).send({"status":"error","data":"Sorry There is no such Expense with this id."})
        }
    }catch (error) {
        if(error.kind ==="ObjectId"){
            res.status(201).send({"status":"error","data":"Sorry There is no such Expense with this id."})
        }
        res.status(500).send({"status":"error","data":error.message})
    }
}
module.exports = {
    addExpense,
    updateExpense,
    deleteExpense,
    allExpense,
    expenseByid
}