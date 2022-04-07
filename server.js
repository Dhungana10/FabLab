const express = require("express");
const mongodb = require("./server/db");
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "static")));
const { adminAuth, userId } = require("./middleware/auth.js");
const User = require("./model/user");

const PORT = 80;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", require("./auth/UserAuth/route"));

app.set("view engine", "ejs");
app.set('views', __dirname + '/views',);
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use("./assets",express.static(__dirname+ "/styles"));
mongodb();

//ejs routes
app.get("/", (req, res) => res.render("./main/home"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" });
    res.render("login");
  })

app.get("/admin",adminAuth,userId ,async(req, res) => {
      const id = req.userId;
      const user = await User.findById(id);
      res.render("./adminpanel/admin",{users:user});
});


app.get("/services", (req, res) =>{res.render("./main/services");})

app.use(require('./auth/newsandevent/auth'));
app.use(require('./auth/programs/auth'));
app.use(require('./auth/UserAuth/userroute'));
app.use(require('./auth/programs/adminauth'));
app.use(require('./auth/equipments/adminauth'));
app.use(require('./auth/equipments/auth'));

app.use(require("./auth/UserAuth/userpage"));

app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("/")
  })

const server = app.listen(PORT, () => {
    console.log(`Server Connected at Port ${PORT}`);
});

// Handling Error
process.on("unhandledRejection", (err) => {
    console.log(`An error occurred: ${err.message}`);
    server.close(() => process.exit(1));
});