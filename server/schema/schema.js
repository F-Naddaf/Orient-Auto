import graphql from "graphql";
import { Car } from "../models/car.js";
import { Location } from "../models/location.js";

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
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
    price: { type: GraphQLInt },
    image: { type: GraphQLString },
    available: {
      type: GraphQLInt,
      async resolve(parent, args) {
        const car = await Car.findById(parent.id);
        return car ? car.available : null;
      },
    },
  }),
});

const CarLocationType = new GraphQLObjectType({
  name: "CarLocation",
  fields: () => ({
    place: { type: GraphQLString },
    cars: {
      type: new GraphQLList(AvailableType),
      resolve(parent, args) {
        return parent.cars.map((car) => ({
          car: Car.findById(car.id),
          available: car.available,
        }));
      },
    },
  }),
});

const AvailableType = new GraphQLObjectType({
  name: "AvailableType",
  fields: () => ({
    car: { type: CarType },
    available: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    car: {
      type: CarType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(Cars, { id: args.id });
        return Car.findById(args.id);
      },
    },
    location: {
      type: CarLocationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(Locations, { id: args.id });
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
      type: new GraphQLList(CarLocationType),
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
        model: { type: new GraphQLNonNull(GraphQLString) },
        mark: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLString) },
        ac: { type: new GraphQLNonNull(GraphQLString) },
        doors: { type: new GraphQLNonNull(GraphQLString) },
        transmission: { type: new GraphQLNonNull(GraphQLString) },
        fuel: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        image: { type: new GraphQLNonNull(GraphQLString) },
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
          price: args.price,
          image: args.image,
        });
        return car.save();
      },
    },
    addLocation: {
      type: CarLocationType,
      args: {
        place: { type: new GraphQLNonNull(GraphQLString) },
        cars: {
          type: new GraphQLList(
            new GraphQLInputObjectType({
              name: "CarLocationInput",
              fields: () => ({
                carId: { type: new GraphQLNonNull(GraphQLID) },
                available: { type: new GraphQLNonNull(GraphQLInt) },
              }),
            })
          ),
        },
      },
      async resolve(parent, args) {
        const location = new Location({ place: args.place });
        try {
          const savedLocation = await location.save();
          for (const carInput of args.cars) {
            const car = await Car.findById(carInput.carId);
            if (!car) {
              throw new Error(`Car with ID ${carInput.carId} not found.`);
            }
            savedLocation.cars.push({
              id: car._id,
              available: carInput.available,
            });
          }
          await savedLocation.save();
          return savedLocation;
        } catch (error) {
          throw new Error("Failed to create location: " + error.message);
        }
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
