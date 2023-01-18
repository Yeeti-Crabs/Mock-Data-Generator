const { FirstName, LastName, Country } = require('../models/models');
// const dbController = [];

const dbController = {};

dbController.makeArray = (req, res, next) => {
  res.locals.data = [];
  return next();
};
  
dbController.getFirstNames = (req, res, next) => {
  const { firstName, fullName, fullNameMiddle, quantity } = req.query;
  if (!firstName && !fullName && !fullNameMiddle) return next();
  FirstName.aggregate([
    { $sample: { size: +quantity } },
    { $project: { 'firstName': 1, _id: 0 } },
  ])
    .then((data) => {
      const tempArr = [...res.locals.data];
      for (let i = 0; i < data.length; i++) {
        newObj = {
          firstName: data[i].firstName
        };
        tempArr.push(newObj);
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
}


dbController.getMiddleNames = (req, res, next) => {
  const {fullNameMiddle, quantity } = req.query;
  if (!fullNameMiddle) return next();
  FirstName.aggregate([
    { $sample: { size: +quantity } },
    { $project: { 'firstName': 1, _id: 0 } },
  ]).then((data) =>{
    const tempArr = [...res.locals.data];
    for (let i =0; i < data.length; i++) {
      tempArr[i].middleName = data[i].firstName;
    }
    res.locals.data = tempArr;
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

dbController.getLastNames = (req, res, next) => {
  const { lastName, fullName, fullNameMiddle, quantity } = req.query;
  if (!lastName && !fullName && !fullNameMiddle) return next();
  LastName.aggregate([
    { $sample: { size: +quantity } },
    { $project: { 'lastName': 1, _id: 0 } },
  ])
  .then((data)=> {
    const tempArr = [...res.locals.data];
    if (tempArr[0]) {
      for (let i = 0; i < quantity; i ++) {
        tempArr[i].lastName = data[i].lastName;
      }
    }else{
      for (let i = 0; i < quantity; i++) {
        newObj = {
          lastName: data[i].lastName,
        }
        tempArr.push(newObj);
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

dbController.getCountry = (req, res, next) => {
  const { country, quantity } = req.query;
  if (!country) return next();
  Country.aggregate([
    { $sample: { size: +quantity } },
    { $project: { 'country': 1, _id: 0 } },
  ])
  .then((data)=> {
    const tempArr = [...res.locals.data];
    if (tempArr[0]) {
      for (let i = 0; i < data.length; i++) {
        tempArr[i].country = data[i].country;
      }
    }else{
      for (let i = 0; i < data.length; i++) {
        const newObj = {
          country: data[i].country
        }
        tempArr.push(newObj);
      }
    }
    res.locals.data = tempArr;
    return next();
  })
    .catch((err) => {
      const newErr = {
          log: 'error in getMiddleNames',
          message: { err: 'problem getting Middle Names at this time'}
      }
      return next(newErr);
  })
}

module.exports = dbController;