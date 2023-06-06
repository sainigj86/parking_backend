const express = require("express");
const mongoose = require('mongoose');
const authRouter = require("./routes/auth");


const PORT = 4000;
const app = express();
const DD = "mongodb+srv://sainigj86:6Dxwb8DbZXoiGuQp@textprod.6uomzty.mongodb.net/parking?retryWrites=true&w=majority";
app.use(express.json());
app.use(authRouter);

mongoose.connect(DD).then(()=>{
    console.log("Connection Successfull");
}).catch((e)=>{
    console.log("connection error = " + e);
})
app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`connected at port ${PORT}`);
});