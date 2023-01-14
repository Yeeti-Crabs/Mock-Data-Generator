const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://user:user@our-mockdata-storage.ghivuab.mongodb.net/?retryWrites=true&w=majority';

// connection to mongo db
mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
})
.then(() => console.log('db connection open'))
.catch((err) => console.log('error db connection: ', err))

//we want to make a collection of first names and last names 
let firstNameNumber = 0
const firstNameSchema  = new mongoose.Schema ({
  firstName : {type: String, required: true}, 
  nameNum: {type: Number, default: firstNameNumber++}
});

let lastNameNumber = 0
const lastNameSchema = new mongoose.Schema ({
    lastName: {type: String, required: true},
    nameNum: {type: Number, default: lastNameNumber++}
});

const FirstName = mongoose.model('firstName', firstNameSchema);
const LastName = mongoose.model('lastName', lastNameSchema);

FirstName.insertMany(firstNameData).then(function(){
  console.log("First name data inserted")  // Success
}).catch(function(error){
  console.log(error) // Failure
});

LastName.insertMany(lastNameData).then(function(){
  console.log("Last name data inserted")  // Success
}).catch(function(error){
  console.log(error) // Failure
});


module.exports = {
    FirstName,
    LastName
  };


  
  