const {Session} = require('../models/authModels');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  if (req.cookies.ssid) {
    const { ssid } = req.cookies;
    Session.findOne
      .then((session) => {
        if (session) {
          res.locals.user = session;
          return next();
        }
        return next();
      })
      .catch((err) => {
        const newErr = {
          log: 'Error in isLoggedIn',
          message: { err: 'Error: problem finding session' }
        }
        return next(newErr);
      })
  } else {
    res.redirect('/login')
  }
}

sessionController.startSession = (req, res, next) => {
  const { username, password } = req
  Session.create({ username, password })
    .then((session) => {
      res.locals.user = session;
      return next();
    })
    .catch((err) => {
      const newErr = {
        log: 'Error in startSession',
        message: { err: 'Error: problem creating session' }
      }
      return next(newErr);
    })
    
}


