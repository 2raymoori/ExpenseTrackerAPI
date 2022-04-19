const express = require("express");
const { allCategory, getCategory, modifyCategory, deleteCategory, addCategory } = require("../Controller/IncomeCategory.controller");
const Router = express.Router();

Router.get("/all",allCategory);
Router.get("/:id",getCategory);
Router.put("/edit/:id",modifyCategory);
Router.delete("/delete/:id",deleteCategory);
Router.post("/add",addCategory);
module.exports = Router;