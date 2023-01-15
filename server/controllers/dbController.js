const { FirstName, LastName } = require('../models');
const dbController = [];

const numsGenerator = (ourQuant) => {
  const numsArr = [];
  for (let i = 0; i < ourQuant; i++){
    numsArr.push(Math.floor(Math.random()*1003));
  }
  return numsArr;
};

//create res.locals.data
const makeLocals = (req, res, next) => {
  res.locals.data = [];
  return next();
}

const getFirstNames = (req, res, next) => {
  const { firstName, fullName, fullNameMiddle, quantity } = req.query;
  if (!firstName && !fullName && !fullNameMiddle) return next();

  const randNums = numsGenerator(quantity);

  FirstName.find({ nameNum: { $in: randNums } }, 
    { 'firstName': 1, _id: 0, })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        res.locals.data.push(data[i]);
      }
      return next();
    })
    .catch((err) => {
      const newErr = {
        log: 'Error in getFirstNames',
        message: { err: 'Error: problem getting first names'}
     }
     return next(newErr)
    })
};

const getMiddleNames = (req, res, next) => {
  const {fullNameMiddle, quantity } = req.query;
  if (!fullNameMiddle) return next();
  
  const randNums = numsGenerator(quantity);

  FirstName.find({ nameNum: { $in: randNums } }, 
    { 'firstName': 1, _id: 0, })
    .then((data) => {
      const newArr = [];
      for (let i = 0; i < data.length; i++) {
        const newObj = {
          firstName: res.locals.data[i].firstName,
          middleName: data[i].firstName 
        }
        newArr.push(newObj);
      }
      res.locals.data = newArr;
      return next();
    })
    .catch((err) => {
      const newErr = {
          log: 'error in getMiddleNames',
          message: { err: 'problem getting Middle Names at this time'}
      }
      return next(newErr);
  })
};


const getLastNames = (req, res, next) => {
  const {  firstName, lastName, fullName, fullNameMiddle, quantity } = req.query;
  if (!lastName && !fullName && !fullNameMiddle) return next();

  const randNums = numsGenerator(quantity);

  LastName.find({ nameNum: { $in: randNums } }, 
    { 'lastName': 1, _id: 0, })
    .then((data) => {
      const newArr = [];
      for (let i = 0; i < data.length; i++) {
        if (fullNameMiddle) {
          const newObj = {
            firstName: res.locals.data[i].firstName,
            middleName: res.locals.data[i].middleName,
            lastName: data[i].lastName 
          };
          newArr.push(newObj);
        }
        else if (fullName || (lastName && firstName)) {
          const newObj = {
            firstName: res.locals.data[i].firstName,
            lastName: data[i].lastName 
          };
          newArr.push(newObj);
        }
        else {
          const newObj = {
            lastName: data[i].lastName 
          };
          newArr.push(newObj);
        }
      }
      res.locals.data = newArr;
      return next();
    })
    .catch((err) => {
      const newErr = {
          log: 'error in getLastNames',
          message: { err: 'problem getting lastNames at this time'}
      }
      return next(newErr);
  })
};

const getEmails = (req, res, next) => {
  const {email, firstName, lastName,  fullName, fullNameMiddle, quantity } 
    = req.query;
  if (!email) return next();

  for (let i = 0; i < quantity; i++) {
    let emailString = '';
    const emailLength = Math.floor(Math.random() * 14 + 1);
    
    for (let i = 0; i < emailLength; i++) {
      emailString += String.fromCharCode(Math.floor(Math.random() * 123 + 48));
    }
    emailString = emailString.replace(/[^0-9A-Za-z]/g, '');
    emailString += '@yeticrabs.com';
    res.locals.data.push(emailString);
  }
  return next();
};

dbController.push(makeLocals);
dbController.push(getFirstNames);
dbController.push(getMiddleNames);
dbController.push(getLastNames);
dbController.push(getEmails);

module.exports = dbController;