exports.success = (res, { data, message, code = 200 }) => {
  return res.status(code).json({
    data,
    message,
  });
};

exports.error = (res, { data, message, code }) => {
  return res.status(code).json({
    data,
    message,
  });
};
