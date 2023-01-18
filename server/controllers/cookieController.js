const cookieController = {};

// cookie confirming user is logged in
cookieController.setSSIDCookie = (req, res, next) => {
  if (res.locals.message) {
    res.cookie("ssid", res.locals.id, { httpOnly: true });
  }
  return next();
};

module.exports = cookieController;
