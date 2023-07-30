import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  place: String,
});

export const Location = mongoose.model("Locations", locationSchema);
