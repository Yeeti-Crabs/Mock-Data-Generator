const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const cookieController = require("../controllers/cookieController");

router.post(
  "/signup",
  userController.createUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

router.post(
  "/login",
  userController.verifyUser,
  cookieController.setSSIDCookie,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

// create a route to handle logout reqs
// setSSID cookie to logged out and send it back to frontend

module.exports = router;
