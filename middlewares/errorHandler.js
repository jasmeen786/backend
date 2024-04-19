exports.errorHandler = (err, req, res, next) => {
  console.error("🚀 ~ Error:", err);

  // Extract the error message from the error object
  const errorMessage = err.message || "Internal Server Error";

  return res.status(500).json({ success: false, error: errorMessage });
};
