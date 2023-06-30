const mongoose = require("mongoose");

const subUsersSchema = mongoose.Schema({
    plateNumber:{
        required: true,
        type: String,
        trim: true,
    },
    currentTime:{
        required: true,
        type: String,
        trim: true,
    },
    status:{
        required: true,
        type: String,
        trim: true,
    },
});

const subUsers = mongoose.model("subUsers", subUsersSchema);
module.exports = subUsers;