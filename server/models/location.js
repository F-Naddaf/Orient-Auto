import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  place: String,
  cars: [{ carId: String, available: Number }],
});

export const Location = mongoose.model("Locations", locationSchema);
