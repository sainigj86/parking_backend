const express = require("express");
const mongoose = require('mongoose');
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

const PORT = 4000;
const app = express();
const DD = "mongodb+srv://sainigj86:bcpPXl6cb69ZPGXN@test-pro-db.msxaqka.mongodb.net/test?retryWrites=true&w=majority";
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

mongoose.connect(DD).then(()=>{
    console.log("Connection Successfull");
}).catch((e)=>{
    console.log("connection error = " + e);
})
app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`connected at port ${PORT}`);
});