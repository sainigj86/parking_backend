const mongoose = require("mongoose");

const subUsersSchema = mongoose.Schema({
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

const subUsers = mongoose.model("subUsers", subUsersSchema);
module.exports = subUsers;