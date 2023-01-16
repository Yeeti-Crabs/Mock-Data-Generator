const { FirstName, LastName } = require('../models');
const dbController = [];

const numsGenerator = (ourQuant) => {
  const numsArr = [];
  for (let i = 0; i < ourQuant; i++){
    numsArr.push(Math.floor(Math.random()*1003));
  }
  return numsArr;
};

const makeArray = (req, res, next) => {
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
      tempArr = [...res.locals.data];
      for (let i = 0; i < data.length; i++) {
        tempArr.push(data[i]);
      }
      res.locals.data = tempArr;
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
      const tempArr = [...res.locals.data];
        for (let i =0; i < data.length; i++) {
          tempArr[i] = {
            ...tempArr[i]._doc,
            middleName: data[i].firstName
          };
        }
        res.locals.data = tempArr;
        console.log(res.locals.data[0]);
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
      const tempArr = [...res.locals.data];
      if (fullNameMiddle) {
        for (let i = 0; i < data.length; i++) {
          tempArr[i] = {
            ...tempArr[i],
            lastName: data[i].lastName
          }
        }
      } else if (firstName || fullName) {
        for (let i = 0; i < data.length; i++) {
          tempArr[i] = {
            ...tempArr[i]._doc,
            lastName: data[i].lastName
          }
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          tempArr.push(data[i]);
        }
      }
      res.locals.data = tempArr;
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
  const { email, firstName, lastName,  fullName, fullNameMiddle, quantity } = req.query;
  if (!email) return next();
  const tempArr = [...res.locals.data];
  for (let i = 0; i < quantity; i++) {
    let emailString = '';
    const emailLength = Math.floor(Math.random() * 31 + 5);
    
    for (let i = 0; i < emailLength; i++) {
      emailString += String.fromCharCode(Math.floor(Math.random() * 123 + 48));
    }

    emailString = emailString.replace(/[^0-9A-Za-z]/g, '');
    emailString += '@yeticrabs.com';

    if ((firstName && !lastName) || (!firstName && lastName)) {
      tempArr[i] = {
        ...tempArr[i]._doc,
        email: emailString
      }
    }else if ((firstName&&lastName) ||fullName || fullNameMiddle) {
      tempArr[i] = {
        ...tempArr[i],
        email:emailString
      }
    } else {
        const newObj = {
          email: emailString
        };
        tempArr.push(newObj);
    }
  }
  res.locals.data = tempArr;
  return next();
};

const getPhoneNumbers = (req, res, next) => {
  const { phoneNumber, email, firstName, lastName, fullName, fullNameMiddle, quantity } = req.query;
  if (!phoneNumber) return next();
  const tempArr = [...res.locals.data];
  
  for (let i = 0; i < quantity; i++) {
    let phoneNumString = '';
    for (let i = 0; i < 10; i++) {
      if (i===0) phoneNumString += '(';
      phoneNumString += Math.floor(Math.random() * 10);
      if (i===2) phoneNumString += ')';
      if (i===5) phoneNumString += '-';
    }
    if ((firstName && !lastName) || (!firstName && lastName)) {
      tempArr[i] = {
        ...tempArr[i]._doc,
        phoneNumber: phoneNumString
      }
    }else if ((firstName&&lastName) || fullName || fullNameMiddle || email) {
      tempArr[i] = {
        ...tempArr[i],
        phoneNumber: phoneNumString
      }
    } else {
        const newObj = {
          phoneNumber: phoneNumString
        };
        tempArr.push(newObj);
    }
  }
  res.locals.data = tempArr;
  return next();
};

dbController.push(makeArray);
dbController.push(getFirstNames);
dbController.push(getMiddleNames);
dbController.push(getLastNames);
dbController.push(getEmails);
dbController.push(getPhoneNumbers);

module.exports = dbController;