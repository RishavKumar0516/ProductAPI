const express = require("express");

const router = express.Router();

//here we are declearing certain routes and what function do we have to perform at certain routes will be defined in controller folders

//if someone visit to the home page then what to show them, is defined here
// we call the getAllProducts function
//whenever someone visit on "localhost:5000/testing" will visit to function "getAllProductsTesting".
//here we are calling these 2 functions we definfe these function in controllers
//requiring the functions

const {getAllProducts, getAllProductsTesting} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);

module.exports = router;
