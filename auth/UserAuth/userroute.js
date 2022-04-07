const express = require('express');
const router = express.Router();
const User = require('../../model/user');

//main
router.get("/viewusers",async(req,res)=>{
        const user = await User.find({role : { $ne: "admin"}});
        res.render("./adminpanel/viewusers/viewusers",{users:user}); 
})

//edit
router.get("/viewusers/:id/edit",async(req,res)=>{


        const {id} = req.params;
        const users = await User.findById(id);
        res.render("./adminpanel/viewusers/edit",{user:users});
        
});

//update the form
router.patch("/viewusers/:id",async(req,res)=>{
        const updatedUser = req.body;
        const {id} = req.params;

       await User.findByIdAndUpdate(id, updatedUser);
        res.redirect('/viewusers');
});

//delete the data
router.delete("/viewusers/:id",async(req,res)=>{
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        // console.log(req.params.id);
        res.redirect("/viewusers");
})

module.exports = router;