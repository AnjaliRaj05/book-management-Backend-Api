const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Issued"], 
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
