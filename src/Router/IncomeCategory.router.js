const express = require("express");
const {
  allCategory,
  getCategory,
  modifyCategory,
  deleteCategory,
  addCategory,
} = require("../Controller/IncomeCategory.controller");
const authenticate = require("../MiddleWare/Authenticate.auth");
const Router = express.Router();
Router.get("/all", authenticate, allCategory);
Router.get("/:id", authenticate, getCategory);
Router.put("/edit/:id", authenticate, modifyCategory);
Router.delete("/delete/:id", authenticate, deleteCategory);
Router.post("/add", authenticate, addCategory);
module.exports = Router;
