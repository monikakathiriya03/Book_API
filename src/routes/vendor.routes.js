const express = require("express");
const venderRoutes = express.Router();

const { verifyToken } = require("../helpers/verifyToken");

const {
  registerVender,
  logginVender,
  getAllVender,
  getVenderById,
  updateVender,
  deleteVender,
  updatePassword,
  searchVenderByName,
} = require("../controller/vendor.controller");

venderRoutes.post("/add-vender", registerVender);

venderRoutes.post("/logging-vender", logginVender);

venderRoutes.get("/get-all-vender", verifyToken, getAllVender);

venderRoutes.get("/get-vender", verifyToken, getVenderById);

venderRoutes.put("/update-vender", verifyToken, updateVender);

venderRoutes.delete("/delete-vender", verifyToken, deleteVender);

venderRoutes.put("/update-password", verifyToken, updatePassword);

venderRoutes.get("/search-vender", verifyToken, searchVenderByName);

module.exports = venderRoutes;
