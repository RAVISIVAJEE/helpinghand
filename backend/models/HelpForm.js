const mongoose = require("mongoose");

const HelpFormSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  pay: { type: Number, required: true },
  contact: { type: Number, required: true },
  responses: { type: Array, default: () => [] },
  accepted: { type: Boolean, default: false },
  notifications: { type: Array, default: () => [] },

  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  address: { type: String },
});

module.exports = mongoose.model("UserData", HelpFormSchema);
