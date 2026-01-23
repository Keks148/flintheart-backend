module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: "Нет токена" });
  }

  if (auth !== "Bearer test-token-123") {
    return res.status(403).json({ error: "Неверный токен" });
  }

  next();
};
