const express = require('express');
const router = express.Router(); 
const dbController  = require('../controllers/dbController');
const {getEmail, getPhoneNum} = require('../controllers/otherDataController')

/* User will input amount of names desired 
req.params =
 {
  quanity: 1-1002;
  email: true/false
  phone_num: true/false
 }
Should return 
*/

const controllerArray = [dbController.getNames, getEmail, getPhoneNum];

router.get('/', controllerArray, (req, res) => {
  return res.status(200).json(res.locals.data)
  // return res.status(200).send('success, made it here')
});

module.exports = router;