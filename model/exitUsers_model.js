const mongoose = require("mongoose");

const exitUsersSchema = mongoose.Schema({
    vehicle:{
        required: true,
        type: String,
        trim: true,
    },
    currentTime:{
        required: true,
        type: String,
        trim: true,
    },
});

const exitUsers = mongoose.model("exitUsers", exitUsersSchema);
module.exports = exitUsers;