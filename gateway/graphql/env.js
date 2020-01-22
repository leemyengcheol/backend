const dotenv = require("dotenv");
console.log("__dirname+", __dirname + "../../.env");
dotenv.config({ path: __dirname + "/./../../.env" });
