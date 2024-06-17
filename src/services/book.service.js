const book = require("../model/book.model");
module.exports = class BookServices {
  async addBook(body) {
    try {
      return book.create(body);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getBookById(id) {
    try {
      return book.findById(id);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getAllBook(filter, skip, limit) {
    try {
      return book.find(filter).skip(skip).limit(limit);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getAllBook(filter, sortField, sortOrder, skip, limit) {
    try {
      const sortOptions = {};
      if (sortField) {
        sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
      }
      return vender.find(filter).skip(skip).limit(limit).sort(sortOptions);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async updateBook(id, body) {
    try {
      return book.findByIdAndUpdate(id, { $set: body }, { new: true });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async searchBookByName(name) {
    try {
      const query = { author: { $regex: name, $options: "i" } }; //Case-insensitive
      return book.find(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
