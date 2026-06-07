const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'You must be logged in. Visit /auth/github to authenticate.' });
};

module.exports = { isAuthenticated };
