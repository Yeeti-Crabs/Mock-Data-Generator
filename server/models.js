const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;

// user model
const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  starredDataTypes: { type: Array },
});

userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err)
      return next({
        log: `ERROR: Error occured in bcrypt hashing. ${err}`,
      });
    this.password = hash;
    return next();
  });
});

//we want to make a collection of first names and last names
let firstNameNumber = 0;
const firstNameSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  nameNum: { type: Number, default: firstNameNumber++ },
});

let lastNameNumber = 0;
const lastNameSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  nameNum: { type: Number, default: lastNameNumber++ },
});

// had to specify which collection in db to reference because we didnt add
// our data with native mongo functions, we added directly to the db itself
const countrySchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
  },
  {
    collection: "country",
  }
);

const FirstName = mongoose.model("firstName", firstNameSchema);
const LastName = mongoose.model("lastName", lastNameSchema);
const Country = mongoose.model("country", countrySchema);
const User = mongoose.model("user", userSchema);

module.exports = {
  FirstName,
  LastName,
  Country,
  User,
};
