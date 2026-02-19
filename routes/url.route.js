const express = require("express")
const { handleGenerateNewShortUrl, handleAnalytics } = require("../controller/url.controller.js");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;