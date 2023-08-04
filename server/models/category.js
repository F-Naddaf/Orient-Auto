import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: String,
  cars: [{ carId: String }],
});

export const Car = mongoose.model("Cars", carSchema);
