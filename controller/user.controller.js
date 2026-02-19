const User = require("../model/user.model.js");
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser } = require("../services/auth.service.js");


async function handleSignupUser(req, res) {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        return res.status(401).json("All field are required");
    }

    await User.create({
        userName,
        email,
        password
    })

    return res.redirect("/");

}

async function handleLoginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json("All field are required");
    }

    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render("login", { error: "Invalid email or password" });
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);

    return res.redirect("/");
}


module.exports = {
    handleSignupUser,
    handleLoginUser
}