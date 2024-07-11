const VenderServices = require("../services/vendor.service");
const VenderService = new VenderServices();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  sendSuccessResponse,
  sendErrorResponse,
  sendBadResponse,
} = require("../helpers/responce.helpers");

exports.registerVender = async (req, res) => {
  try {
    const email = req.body.email;
    const vender = await VenderService.getVender({ email, isDelete: false });
    if (vender) {
      return sendBadResponse(res, 400, "Vender Is Already Registered..");
    }
    const password = req.body.password;
    let hashPassword = await bcryptjs.hash(password, 10);
    vender = await VenderService.addVender({
      ...req.body,
      password: hashPassword,
    });
    return sendSuccessResponse(
      res,
      201,
      { vender },
      "New Vender Added Successfully...✅"
    );
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, error, "Internal Server Eroor");
  }
};

exports.logginVender = async (req, res) => {
  try {
    const email = req.body.email;
    const vender = await VenderService.getVender({ email, isDelete: false });
    if (!vender) {
      return sendBadResponse(res, 404, "Email Is Not Found...");
    }
    const password = req.body.password;
    let checkPassword = await bcryptjs.compare(password, vender.password);
    if (!checkPassword) {
      return sendBadResponse(res, 401, "Password Is Incorrect...");
    }
    let token = jwt.sign({ venderId: vender._id }, "Vendor");
    return sendSuccessResponse(res, 201, { token }, "Logging Successfully..");
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, error, "Internal Server Eroor");
  }
};

exports.getAllVender = async (req, res) => {
  try {
    // pagenation
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    //sorting
    let sortField = req.query.sortField || "name"; // Default sort field
    let sortOrder = req.query.sortOrder || "asc"; // Default sort order
    const vender = await VenderService.getAllVender(
      { isDelete: false },
      skip,
      limit,
      sortField,
      sortOrder
    );
    if (!vender) {
      return sendBadResponse(res, 404, "Vender is Not Found");
    }
    return sendSuccessResponse(res, 200, { vender }, "All Venders Are....");
  } catch (error) {
    return sendErrorResponse(res, error, "Internal Server Error...");
  }
};

exports.getVenderById = async (req, res) => {
  try {
    const venderId = req.query.venderId;
    let vender = await VenderService.getVenderById(venderId);
    if (!vender) {
      return sendBadResponse(res, 404, "Vender not found...");
    }
    return sendSuccessResponse(res, 200, { vender }, "Your Axpcting Vender...");
  } catch (error) {
    return sendErrorResponse(res, error, "Internal Server Error...");
  }
};

exports.updateVender = async (req, res) => {
  try {
    const venderId = req.query.venderId;
    let vender = await VenderService.getVenderById(venderId);
    if (!vender) {
      return sendBadResponse(res, 404, "Vender not found...");
    }
    vender = await VenderService.updateVender(venderId, req.body);
    return sendSuccessResponse(res, 200, { vender }, "Vender Updated...");
  } catch (error) {
    return sendErrorResponse(res, error, "Internal Server Error...");
  }
};

exports.deleteVender = async (req, res) => {
  try {
    const venderId = req.query.venderId;
    let vender = await VenderService.getVenderById(venderId);
    if (!vender) {
      return sendBadResponse(res, 404, "Vender not found...");
    }
    vender = await VenderService.updateVender(venderId, req.body);
    return sendSuccessResponse(res, 200, { vender }, "Vender Deleted...");
  } catch (error) {
    return sendErrorResponse(res, error, "Internal Server Error...");
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const venderId = req.query.venderId;
    let vender = await VenderService.getVenderById(venderId);
    if (!vender) {
      return sendErrorResponse(res, 404, "Vender is Not Found");
    }
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    if (newPassword === oldPassword) {
      return sendBadResponse(res, 400, "Old Password Is Same As New Password.");
    }
    let confirmPassword = req.body.confirmPassword;
    if (newPassword !== confirmPassword) {
      return sendErrorResponse(
        res,
        400,
        "New Password And Confirm Password Are Not Same."
      );
    }
    let hashPassword = await bcryptjs.hash(newPassword, 10);
    vender = await VenderService.updateVender(vender._id, {
      password: hashPassword,
    });
    return sendSuccessResponse(res, 200, { vender }, "Password Updated...");
  } catch (error) {
    return sendErrorResponse(res, error, "Internal Server Error...");
  }
};

exports.searchVenderByName = async (req, res) => {
  try {
    let { name } = req.query;
    if (!name) {
      return sendBadResponse(res, 400, "name is required field...");
    }
    vender = await VenderService.searchVenderByName(name);
    // console.log(vender);
    return sendSuccessResponse(res, 200, vender, "Vender By Name is...");
  } catch (error) {
    return sendErrorResponse(res, error, "Internal Server Error...");
  }
};