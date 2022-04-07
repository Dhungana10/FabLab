const express = require("express");
const router = express.Router();
const Program = require("../../model/program");

router.get("/education-program", async (req, res) => {
  try {
    const program = await Program.find({type: "Education"});
    res.render("./main/program/education", { program });
  } catch (e) {
    console.log(e);
  }
});

router.get("/training-program", async (req, res) => {
    try {
      const program = await Program.find({type: "Training"});
      res.render("./main/program/training", { program });
    } catch (e) {
      console.log(e);
    }
  });
  
router.get("/research-program", async (req, res) => {
    try {
      const program = await Program.find({type: "Research"});
      res.render("./main/program/research",{program});
    } catch (e) {
      console.log(e);
    }
});
  
// show specfic article on the user side
router.get("/program/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findById(id);
    res.render("./main/program/showarticle", { program });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
