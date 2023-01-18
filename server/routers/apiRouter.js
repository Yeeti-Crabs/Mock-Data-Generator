const express = require('express');
const router = express.Router(); 

// const {makeArray, getFirstNames, getMiddleNames, getLastNames, getCountry} = require('../controllers/dbController')
const {getEmails, getPhoneNumbers} = require('../controllers/otherDataController')
const {isLoggedIn, startSession} = require('../controllers/sessionController')
const {setCookie, setSSIDCookie} = require('../controllers/cookieController')

const {makeArray, getFirstName, getMiddleName, getlastName, getCountry} = require('../controllers/jsonController')
// dbController is an array of all of our controller functions, NOT an object with controller methods
const Profile = require('../models/authModels');
const { Country } = require('../models/models');
// const controllers = [makeArray, getFirstNames, getMiddleNames, getLastNames, getCountry, getEmails, getPhoneNumbers]
const controllers  = [makeArray, getFirstName, getMiddleName, getlastName, getEmails, getPhoneNumbers, getCountry]

router.get('/',  controllers ,(req, res) => {
  return res.status(200).json(res.locals.data)
});

//post request for checking db 

// router.post('/', (req, res) => {
//   const post = new Profile({
//     username: req.body.username,
//     password: req.body.password
//   })
//   post.save((err, post) =>{
//     if (err) {
//       console.log(err)
//       return next(err)}
//     res.locals.profile = post;
//   })
//   return res.status(200).json(res.locals.profile)
// })

module.exports = router;