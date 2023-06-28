const express = require("express");
const subUsers = require("../model/sub_users_model");

const subUsersRouter = express.Router();

subUsersRouter.post("/sub_Users_Details", async (req, res) => {
  try {
    const { vehicle,} = req.body;
    const currentTime = new Date().toLocaleString();

    let subUser = new subUsers({
      vehicle,
      currentTime,
    });
    subUser = await subUser.save();
    res.json(subUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = subUsersRouter;
