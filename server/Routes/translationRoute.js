const express = require("express");
const {handleTranslation} = require("../Controllers/translationController")


const router = express.Router();


router.post("/", handleTranslation);

module.exports = router