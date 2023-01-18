const cookieController = {};

// set cookie confirming user is logged in
cookieController.setSSIDCookie = (req, res, next) => {
  if (res.locals.message) {
    res.cookie("ssid", res.locals.id, { httpOnly: true });
  }
  return next();
};

// deletes cookie when logged out
cookieController.logoutCookie = (req, res, next) => {
  res.clearCookie("ssid");
  // res.cookie("ssid", null, { httpOnly: true });
  return next();
};

module.exports = cookieController;
