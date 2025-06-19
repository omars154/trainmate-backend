function trainerAuth(req, res, next) {
  const role = req.headers["x-role"];
  if (role === "trainer") {
    next();
  } else {
    res.status(403).json({ message: "Trainer access only" });
  }
}

module.exports = trainerAuth;
