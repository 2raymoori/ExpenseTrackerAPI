const express = require('express');
const { addCategory, allCategory, getCategory, updateCategory, deleteCategory } = require('../Controller/ExpenseCategory.controller');
const Router = express.Router();

Router.post("/add",addCategory);
Router.get("/all",allCategory);
Router.get("/category/:id",getCategory);
Router.put("/category/:id",updateCategory);
Router.delete('/category/:id',deleteCategory);

module.exports= Router;