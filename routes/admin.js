const express = require("express");
const Admin = require("../model/admin");

const adminRouter = express.Router();

// adminRouter.post("/signup-admin", async (req, res) => {
//   try {
//     const { name, email, mobile, password } = req.body;

//     const existingUser = await Admin.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ msg: "admin with same email already exists!" });
//     }

//     // const hashedPassword = await bcryptjs.hash(password, 8);

//     let admin = new Admin({
//       name,
//       email,
//       mobile,
//       password,
//     });
//     admin = await admin.save();
//     res.json(admin);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

adminRouter.post("/signin-admin", async (req, res) => {
  try {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  console.log(admin);
  if (!admin) {
      return res
      .status(400)
      .json({ msg: "admin with this email does not exist!" });
  }

  // const isMatch = await bcryptjs.compare(password, user.password);
  if (password != admin.password) {
      return res.status(400).json({ msg: "Incorrect password." });
  }
  res.json(admin);

  } catch (e) {
  res.status(500).json({ error: e.message });
  }
});


module.exports = adminRouter;