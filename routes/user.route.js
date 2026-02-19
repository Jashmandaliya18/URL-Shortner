const express = require("express");

const router = express.Router();

const { handleSignupUser } = require("../controller/user.controller.js");

router.post("/", handleSignupUser);


module.exports = router;