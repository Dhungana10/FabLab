const express = require("express");
const router = express.Router();
const Program = require("../../model/program");

// Get all the events 
router.get("/admin/program", async(req, res) =>{
    try {
      const program = await Program.find({});
      res.render("./adminpanel/program/show",{program});
  }
  catch (e) {
      console.log(e);
  }
});

// create a new product with the given payload
router.post('/admin/addProducts', async (req, res) => {
    
    try {
        const newProgram = {
            ...req.body
        }
        await Program.create(newProgram);
        res.redirect('/admin/program');
    }
    catch (e) {
       console.log(e);
    }
});

// Get the new from to create new product
router.get('/admin/program/new', (req, res) => {
    res.render('./adminpanel/program/new')
});


router.get('/admin/program/:id/edit', async (req, res) => {
    
    try {
        const { id } = req.params;

        const program = await Program.findById(id);
    
        res.render('./adminpanel/program/edit', { program });
    } catch (e) {
        res.redirect('/error');
    }
  
});
// updating the product with the given payload
router.patch('/admin/addProducts/:id', async (req, res) => {
    
    try {
        const updatednews = req.body;
        const { id } = req.params;

        await Program.findByIdAndUpdate(id, updatednews);


        res.redirect(`/admin/program`);
    }
    catch (e) {
        res.redirect('/error');
    }
});

router.delete('/admin/program/:id' , async (req, res) => {

    try {
        const { id } = req.params;
    
        await Program.findByIdAndDelete(id);

        res.redirect('/admin/program');
    }
    catch (e) {
        res.redirect('/error');
    }    
});
module.exports = router;