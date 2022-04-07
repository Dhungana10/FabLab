const express = require("express");
const router = express.Router();
const Equipment = require("../../model/equipment");


router.get("/machines/carpentry", async (req, res) => {
  try {
    const equipment = await Equipment.find({});
    res.render("./main/machines/carpentry", { equipment });
  } catch (e) {
    console.log(e);
  }
});

router.get("/machines/electronic", (req, res) => {
  const equipment = Equipment.find({});
  res.render("./main/machines/electronic"), { equipment };
});

router.get("/machines/heavy-machinary", (req, res) => {
  const equipment = Equipment.find({});
  res.render("./main/machines/heavy-machinary"), { equipment };
});

router.get("/machines/metal-works", (req, res) => {
  const equipment = Equipment.find({});
  res.render("./main/machines/metal-works"), { equipment };
});

module.exports = router;
