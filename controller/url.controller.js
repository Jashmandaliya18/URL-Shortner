const express = require("express")
const URL = require("../model/url.model.js");
const shortid = require('shortid');


async function handleGenerateNewShortUrl(req, res) {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required !!!' });

    }
    const shortID = shortid.generate();

    await URL.create({
        shortId: shortID,
        redirectUrl: url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render('home', { id: shortID })
    // return res.status(200).json({ id: shortID });

}

async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(result.redirectUrl);
}

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectUrl,
    handleAnalytics,
} 