import graphql from "graphql";
import _ from "lodash";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

const cars = [
  {
    id: "1",
    type: "Toyota",
    model: "Camry",
    year: "2020",
    available: 4,
    location: "Utrecht",
  },
  {
    id: "2",
    type: "VW",
    model: "ID3",
    year: "2023",
    available: 2,
    location: "Amsterdam",
  },
  {
    id: "3",
    type: "BMW",
    model: "i5",
    year: "2018",
    available: 3,
    location: "Zwolle",
  },
];

const carType = new GraphQLObjectType({
  name: "Car",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLString },
    available: { type: GraphQLInt },
    location: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    car: {
      type: carType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(cars, { id: args.id });
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
