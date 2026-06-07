const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  githubLogin,
  authSuccess,
  authFailure,
  getProfile,
  logout
} = require('../controllers/authController');

router.get('/github', githubLogin);
router.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/auth/failure');
    req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      authSuccess(req, res);
    });
  })(req, res, next);
});
router.get('/failure', authFailure);
router.get('/profile', getProfile);
router.get('/logout', logout);

module.exports = router;
