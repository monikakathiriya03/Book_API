const BookVender = require("../model/bookVendor.model");
module.exports = class BookVenderServices {
  async addBookVender(body) {
    try {
      return BookVender.create(body);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // sorting
  async getAllBookVender(filter, skip, limit, sortField, sortOrder) {
    try {
      const sortOptions = {};
      if (sortField) {
        sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
      }
      return vender
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions)
        .populate("vender")
        .populate("book");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getBookVender(body) {
    try {
      return BookVender.findOne(body).populate("vender").populate("book");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getBookVenderById(id) {
    try {
      return BookVender.findById(id).populate("vender").populate("book");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async updateBookVender(id, body) {
    try {
      return BookVender.findOneAndUpdate(id, { $set: body }, { new: true })
        .populate("vender")
        .populate("book");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getVendersByBookId(id) {
    try {
      return BookVender.find(id, { isDelete: false }).populate("vender");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getBooksByVenderId(id) {
    try {
      return BookVender.find(id, { isDelete: false }).populate("book");
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
};
