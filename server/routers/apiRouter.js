const express = require("express");
const router = express.Router();
const dbController = require("../controllers/dbController");
const apiController = require("../controllers/apiController");

// dbController is an array of all of our controller functions, NOT an object with controller methods

router.get("/", apiController.getData, (req, res) => {
  return res.status(200).json(res.locals.result);
});

module.exports = router;
