const { User } = require("../models");
const bcrypt = require("bcryptjs");

const userController = {};

// creates a new user document in database
userController.createUser = (req, res, next) => {
  res.locals.message = false;
  const { username, password } = req.body;
  if (username && password) {
    User.create({ username, password })
      .then((data) => {
        res.locals.id = data._id;
        res.locals.message = true;
        return next();
      })
      .catch((err) => {
        return next({
          log: `userController.createUser: ERROR: ${err}`,
          message: {
            err: "Error occured in userController.createUser, check server logs for more details",
          },
        });
      });
  } else {
    next({
      log: `userController.createUser: Username or password are invalid.`,
      message: {
        err: "Error occured in userController.createUser, Username and password are required.",
      },
    });
  }
};

// verify username/password values match in database
userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        res.locals.id = user._id;
        res.locals.message = true;
        return next();
      } else {
        res.locals.message = false;
        return next({
          log: `userController.verifyUser: Username or password are invalid.`,
          message: {
            err: "Error occured in userController.verifyUser, Username or password are invalid.",
          },
        });
      }
    } else {
      res.locals.message = false;
      return next({
        log: `userController.verifyUser: Username or password are invalid.`,
        message: {
          err: "Error occured in userController.verifyUser, Username and password are invalid.",
        },
      });
    }
  } catch (err) {
    next({
      log: `userController.verifyUser: ERROR: ${err}`,
      message: {
        err: "Error occured in userController.verifyUser, check server logs for more details",
      },
    });
  }
};

// update user's starred data types
userController.updateDataTypes = async (req, res, next) => {
  try {
    const id = req.cookies.ssid;
    const { dataTypes } = req.body;
    console.log(id, dataTypes);
    const filter = { _id: id };
    const update = { starredDataTypes: dataTypes };
    User.findOneAndUpdate(filter, update, { new: true }).then((data) => {
      // console.log(data);
      res.locals.types = data.starredDataTypes;
      return next();
    });
  } catch (err) {
    return next({
      log: `userController.addStarredDataTypes: ERROR: ${err}`,
      message: {
        err: "Error occured in userController.addStarredDataTypes, check server logs for more details",
      },
    });
  }
};

module.exports = userController;
