const config = require("./config.json");
const mongoose = require("mongoose");

async function run() {
  mongoose
    .connect(config.dbSetting.uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Db Connected Successfully "))
    .catch((err) => console.log(err));
}

module.exports = {
     run 
    };

function afterDb() {
  console.log("Db Connected Successfully");
}
