const incomeSchema = require("../Model/Income.model");

const addIncome = async (req, res) => {
  try {
    const { amount, incomeCategory, name, description, incomeDate } = req.body;
    const curUser = req.user.id;
    if (amount && incomeCategory && amount > 0) {
      const newIncome = new incomeSchema();
      newIncome.amount = amount;
      newIncome.incomeCategory = incomeCategory;
      if (name) {
        newIncome.name = name;
      }
      if (description) {
        newIncome.description = description;
      }
      if (incomeDate) {
        newIncome.createdAt = incomeDate;
      }
      newIncome.user = curUser;
      await newIncome.save();
      return res.status(200).send({ status: "Success", data: newIncome });
    } else {
      return res.status(201).send({
        status: "Error",
        data: "Sorry Both name and Income Category are required And the income amount must be Valid ( >0)",
      });
    }
  } catch (error) {
    return res.status(500).send({ status: "Error", data: error.message });
  }
};
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const curUserId = req.user.id;
    if (id) {
      const incomeToDelete = await incomeSchema.findOne({
        _id: id,
        user: curUserId,
      });
      if (incomeToDelete) {
        await incomeToDelete.delete();
        res.status(200).send({ status: "Success", data: incomeToDelete });
      } else {
        return res
          .status(201)
          .send({ status: "Error", data: "No such income with this Id " });
      }
    } else {
      return res
        .status(201)
        .send({ status: "Error", data: "Sorry Income Id is required" });
    }
  } catch (error) {
    res.status(500).send({ status: "Error", data: error.message });
  }
};
const modifyIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const curUserId = req.user.id;
    if (id) {
      const { amount, incomeCategory, name, description, incomeDate } =
        req.body;
      const incomeToModify = await incomeSchema.findOne({
        _id: id,
        user: curUserId,
      });
      if (incomeToModify) {
        if (amount && amount > 0) {
          incomeToModify.amount = amount;
        } else {
          return res.status(201).send({
            status: "Error",
            data: "Sorry The income amount must be Valid ( >0 )",
          });
        }
        if (incomeCategory) {
          incomeToModify.incomeCategory = incomeCategory;
        }
        if (name) {
          incomeToModify.name = name;
        }
        if (description) {
          incomeToModify.description = description;
        }
        if (incomeDate) {
          incomeToModify.createdAt = incomeDate;
        }
        await incomeToModify.save();
        res.status(200).send({ status: "Success", data: incomeToModify });
      } else {
        return res
          .status(201)
          .send({ status: "Error", data: "No such income with this Id " });
      }
    } else {
      return res
        .status(201)
        .send({ status: "Error", data: "Sorry Income Id is required" });
    }
  } catch (error) {
    res.status(500).send({ status: "Error", data: error.message });
  }
};
const allIncome = async (req, res) => {
  try {
    const curUserId = req.user.id;
    const allIncome = await incomeSchema
      .find({ user: curUserId })
      .populate("incomeCategory", ["name"])
      .populate("user", ["email", "fName"]);
    res.status(200).send({ status: "Success", data: allIncome });
  } catch (error) {
    res.status(500).send({ status: "Error", data: error.message });
  }
};
const getIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const curUserId = req.user.id;
    if (id) {
      const currentIncome = await incomeSchema
        .find({ _id: id, user: curUserId })
        .populate("incomeCategory", ["name"])
        .populate("user", ["email", "fName"]);
      if (currentIncome) {
        res.status(200).send({ status: "Success", data: currentIncome });
      } else {
        return res
          .status(201)
          .send({ status: "Error", data: "No such income with this Id " });
      }
    } else {
      return res
        .status(201)
        .send({ status: "Error", data: "Sorry Income Id is required" });
    }
  } catch (error) {
    res.status(500).send({ status: "Error", data: error.message });
  }
};

module.exports = {
  addIncome,
  deleteIncome,
  modifyIncome,
  allIncome,
  getIncome,
};
