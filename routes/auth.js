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

router.get('/github', (req, res, next) => {
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Login with GitHub'
     #swagger.description = 'Redirects to GitHub OAuth login page. After authorizing, GitHub will redirect back to /auth/github/callback and you will be logged in.'
     #swagger.responses[302] = { description: 'Redirect to GitHub login' }
  */
  githubLogin(req, res, next);
});

router.get('/github/callback', (req, res, next) => {
  /* #swagger.ignore = true */
  passport.authenticate('github', (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect('/auth/failure');
    req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      authSuccess(req, res);
    });
  })(req, res, next);
});

router.get('/failure', (req, res) => {
  /* #swagger.ignore = true */
  authFailure(req, res);
});

router.get('/profile', (req, res) => {
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Get current logged-in user'
     #swagger.description = 'Returns the GitHub profile of the currently logged-in user. Returns 401 if not logged in.'
     #swagger.responses[200] = { description: 'User profile' }
     #swagger.responses[401] = { description: 'Not logged in' }
  */
  getProfile(req, res);
});

router.get('/logout', (req, res, next) => {
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Logout'
     #swagger.description = 'Destroys the current session and logs the user out.'
     #swagger.responses[200] = { description: 'Logged out successfully' }
  */
  logout(req, res, next);
});

module.exports = router;
