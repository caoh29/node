const validateRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      msg: "You don't have permission to do this",
    });
  }
  next();
}

module.exports = {
  validateRole
}