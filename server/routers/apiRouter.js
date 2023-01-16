const express = require('express');
const router = express.Router(); 
const dbController = require('../controllers/dbController')

router.get('/', dbController, (req, res) => {
  return res.status(200).json(res.locals.data)
  // return res.status(200).send('success, made it here')
});

module.exports = router;