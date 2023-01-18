
const otherDataController  = {}

otherDataController.getEmails = (req, res, next) => {
  try{
    const { email, quantity } = req.query;
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
      
      if (tempArr[i]) {
        tempArr[i].email = emailString;
      } else {
        const newObj = {
          email: emailString
        }
        tempArr.push(newObj);
      }
    }
    res.locals.data = tempArr;
    return next();
  }
  catch {((err) => {
    const newErr = {
        log: 'error in getEmails',
        message: { err: 'problem getting emails at this time'}
    }
    return next(newErr);
  })
  }
};

otherDataController.getPhoneNumbers = (req, res, next) => {
  try {
    const { phoneNumber, quantity } = req.query;
    if (!phoneNumber) return next();
    const tempArr = [...res.locals.data];
    
    for (let i = 0; i < quantity; i++) {
      let phoneNumString = '';
      for (let i = 0; i < 10; i++) {
        if (i===0) phoneNumString += '(';
        phoneNumString += Math.floor(Math.random() * 10);
        if (i===2) phoneNumString += ') ';
        if (i===5) phoneNumString += '-';
      }
      if (tempArr[i]) {
        tempArr[i].phoneNumber = phoneNumString
      } else {
        const newObj = {
          phoneNumber: phoneNumString
        }
        tempArr.push(newObj);
      }
    }
    res.locals.data = tempArr;
    return next();
  }
  catch {((err) => {
    const newErr = {
        log: 'error in getPhoneNumbers',
        message: { err: 'problem getting phone numbers at this time'}
    }
    return next(newErr);
    })
  }
  };

  module.exports = otherDataController;