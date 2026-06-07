const express = require('express');
const router = express.Router();
const {
  githubLogin,
  githubCallback,
  authSuccess,
  authFailure,
  getProfile,
  logout
} = require('../controllers/authController');

router.get('/github', githubLogin);
router.get('/github/callback', githubCallback, authSuccess);
router.get('/failure', authFailure);
router.get('/profile', getProfile);
router.get('/logout', logout);

module.exports = router;
