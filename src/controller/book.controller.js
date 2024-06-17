const BookServices = require("../services/book.service");
const BookService = new BookServices();
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helpers/responce.helpers");

exports.addBook = async (req, res) => {
  try {
    const newBook = await BookService.addBook(req.body);
    sendSuccessResponse(res, 201, { newBook }, "Book added successfully...");
  } catch (error) {
    sendErrorResponse(res, error, "Internal Server Eroor");
  }
};

exports.getAllBook = async (req, res) => {
  try {
    pagenation;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    let sortField = req.query.sortField || "author"; // Default sort field
    let sortOrder = req.query.sortOrder || "asc"; // Default sort order
    const books = await BookService.getAllBook(
      { isDelete: false },
      skip,
      limit,
      sortField,
      sortOrder
    );

    res.status(200).json({ books, message: "All Books..." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { bookId } = req.query;
    let book = await BookService.getBookById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found..." });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { bookId } = req.query;
    let book = await BookService.getBookById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book is not found..." });
    }
    book = await BookService.updateBook(bookId, req.body);
    res.status(200).json({ book, message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.query;
    let book = await BookService.getBookById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book is not found..." });
    }
    book = await BookService.updateBook(bookId, { isDelete: true });
    res.status(200).json({ book, message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error..${console.error()}` });
  }
};

exports.searchBookByName = async (req, res) => {
  try {
    let { author } = req.query;
    if (!author) {
      return res
        .status(400)
        .json({ message: "At least one of name is required." });
    }
    book = await BookService.searchBookByName(author);
    // console.log(vender);
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: ` Internal Server Error: ${error.message()}` });
  }
};
