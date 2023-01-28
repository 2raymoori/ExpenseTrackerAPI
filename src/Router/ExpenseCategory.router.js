const express = require('express');
const { addCategory, allCategory, getCategory, updateCategory, deleteCategory } = require('../Controller/ExpenseCategory.controller');
const authenticate = require('../MiddleWare/Authenticate.auth');
const Router = express.Router();

Router.post("/add",authenticate,addCategory);
Router.get("/all",authenticate,allCategory);
Router.get("/category/:id",authenticate,getCategory);
Router.put("/category/:id",authenticate,updateCategory);
Router.delete('/category/:id',authenticate,deleteCategory);

module.exports= Router;