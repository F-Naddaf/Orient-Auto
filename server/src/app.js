import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import schema from "../schema/schema.js";

const app = express();
app.use(cors());

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
  console.log(`now listening to the port ${port}`);
});

export default app;
