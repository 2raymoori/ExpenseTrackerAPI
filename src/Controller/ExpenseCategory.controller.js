
const { ObjectId } = require("mongodb").ObjectID;
const ExpenseCategoryModel = require("../Model/ExpenseCategory.model")


const addCategory = async (req,res)=>{
   try {
       const {categoryName} = req.body;
       const curUser = req.user.id;
       console.log(req.user);
       if(categoryName && categoryName.trim().length>0){
           const newCategory = new ExpenseCategoryModel();
           newCategory.name = categoryName;
           newCategory.user = curUser;
         // await newCategory.save();
        res.status(200).send({"status":"Success","msg":newCategory});
       }else{
           res.status(201).json({"status":"Error","msg":"Sorry Category name is required..."})
           console.log("Sorry category name is required...")
       }
   } catch (error) {
       console.log(error);
       res.status(500).send({"status":"Error","msg":error});
   }
}

const allCategory = async(req,res)=>{
    try {
        console.log(req.user);
        const allCategories = await ExpenseCategoryModel.find({user:req.user.id});
        res.status(200).send({"status":"Success","data":allCategories});
    } catch (error) {
        res.status(500).send({"status":"Error","data":error.message})
    }
} //63d44fbe2d52ab07f7de63a6  63d453f7098649871310daeb
const getCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        const curUser = req.user.id;
        const currentCategory = await ExpenseCategoryModel.findById({"_id":id,user:curUser});
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
        const curUser = req.user.id;
        const categoryToUpdate = await ExpenseCategoryModel.findByIdAndUpdate({"_id":id,user:curUser});
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
        const curUser = req.user.id;
        const categoryToDelete = await ExpenseCategoryModel.findByIdAndDelete({"_id":id,user:curUser});
        if(categoryToDelete){
            await categoryToDelete.delete();
            return res.status(200).send({"status":"Success","data":categoryToDelete});
        }else{
            return res.status(201).send({"status":"Error","data":"Sorry There is no such Category with this id"});
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
