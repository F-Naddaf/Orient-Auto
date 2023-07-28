import express from "express";
import { graphqlHTTP } from "express-graphql";
// import connectDB from "./db/connectDB.js";
// import cors from "cors";
import schema from "../schema/schema.js";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT;

app.listen(4000, () => {
  console.log("now listening to the port 4000");
});

// app.use(cors());

export default app;
