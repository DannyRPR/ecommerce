const User = require("../models/User");
const sequelize = require("../utils/connection");
require("../models/User");
require("../models/Category");
require("../models/Product");
require("../models");

const main = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.create({
      firstName: "danni",
      lastName: "portilla",
      email: "asossoft724@gmail.com",
      password: "1234789",
      phone: "1900000000",
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
