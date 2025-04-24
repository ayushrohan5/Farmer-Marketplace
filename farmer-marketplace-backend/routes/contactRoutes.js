const express = require("express");
const { saveContactMessage } = require("../controllers/contactController");



const router = express.Router();

router.post("/", saveContactMessage);

module.exports = router;
