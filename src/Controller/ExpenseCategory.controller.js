const ExpenseCategoryModel = require("../Model/ExpenseCategory.model")


const addCategory = async (req,res)=>{
   try {
       const {categoryName} = req.body;
       if(categoryName && categoryName.trim().length>0){
           const newCategory = new ExpenseCategoryModel({
               name:categoryName
           });
           await newCategory.save();

        res.status(200).send({"status":"Success","data":`${newCategory}`})
       }else{
           res.status(404).json({"status":"Error","data":"Sorry Category name is required..."})
           console.log("Sorry category name is required...")
       }
   } catch (error) {
       
   }
}

const allCategory = async(req,res)=>{
    try {
        const allCategories = await ExpenseCategoryModel.find();
        res.status(200).send({"status":"Success","data":allCategories});
    } catch (error) {
        res.status(500).send({"status":"Error","data":error.message})
    }
}
const getCategory = async(req,res)=>{
    try {
        const {id} = req.params
        const currentCategory = await ExpenseCategoryModel.findById(id);
        if(currentCategory){
            res.status(200).send({"status":"Success","data":currentCategory})
        }else{
            res.status(201).send({"status":"Error","data":"Sorry There is no such Category with this id"});
        }
    } catch (error) {
        if(error.kind === "ObjectId"){
            res.status(201).send({"status":"Error","data":"Sorry There is no such Category with this id"});

        }else{
            res.status(500).send({"status":"Error","data":error})
        }
    }
}
const updateCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        const {catName} = req.body;
        const categoryToUpdate = await ExpenseCategoryModel.findByIdAndUpdate(id);
        if(categoryToUpdate){
            categoryToUpdate.name = catName;
            await categoryToUpdate.save();
            res.status(200).send({"status":"Success","data":categoryToUpdate});
        }else{
            res.status(201).send({"status":"Error","data":"Sorry There is no such Category with this id"});
        }

    } catch (error) {
        error.kind === "ObjectId" ? 
        res.status(201).send({"status":"Error","data":"Sorry There is no such Category with this id"}) :
        res.status(500).send({"status":"Error","data":error});
    }
}
const deleteCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        const categoryToDelete = await ExpenseCategoryModel.findByIdAndDelete(id);
        if(categoryToDelete){
            await categoryToDelete.delete();
            res.status(200).send({"status":"Success","data":categoryToDelete});
        }else{
            res.status(201).send({"status":"Error","data":"Sorry There is no such Category with this id"});
        }

    } catch (error) {
        error.kind === "ObjectId" ? 
        res.status(201).send({"status":"Error","data":"Sorry There is no such Category with this id"}) :
        res.status(500).send({"status":"Error","data":error});
    }
}
module.exports = {
    addCategory,
    allCategory,
    getCategory,
    updateCategory,
    deleteCategory
}
