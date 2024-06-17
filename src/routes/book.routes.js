const express = require("express");
const bookRoutes = express.Router();

const { verifyToken } = require("../helpers/verifyToken");

const {
  addBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
  searchBookByName,
} = require("../controller/book.controller");

bookRoutes.post("/add-book", verifyToken, addBook);

bookRoutes.get("/get-all-book", verifyToken, getAllBook);

bookRoutes.get("/get-book", verifyToken, getBookById);

bookRoutes.put("/update-book", verifyToken, updateBook);

bookRoutes.delete("/delete-book", verifyToken, deleteBook);

bookRoutes.get("/search-book", verifyToken, searchBookByName);

module.exports = bookRoutes;
