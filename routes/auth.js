const express = require("express");
const User = require("../model/user");

const authRouter = express.Router();

authRouter.post("/signin", async (req, res) => {
  console.log("signin calling")
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    // const isMatch = await bcryptjs.compare(password, user.password);
    if (password != user.password) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = authRouter;