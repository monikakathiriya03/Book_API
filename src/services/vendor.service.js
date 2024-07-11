const vender = require("../model/vendor.model");
module.exports = class VenderServices {
  async addVender(body) {
    try {
      return vender.create(body);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getVender(body) {
    try {
      return vender.findOne(body);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async getVenderById(id) {
    try {
      return vender.findById(id);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // async getAllVender(query) {
  //   try {
  //     return vender.find(query);
  //   } catch (error) {
  //     console.log(error);
  //     return error.message;
  //   }
  // };

  // sorting and pagenation
  async getAllVender(filter, skip, limit, sortField, sortOrder) {
    try {
      const sortOptions = {};
      if (sortField) {
        sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
      }
      // return vender.find(filter).skip(skip).limit(limit).sort(sortOptions);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async updateVender(id, body) {
    try {
      return vender.findByIdAndUpdate(id, { $set: body }, { new: true });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // Search Vender by name
  async searchVenderByName(name) {
    try {
      const query = { name: { $regex: name, $options: "i" } }; // Case-insensitive
      return vender.find(query);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
