const IncomeCategorySchema = require("../Model/IncomeCategory.model");

const addCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { catName } = req.body;
    if (catName) {
      const newIncomeCategory = new IncomeCategorySchema();
      newIncomeCategory.name = catName;
      newIncomeCategory.user = userId;
      await newIncomeCategory.save();
      res.status(200).send({ status: "Success", msg: newIncomeCategory });
    } else {
      res.status(201).send({
        status: "Error",
        msg: "Sorry Income Category name is required",
      });
    }
  } catch (error) {
    res.status(500).send({ status: "Error", data: error.message });
  }
};
const modifyCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { catName } = req.body;
    if (catName && id) {
      const categoryToModify = await IncomeCategorySchema.findOne({
        _id: id,
        user: userId,
      });
      if (categoryToModify) {
        categoryToModify.name = catName;
        await categoryToModify.save();
        return res
          .status(200)
          .send({ status: "Success", data: categoryToModify });
      } else {
        res.status(201).send({
          status: "Error",
          data: "Sorry No Such Category to update / modify.",
        });
      }
    } else {
      res.status(201).send({
        status: "Error",
        data: "Sorry Category Name and a Valid Id has to be provided.",
      });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(201).send({
        status: "Error",
        data: "Sorry Category Name and a Valid Id has to be provided.",
      });
    }
    res.status(500).send({ status: "Error", data: error.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    // Come back to this later ---------------------------------------------------------------
    const categoryToDelete = await IncomeCategorySchema.findOne({
      _id: id,
      user: userId,
    });
    if (categoryToDelete) {
      await categoryToDelete.delete();
      return res
        .status(200)
        .send({ status: "Success", data: categoryToDelete });
    } else {
      res.status(201).send({
        status: "Error",
        data: "Sorry No Such Category to Delete / Remove.",
      });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(201).send({
        status: "Error",
        data: "Sorry Category Name and a Valid Id has to be provided.",
      });
    }
    res.status(500).send({ status: "Error", data: error.message });
  }
};
const allCategory = async (req, res) => {
  try {
    const curUserId = req.user.id;
    const categories = await IncomeCategorySchema.find({
      user: curUserId,
    }).populate("user", ["email", "fName"]);
    res.status(200).send({ status: "Success", data: categories });
  } catch (error) {
    res.status(500).send({ status: "Error", data: error.message });
  }
};
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const curUserId = req.user.id;
    const category = await IncomeCategorySchema.find({
      _id: id,
      user: curUserId,
    }).populate("user", ["email", "fName"]);
    res.status(200).send({ status: "Success", data: category });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(201).send({
        status: "Error",
        data: "Sorry Category Name and a Valid Id has to be provided.",
      });
    }
    res.status(500).send({ status: "Error", data: error.message });
  }
};
module.exports = {
  getCategory,
  allCategory,
  deleteCategory,
  modifyCategory,
  addCategory,
};
