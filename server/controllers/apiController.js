const axios = require("axios");
const apiController = {};

apiController.getData = (req, res, next) => {
  // pull parameters from req.body
  const { quantity, dataTypes } = req.body;
  const result = [];
  //dataTypes: [firstname, lastname]
  let url = `https://fakerapi.it/api/v1/persons?_quantity=${quantity}`;

  // make fetch request to url
  axios
    .get(url)
    .then((response) => {
      const dataArr = response.data.data;

      dataArr.forEach((obj) => {
        const newObj = {};
        if (dataTypes.includes("fullname")) {
          newObj.fullname = obj.firstname + " " + obj.lastname;
        }
        for (const key in obj) {
          if (dataTypes.includes(key)) {
            newObj[key] = obj[key];
          }
        }
        result.push(newObj);
      });
      res.locals.result = result;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = apiController;
