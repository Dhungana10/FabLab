const express = require("express");
const Equipment = require("../../model/equipment");
const router = express.Router();
const {
  studentAuth,
  communityAuth,
  companyAuth,
  startupAuth,
  userId,
} = require("../../middleware/auth.js");

router.get("/student",studentAuth,userId, async (req, res) => {
  try {
      console.log(userId);
    const student = await Equipment.find({student:true});
    res.render("./student",{student});
  } catch (e) {
    console.log(e);
  }

});

router.get("/community", communityAuth, async (req, res) => {
  try {
    res.render("./community");
  } catch (e) {
    console.log(e);
  }
});

router.get("/company",companyAuth, async (req, res) => {
  try {
    res.render("./company");
  } catch (e) {
    console.log(e);
  }
});

router.get("/startup", startupAuth, async (req, res) => {
  try {
    res.render("./startup");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
