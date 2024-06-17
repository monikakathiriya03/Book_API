const BookVenderServices = require("../services/bookVendor.service");
const BookVenderService = new BookVenderServices();

exports.addBookVender = async (req, res) => {
  try {
  	let bookVender = await BookVenderService.getBookVender({
      vender: req.body.venderId,
      book: req.body.book,
      isDelete: false,
    });
    if (bookVender) {
      return res
        .status(400)
        .json({ message: "BookVender is already Exist..." });
    }
    bookVender = await BookVenderService.addBookVender({
      vender: req.venderId,
      ...req.body,
    });
    return res.status(201).json({
      bookVender,
      message: `BookVender Added Successfully...✅`,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: `Internal Server Error... ${console.error()}`,
    });
  }
};
exports.getAllBookVender = async (req, res) => {
  try {
    // for pagenation
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    let sortField = req.query.sortField || "name"; // Default sort field
    let sortOrder = req.query.sortOrder || "asc"; // Default sort order
    const books = await BookService.getAllBookVender(
      { isDelete: false },
      skip,
      limit,
      sortField,
      sortOrder
    );

    res.status(200).json({ bookVender, message: "All BookVendes..." });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: `Internal Server Error... ${console.error()}` });
  }
};

exports.getBookVender = async (req, res) => {
  try {
    let bookVender = await BookVenderService.getBookVenderById({
      _id: req.query.bookVenderId,
      isDelete: false,
    });
    if (!bookVender) {
      return res
        .status(404)
        .json({ message: ` This BookVender Not Found In This ID...` });
    }
    res.status(200).json({ bookVender, message: "BookVender...." });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: `Internal Server Error... ${console.error()}` });
  }
};

exports.updateBookVender = async (req, res) => {
  try {
    let bookVender = await BookVenderService.getBookVenderById({
      _id: req.query.bookVenderId,
      isDelete: false,
    });
    if (!bookVender) {
      return res
        .status(404)
        .json({ message: `This BookVender Not Found In This ID...` });
    }
    bookVender = await BookVenderService.updateBookVender(bookVender._id, {
      ...req.body,
    });
    res
      .status(202)
      .json({ bookVender, message: `Book Vender Updated SuccessFully...✅` });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: `Internal Server Error... ${console.error()}` });
  }
};

exports.deleteBookVender = async (req, res) => {
  try {
    let bookVender = await BookVenderService.getBookVenderById({
      _id: req.query.bookVenderId,
    });
    if (!bookVender) {
      return res
        .status(404)
        .json({ message: `This BookVender Not Found In This ID...` });
    }
    bookVender = await BookVenderService.updateBookVender(
      bookVender._id,
      req.body,
      { isDelete: true }
    );
    res.status(200).json({ message: `BookVender Deleted Successfully...✅` });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: `Internal Server Error... ${console.error()}` });
  }
};

exports.getVendersByBookId = async (req, res) => {
  try {
    const { bookId } = req.query; // Get the book ID from query parameters
    const venders = await BookVenderService.getVendersByBookId({
      book: bookId,
    });
    if (!venders) {
      return res
        .status(404)
        .json({ message: "No vendors found for this book" });
    }
    res
      .status(200)
      .json({ venders, message: "Vendors for the book found successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error... ${console.error()}` });
  }
};

exports.getBooksByVenderId = async (req, res) => {
  try {
    const { venderId } = req.query; // Get the book ID from query parameters
    const books = await BookVenderService.getBooksByVenderId({
      vender: venderId,
    });
    if (!books) {
      return res
        .status(404)
        .json({ message: "No Books found for this vendor" });
    }
    res
      .status(200)
      .json({ books, message: "Books for the vender found successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Internal Server Error... ${console.error()}` });
  }
};
