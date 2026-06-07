const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_ID !== 'your_github_client_id') {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL || 'http://localhost:8080/auth/github/callback'
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
} else {
  console.warn('WARNING: GitHub OAuth credentials not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env');
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const githubLogin = (req, res, next) => {
  if (!process.env.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID === 'your_github_client_id') {
    return res.status(503).json({ error: 'GitHub OAuth is not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.' });
  }
  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
};

const githubCallback = (req, res, next) => {
  passport.authenticate('github', { failureRedirect: '/auth/failure' })(req, res, next);
};

const authSuccess = (req, res) => {
  res.status(200).json({
    message: 'Login successful',
    user: {
      id: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName,
      profileUrl: req.user.profileUrl
    }
  });
};

const authFailure = (req, res) => {
  res.status(401).json({ error: 'GitHub authentication failed.' });
};

const getProfile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not logged in. Visit /auth/github to authenticate.' });
  }
  res.status(200).json({
    id: req.user.id,
    username: req.user.username,
    displayName: req.user.displayName,
    profileUrl: req.user.profileUrl
  });
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.status(200).json({ message: 'Logged out successfully.' });
    });
  });
};

module.exports = { githubLogin, githubCallback, authSuccess, authFailure, getProfile, logout };
