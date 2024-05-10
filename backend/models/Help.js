const mongoose = require("mongoose");
const { uuid: v4 } = require("uuid");
const UserCredentialsSchema = mongoose.Schema({
  id: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
module.exports = mongoose.model("UserCredentials", UserCredentialsSchema);
