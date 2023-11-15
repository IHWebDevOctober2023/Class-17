const express = require('express');
const router = express.Router();
const User = require("../models/User.model");

const fileUploader = require('../config/cloudinary.config');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  res.render("profile", { user: req.session.currentUser });
});

router.get("/user-edit", (req, res, next) => {
  res.render("user-edit", { user: req.session.currentUser });
});

router.post("/user-edit", fileUploader.single('profile-image'), (req, res, next) => {

  const { username, email } = req.body;
  console.log(req.file);

  User.findByIdAndUpdate(req.session.currentUser._id, { username, email, imageUrl: req.file.path }, { new: true })
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;
      res.redirect("/profile");
    })
    .catch((err) => {
      console.log(err);
    });

});

module.exports = router;
