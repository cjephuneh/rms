exports.successResponse = (res, message, data) => {
    res.json({ success: true, message, data });
  };
  
  exports.errorResponse = (res, message, code = 400) => {
    res.status(code).json({ success: false, message });
  };
  