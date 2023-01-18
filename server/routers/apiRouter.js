const express = require('express');
const router = express.Router(); 
const {makeArray, getFirstNames, getMiddleNames, getLastNames, getCountry} = require('../controllers/dbController')
const {getEmails, getPhoneNumbers} = require('../controllers/otherDataController')
// dbController is an array of all of our controller functions, NOT an object with controller methods

const controllers = [makeArray, getFirstNames, getMiddleNames, getLastNames, getCountry, getEmails, getPhoneNumbers]

router.get('/', controllers, (req, res) => {
  return res.status(200).json(res.locals.data)
});

module.exports = router;