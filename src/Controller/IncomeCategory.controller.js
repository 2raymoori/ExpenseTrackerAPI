const IncomeCategorySchema = require('../Model/IncomeCategory.model');

const addCategory = async(req,res)=>{
    try {
        const {catName} = req.body;
        if(catName){
            const newIncomeCategory =new IncomeCategorySchema();
            newIncomeCategory.name = catName;
            await newIncomeCategory.save();
            res.status(200).send({"status":"Success","data":newIncomeCategory})
        }else{
            res.status(201).send({"status":"Error","data":"Sorry Income Category name is required"})
        }
    } catch (error) {
        res.status(500).send({"status":"Error","data":error.message})  
    }
}
const modifyCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        const {catName} = req.body;
        if(catName && id){
            const categoryToModify = await IncomeCategorySchema.findByIdAndUpdate(id);
            categoryToModify.name = catName;
            await categoryToModify.save();
            return res.status(200).send({"status":"Success","data":categoryToModify});
        }
        else{
            res.status(201).send({"status":"Error","data":"Sorry Category Name and a Valid Id has to be provided."});

        }
        
    } catch (error) {
        if(error.kind === "ObjectId"){
           return res.status(201).send({"status":"Error","data":"Sorry Category Name and a Valid Id has to be provided."});
        }
        res.status(500).send({"status":"Error","data":error.message});
    }
}
const deleteCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        const categoryToDelete = await IncomeCategorySchema.findByIdAndDelete(id);
        res.status(200).send({"status":"Success","data":categoryToDelete})
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(201).send({"status":"Error","data":"Sorry Category Name and a Valid Id has to be provided."});
        }
        res.status(500).send({"status":"Error","data":error.message});
    }
}
const allCategory = async(req,res)=>{
    try {
        const categories = await IncomeCategorySchema.find();
        res.status(200).send({"status":"Success","data":categories});
    } catch (error) {
        res.status(500).send({"status":"Error","data":error.message});
    }

}
const getCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        const category = await IncomeCategorySchema.findById(id);
        res.status(200).send({"status":"Success","data":category})
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(201).send({"status":"Error","data":"Sorry Category Name and a Valid Id has to be provided."});
        }
        res.status(500).send({"status":"Error","data":error.message});
    }

}
module.exports = {
    getCategory,
    allCategory,
    deleteCategory,
    modifyCategory,
    addCategory
}