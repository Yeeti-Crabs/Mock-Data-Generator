const express = require('express')
const router = express.Router(); 
const dbController  = require('../controllers/dbController')

/* User will input amount of names desired 
req.params =
 {
  quanity: 1-1002
 }
Should return 
*/

router.get('/', dbController.getNames, (req, res) => {
  return res.status(200).json(res.locals.firstLastName)
  // return res.status(200).send('success, made it here')
});

module.exports = router;