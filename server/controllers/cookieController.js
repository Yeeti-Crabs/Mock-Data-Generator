const cookieController = {};
const { User } = require("../models");

// set cookie confirming user is logged in
cookieController.setSSIDCookie = (req, res, next) => {
  if (res.locals.message) {
    res.cookie("ssid", res.locals.id, { httpOnly: true });
  }
  return next();
};

// verify ssid cookie
cookieController.verifySSIDCookie = (req, res, next) => {
  const { ssid } = req.cookies;
  User.findOne({ _id: ssid })
    .then(() => {
      return next();
    })
    .catch((err) => {
      return next({
        log: `cookieController.verifySSIDCookie: ERROR: ${err}`,
        message: {
          err: "Error occured in cookieController.verifySSIDCookie, check server logs for more details",
        },
      });
    });
};

// deletes cookie when logged out
cookieController.logoutCookie = (req, res, next) => {
  res.clearCookie("ssid");
  // res.cookie("ssid", null, { httpOnly: true });
  return next();
};

module.exports = cookieController;
