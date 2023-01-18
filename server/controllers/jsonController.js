const firstNames = require('../../data/firstNames.json');
const lastNames = require('../../data/lastNames.json');
const middleNames = require('../../data/middleNames.json');
const countries  = require('../../data/countries.json');


function rng (length){
  return Math.floor(Math.random()*length)
}

const jsonController  = {};

jsonController.makeArray = (req, res, next) =>{
  res.locals.data = []
  return next();
}

jsonController.getFirstName = (req, res, next) => {
  const { firstName, fullName, fullNameMiddle, quantity } = req.query;
  if (!firstName && !fullName && !fullNameMiddle) return next();
    const tempArr = [...res.locals.data];
    console.log(firstNames[rng(firstNames.length)])
    for(let i = 0; i < quantity; i++){
      newObj = {
        firstName: firstNames[[rng(firstNames.length)]]
      }
      tempArr.push(newObj);
    }
    res.locals.data = tempArr;
    return next();
    // .then((data) => {
    //   const tempArr = [...res.locals.data];
    //   for (let i = 0; i < data.length; i++) {
    //     newObj = {
    //       firstName: data[i].firstName
    //     };
    //     tempArr.push(newObj);
    //   }
    //   res.locals.data = tempArr;
    //   return next();
    // })
    // .catch((err) => {
    //   const newErr = {
    //     log: 'Error in getFirstNames',
    //     message: { err: 'Error: problem getting first names'}
    //  }
    //  return next(newErr)
    // })
}