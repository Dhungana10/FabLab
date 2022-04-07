const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    type: {
        type: String,
    },
});
const Program = mongoose.model("program", ProgramSchema);

module.exports = Program;
