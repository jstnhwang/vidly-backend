module.exports = (req, res, next) => {
  if (!req.user.isAdmin) res.status(403).send("403: Forbidden");
  next();
};
