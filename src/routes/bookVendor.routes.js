const express = require("express");
const bookVenderRoutes = express.Router();

const { verifyToken } = require("../helpers/verifyToken");

const {
  addBookVender,
  getAllBookVender,
  getBookVender,
  updateBookVender,
  deleteBookVender,
  getVendersByBookId,
  getBooksByVenderId,
} = require("../controller/bookVender.controller");

bookVenderRoutes.post("/add-book-vender", verifyToken, addBookVender);

bookVenderRoutes.get("/get-all-book-vender", verifyToken, getAllBookVender);

bookVenderRoutes.get("/get-book-vender", verifyToken, getBookVender);

bookVenderRoutes.put("/update-book-vender", verifyToken, updateBookVender);

bookVenderRoutes.delete("/delete-book-vender", verifyToken, deleteBookVender);

bookVenderRoutes.get("/get-vender-of-book", verifyToken, getVendersByBookId);

bookVenderRoutes.get("/get-book-of-vender", verifyToken, getBooksByVenderId);

module.exports = bookVenderRoutes;
