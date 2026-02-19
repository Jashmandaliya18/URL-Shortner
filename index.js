const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { connectToMongoDB } = require('./connect.js');
const router = require('./routes/url.route.js');
const { handleRedirectUrl } = require('./controller/url.controller.js');
const staticRouter = require("./routes/staticRouter.route.js");

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error:", err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))

app.use("/", staticRouter);
app.use("/url", router);
app.get("/:shortId", handleRedirectUrl);


app.listen(PORT, () => {
    console.log("Server is running on Port:", PORT);
})

