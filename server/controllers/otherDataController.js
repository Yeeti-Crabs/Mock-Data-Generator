
const otherDataController = {}

otherDataController.getEmail = (req, res, next ) =>{
  // if email query is generate emails
  console.log(req.query.email)
  if (req.query.email === 'true') {
    try {
      let data = res.locals.data
      // loop through res.locals
      for( let i = 0; i < data.length; i++){
        const rngBig = Math.floor(Math.random()*1000) //for digits in email address
        const rngSmall = Math.floor(Math.random()*3) //for randomizing email company
        const address = ['gmail', 'outlook', 'yahoo']
        const email = `${data[i].firstName}${data[i].lastName}${rngBig}@${address[rngSmall]}.com`
        data[i]['email'] = email;
      }
      res.locals.data = data;
      return next()
    } 
    catch {
      return next({
        log: 'Error in otherDataController.getEmail',
        message: { err: 'Error: problem generating emails'}
     })
    }
  } else { //else move on to next middleware
    console.log("No email requested.")
    return next();
  }
}

otherDataController.getPhoneNum = (req, res, next) => {
  // if phone query is false move on
  if(req.query.phone === 'true'){ 
    const phoneNumGen = () => {
      let phone = ''
      for(let i = 0; i < 10; i++){
        phone = phone + Math.floor(Math.random()*10);
      }
      return phone;
    }
    try {
      let data = res.locals.data;
      for (let i = 0; i < data.length; i++){
        const phoneNum = phoneNumGen();
        data[i]['phoneNum'] = phoneNum;
      }
      res.locals.data = data;
      return next()
    }
    catch{
      return next({
        log: 'Error in otherDataController.getEmail',
        message: { err: 'Error: problem generating emails'}
     })
    }
  } else {
    console.log('No phone number requested');
    return next()
  }
}
module.exports = otherDataController;