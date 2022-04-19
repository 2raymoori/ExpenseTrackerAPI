
const incomeSchema = require('../Model/Income.model');

const addIncome = async(req,res)=>{
    try {
        const {amount,incomeCategory} = req.body;
        if(amount && incomeCategory){
            const newIncome = new incomeSchema({
                amount,incomeCategory
            });
            await newIncome.save();
            res.status(200).send({"status":"Success","data":newIncome});
        }else{
            return res.status(201).send({"status":"Error","data":"Sorry Both name and Income Category are required"});
        }
        
    } catch (error) {
        res.status(500).send({"status":"Error","data":error.message})
    }
}
const deleteIncome = async(req,res)=>{
    try {
        const {id} = req.params;
        if(id){
            const incomeToDelete = await incomeSchema.findByIdAndDelete(id);
            if(incomeToDelete){
                await incomeToDelete.delete();
                res.status(200).send({"status":"Success","data":incomeToDelete});
            }else{
                return res.status(201).send({"status":"Error","data":"No such income with this Id "});
            }

        }else{
            return res.status(201).send({"status":"Error","data":"Sorry Income Id is required"});

        }
    } catch (error) {
        res.status(500).send({"status":"Error","data":error.message})
    }
}
const modifyIncome = async(req,res)=>{
    try {
        const {id} = req.params;
        if(id){
            const {amount,incomeCategory} = req.body;
            const incomeToModify = await incomeSchema.findByIdAndUpdate(id);
            if(incomeToModify){
                if(amount){incomeToModify.amount = amount}
                if(incomeCategory){incomeToModify.incomeCategory = incomeCategory}
                await incomeToModify.save();
                res.status(200).send({"status":"Success","data":incomeToModify});
            }else{
                return res.status(201).send({"status":"Error","data":"No such income with this Id "});
            }

        }else{
            return res.status(201).send({"status":"Error","data":"Sorry Income Id is required"});

        }
    } catch (error) {
        res.status(500).send({"status":"Error","data":error.message})
    }
}
const allIncome = async(req,res)=>{
    try {
        const allIncome = await incomeSchema.find();
        res.status(200).send({"status":"Success","data":allIncome})
    } catch (error) {
        res.status(500).send({"status":"Error","data":error.message})
    }
}
const getIncome = async(req,res)=>{
    try {
        const {id} = req.params;
        if(id){
            const currentIncome = await incomeSchema.findById(id);
            if(currentIncome){
                res.status(200).send({"status":"Success","data":currentIncome});
            }else{
                return res.status(201).send({"status":"Error","data":"No such income with this Id "});
            }

        }else{
            return res.status(201).send({"status":"Error","data":"Sorry Income Id is required"});

        }
    } catch (error) {
        res.status(500).send({"status":"Error","data":error.message})
    }
}

module.exports = {
    addIncome,deleteIncome,modifyIncome,allIncome,getIncome
}