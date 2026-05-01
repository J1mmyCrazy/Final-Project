const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 500,
        },
    },
    {
        timestamps: true,
    }
);

suggestionSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Suggestion", suggestionSchema);