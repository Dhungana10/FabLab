const express = require("express");
const router = express.Router();
const newsandevents = require("../../model/newsandevents")

// get all the news adnd events ont the user side
router.get("/news-and-events", async(req, res) =>{
    try {
      const news = await newsandevents.find({});
      res.render("./main/newsandevents",{news});
  }
  catch (e) {
      console.log(e);
  }
  });

// show specfic article on the user side
  router.get('/news-and-events/:id/',async (req,res)=>{
    try {
        const { id } = req.params;

        const news = await newsandevents.findById(id);
    
        res.render('./main/newsshow', { news });
    } catch (e) {
        res.redirect('/error');
    }
  
})

// Get all the events 
  router.get("/admin/news-and-events", async(req, res) =>{
    try {
      const news = await newsandevents.find({});
      res.render("./adminpanel/news-and-events/show",{news});
  }
  catch (e) {
      console.log(e);
  }
  });

// create a new product with the given payload
router.post('/addnews', async (req, res) => {
    
    try {
        const newNews = {
            ...req.body
        }
        await newsandevents.create(newNews);
        res.redirect('/admin/news-and-events');
    }
    catch (e) {
       console.log(e);
    }
});


// Get the new from to create new product
router.get('/admin/news-and-events/new', (req, res) => {
    res.render('./adminpanel/news-and-events/new')
});

router.get('/admin/news-and-events/:id/edit', async (req, res) => {
    
    try {
        const { id } = req.params;

        const news = await newsandevents.findById(id);
    
        res.render('./adminpanel/news-and-events/edit', { news });
    } catch (e) {
        res.redirect(e);
    }
  
});

// updating the product with the given payload
router.patch('/admin/news-and-events/:id', async (req, res) => {
    
    try {
        const updatednews = req.body;
        const { id } = req.params;

        await newsandevents.findByIdAndUpdate(id, updatednews);


        res.redirect(`/admin/news-and-events`);
    }
    catch (e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error');
    }
});

router.delete('/admin/news-and-events/:id' , async (req, res) => {

    try {
        const { id } = req.params;
    
        await newsandevents.findByIdAndDelete(id);

        res.redirect('/admin/news-and-events');
    }
    catch (e) {
        req.flash('error', 'oops,something went wrong');
        res.redirect('/error');
    }    
});

module.exports = router;