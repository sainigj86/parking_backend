const express = require("express");
const subUsers = require("../model/sub_users_model");
const mongoose = require("mongoose");
const exitUsers = require("../model/exitUsers_model");

const subUsersRouter = express.Router();

subUsersRouter.post("/sub_Users_Details", async (req, res) => {
  try {
    const { vehicle } = req.body;
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

subUsersRouter.get("/vehicle", async (req, res) => {
  try {
    const { vehicle } = req.body;
    const user = await subUsers.findOne({ vehicle: vehicle });
    if (user) {
      let time = 1;
      // Parse user.currentTime string into a Date object
      let dateParts = user.currentTime.split(", ")[0].split("/");
      let timeParts = user.currentTime.split(", ")[1].split(":");
      let year = parseInt(dateParts[2]);
      let month = parseInt(dateParts[1]) - 1; // Months are zero-based
      let day = parseInt(dateParts[0]);
      let hours = parseInt(timeParts[0]);
      let minutes = parseInt(timeParts[1]);
      let seconds = parseInt(timeParts[2].split(" ")[0]);
      let ampm = timeParts[2].split(" ")[1];
      if (ampm.toLowerCase() === "pm" && hours !== 12) {
        hours += 12;
      } else if (ampm.toLowerCase() === "am" && hours === 12) {
        hours = 0;
      }
      let userTime = new Date(year, month, day, hours, minutes, seconds);

      // Calculate the difference in hours
      let currentTime = new Date();
      let diff = Math.abs(currentTime - userTime) / 1000; // Difference in seconds
      diff /= 60 * 60; // Difference in hours

      console.log(diff);

      if (diff > 0) {
        time = time * 10 * diff;
      } else {
        time = time * 10;
      }

      await subUsers.deleteOne({vehicle:vehicle});

      let exitUser = new exitUsers({
        vehicle : user.vehicle,
        currentTime:new Date().toLocaleString(),
        vehicleId:user._id
      });

      await exitUser.save();

      return res.status(200).json({ Rent: time, "user":user });
    } else {
      return res.status(400).json({ error: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = subUsersRouter;
