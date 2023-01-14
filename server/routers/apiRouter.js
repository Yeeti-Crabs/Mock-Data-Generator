const express = require('express')
const router = express.Router(); 

router.get('/', (req, res) => {
  return res.send('you made it back!')
})

module.exports = router;