import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
// import connectDB from "./db/connectDB.js";
import mongoose from "mongoose";
// import cors from "cors";
import schema from "../schema/schema.js";

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("now listening to the port 4000");
});

// app.use(cors());

export default app;
