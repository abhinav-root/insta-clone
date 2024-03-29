const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified.user;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ errorMessage: "Unauthorized" });
  }
  next();
}

module.exports = auth;
