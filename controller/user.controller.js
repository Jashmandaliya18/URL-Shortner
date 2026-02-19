const User = require("../model/user.model.js");


async function handleSignupUser(req, res) {
    const { userName, email, password } = req.body();
    if (userName || email || password) {
        return res.status(401).json("All field are required");
    }

    await User.create({
        userName,
        email,
        password
    })

    return res.render("home");

}


module.exports = {
    handleSignupUser
}