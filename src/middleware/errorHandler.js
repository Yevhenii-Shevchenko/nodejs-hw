export const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  res.status(500).json({
    message: isProd ? "Server error" : err.message
  });
};
