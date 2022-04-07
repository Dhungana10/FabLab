const express = require("express");
const router = express.Router();
const Equipment = require("../../model/equipment");
const { adminAuth, userAuth } = require("../../middleware/auth.js");

router.get("/admin/equipment", async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await Equipment.find(id);
    res.render("./adminpanel/equipment/show", { equipment });
  } catch (e) {
    console.log(e);
  }
});

// create a new product with the given payload
router.post('/admin/addEquipments', async (req, res) => {
    
    try {
        const newEquipment = {
            ...req.body
        }
        await Equipment.create(newEquipment);
        res.redirect('/admin/equipment');
    }
    catch (e) {
       console.log(e);
    }
});

router.get('/admin/equipment/new', (req, res) => {
    res.render('./adminpanel/equipment/new')
});

router.get('/admin/equipment/:id/edit', async (req, res) => {
    
    try {
        const { id } = req.params;
        const equipment = await Equipment.findById(id);
        res.render('./adminpanel/equipment/edit', {equipment} );
        
    } catch (e) {
        res.redirect('/error');
    }
  
});

// updating the product with the given payload
router.patch('/admin/equipment/:id', async (req, res) => {
    
    try {
        const updatedEquipment = req.body;
        const { id } = req.params;
        
        await Equipment.findByIdAndUpdate(id, updatedEquipment);


        res.redirect(`/admin/equipment`);
    }
    catch (e) {
        res.redirect(e);
    }
});

router.delete('/admin/equipment/:id' , async (req, res) => {

    try {
        const { id } = req.params;
    
        await Equipment.findByIdAndDelete(id);

        res.redirect('/admin/equipment');
    }
    catch (e) {
        res.redirect('/error');
    }    
});

module.exports = router;