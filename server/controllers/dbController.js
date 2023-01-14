const { FirstName, LastName } = require('../models');


const dbController = {};

dbController.getNames = (req, res, next) => {
  // based on params, generate X num of ran nums in arr
  const { quantity } = req.query;

  const numsGenerator = (ourQuant) => {
    const newArr = [];
    for (let i = 0; i < ourQuant; i++){
      const rand = Math.floor(Math.random()*1003)
      newArr.push(rand);
    }
    return newArr
  };
  
  //find first set on numbers
  const randNums1 = numsGenerator(quantity);
  const randNums2 = numsGenerator(quantity);
  
  FirstName.find({ nameNum: { $in: randNums1 } }, 
    { firstName: 1, _id: 0, })
    .then((data) => {

      LastName.find({ nameNum: { $in: randNums2 } }, 
        { lastName: 1, _id: 0, })
        .then((results) => {
            const allNames = [];
            for (let i = 0; i < data.length; i++) {
                const userData = {
                    firstName: data[i].firstName,
                    lastName: results[i].lastName
                }
                allNames.push(userData)
            }
            res.locals.firstLastName = allNames;
            return next()
        })
        .catch((err) => {
            const newErr = {
                log: 'error in lastName.find in controller getNames',
                message: { err: 'problem getting lastNames at this time'}
            }
            return next(newErr);
        })
    })
    .catch((err) => {
      const newErr = {
        log: 'Error in firstname.find in dbController.getname',
        message: { err: 'Error: problem getting first names'}
     }
     return next(newErr)
    })
    

//   LastName.find({ nameNum: { $in: randNums2 } }, 
//     { lastName: 1, _id: 0, })
//     .then((data) => {
//         console.log('lastNames from find: ', data)
//         for (let i = 0; i < allNames.length; i++) {
//             allNames[i]['lastName'] = data[i].lastName;
//         }
//         res.locals.firstLastName = allNames;
//         return next()
//     })
//     .catch((err) => {
//         const newErr = {
//             log: 'error in lastName.find in controller getNames',
//             message: { err: 'problem getting lastNames at this time'}
//         }
//         return next(newErr);
//     })
}

module.exports = dbController;
