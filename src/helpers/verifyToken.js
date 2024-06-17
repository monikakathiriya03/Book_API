const jwt = require("jsonwebtoken");
const Vender = require("../model/vendor.model");

// vender Token
exports.verifyToken = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (authorization === undefined) {
      return res.json({ message: `Invalid Authorization ${console.error()}` });
    }
    let token = authorization.split(" ")[1];
    if (token === undefined) {
      return res
        .status(401)
        .json({ message: `Unauthorize ${console.error()}` });
    } else {
      let { venderId } = jwt.verify(token, "Vendor");
      let vender = await Vender.findById(venderId);
      if (vender) {
        req.vender = vender;
        next();
      } else {
        return res
          .status(401)
          .json({ message: `Invalid Vendor(token) ${console.error()}` });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: `Internal Server Error From Vendor Token ${console.error()}`,
    });
  }
};
