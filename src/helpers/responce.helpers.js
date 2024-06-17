exports.sendSuccessResponse = (res, statusCode, data = "null", message) => {
  res.status(statusCode).json({ ...data, message });
};

exports.sendErrorResponse = (res, error, defaultMessage) => {
  console.error(error);
  res.status(500).json({ message: defaultMessage });
};

exports.sendBadResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};
