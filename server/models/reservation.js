import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  age: Number,
  address: String,
  city: String,
  zipCode: String,
  pickUpLocation: String,
  dropOfLocation: String,
  pickUpdate: String,
  dropOfdate: String,
  pickUpTime: String,
  dropOfTime: String,
  carId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Reservation = mongoose.model("Reservations", reservationSchema);
