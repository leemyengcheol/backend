require("@babel/register")({ extensions: [".ts", ".tsx"] });
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/./../.env" });
