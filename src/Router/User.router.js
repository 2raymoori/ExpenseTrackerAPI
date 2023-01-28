const express = require('express');
const { modifyUser, deleteUser } = require('../Controller/User.Controller');
const Router = express.Router();

Router.patch("/:id",modifyUser);
Router.delete('/:id',deleteUser);

module.exports = Router;
