import graphql from "graphql";
import { Car } from "../models/car.js";
import { Location } from "../models/location.js";
import _ from "lodash";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const CarType = new GraphQLObjectType({
  name: "Car",
  fields: () => ({
    id: { type: GraphQLID },
    model: { type: GraphQLString },
    mark: { type: GraphQLString },
    year: { type: GraphQLString },
    ac: { type: GraphQLString },
    doors: { type: GraphQLString },
    transmission: { type: GraphQLString },
    fuel: { type: GraphQLString },
    available: { type: GraphQLInt },
    image: { type: GraphQLString },
    location: { 
      type: LocationType,
      resolve(parent, args) {
        return Car.findById(parent.locationId);
      },
    },
  }),
});

const LocationType = new GraphQLObjectType({
  name: "location",
  fields: () => ({
    id: { type: GraphQLID },
    place: { type: GraphQLString },
    cars: {
      type: new GraphQLList(CarType),
      resolve(parent, args) {
        return Car.find({ locationId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    car: {
      type: CarType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Car.findById(args.id);
      },
    },
    location: {
      type: LocationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Location.findById(args.id);
      },
    },
    cars: {
      type: new GraphQLList(CarType),
      resolve(parent, args) {
        return Car.find({});
      },
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parent, args) {
        return Location.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCar: {
      type: CarType,
      args: {
        model: { type: GraphQLString },
        mark: { type: GraphQLString },
        year: { type: GraphQLString },
        ac: { type: GraphQLString },
        doors: { type: GraphQLString },
        transmission: { type: GraphQLString },
        fuel: { type: GraphQLString },
        available: { type: GraphQLInt },
        image: { type: GraphQLString },
        locationId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let car = new Car({
          model: args.model,
          mark: args.mark,
          year: args.year,
          ac: args.ac,
          doors: args.doors,
          transmission: args.transmission,
          fuel: args.fuel,
          available: args.available,
          image: args.image,
          locationId: args.locationId,
        });
        return car.save();
      },
    },
    addLocation: {
      type: LocationType,
      args: {
        place: { type: GraphQLString },
      },
      resolve(parent, args) {
        let location = new Location({
          place: args.place,
        });
        return location.save();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
