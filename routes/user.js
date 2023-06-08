const express = require("express");
const Admin = require("../model/admin");

const userRouter = express.Router();

userRouter.post("/signup-user", async (req, res) => {
    try {
      const { name, email, mobile, password, type } = req.body;
  
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User with same email already exists!" });
      }
  
  
      let user = new Admin({
        name,
        email,
        mobile,
        password,
        type,
      });
      user = await user.save();
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

userRouter.post("/signin-user", async (req, res) => {
    try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });
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
    res.json(user);

    } catch (e) {
    res.status(500).json({ error: e.message });
    }
});

module.exports = userRouter;