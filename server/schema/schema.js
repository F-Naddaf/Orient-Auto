import graphql from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { Car } from "../models/car.js";
import { Location } from "../models/location.js";
import { Reservation } from "../models/reservation.js";

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

async function authenticateToken(token) {
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

const CarCategoryType = new GraphQLObjectType({
  name: "CarCategory",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    cars: {
      type: new GraphQLList(CarType),
      resolve(parent, args) {
        return Car.find({ model: parent.name });
      },
    },
  }),
});

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
    category: {
      type: CarCategoryType,
      resolve(parent, args) {
        return { id: parent.model.toLowerCase(), name: parent.model };
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

const ReservationType = new GraphQLObjectType({
  name: "Reservation",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    zipCode: { type: GraphQLString },
    pickUpLocation: { type: GraphQLString },
    dropOfLocation: { type: GraphQLString },
    pickUpdate: { type: GraphQLString },
    dropOfdate: { type: GraphQLString },
    pickUpTime: { type: GraphQLString },
    dropOfTime: { type: GraphQLString },
    carId: { type: GraphQLID },
    userId: { type: GraphQLID },
    token: { type: GraphQLString },
  }),
});

const UserOrderType = new GraphQLObjectType({
  name: "UserOrder",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    zipCode: { type: GraphQLString },
    pickUpLocation: { type: GraphQLString },
    dropOfLocation: { type: GraphQLString },
    pickUpdate: { type: GraphQLString },
    dropOfdate: { type: GraphQLString },
    pickUpTime: { type: GraphQLString },
    dropOfTime: { type: GraphQLString },
    carId: {
      type: CarType,
      resolve(parent, args) {
        return Car.findById(parent.carId);
      },
    },
    userId: { type: GraphQLID },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phone: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    zipCode: { type: GraphQLString },
    reservations: {
      type: new GraphQLList(ReservationType),
      resolve(parent, args) {
        return Reservation.find({ userId: parent.id });
      },
    },
  }),
});

const loginType = new GraphQLObjectType({
  name: "login",
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString },
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
      type: CarLocationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Location.findById(args.id);
      },
    },
    carCategories: {
      type: new GraphQLList(CarCategoryType),
      resolve(parent, args) {
        return Car.aggregate([
          {
            $group: {
              _id: "$model",
              name: { $first: "$model" },
            },
          },
        ]);
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
    user: {
      type: UserType,
      resolve(parent, args, context) {
        const authorization = context.headers["authorization"];
        if (authorization) {
          const token = authorization.replace("Bearer ", "");
          const user = authenticateToken(token);
          return user;
        }
        throw new Error("Token not provided");
      },
    },
    userReservations: {
      type: new GraphQLList(UserOrderType),
      args: {
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Reservation.find({ userId: args.userId });
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
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        zipCode: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        if (args.age < 18) {
          throw new Error("User must be at least 18 years old.");
        }
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) {
          throw new Error(
            "Email already exists. Please choose a different email"
          );
        }
        const hashedPassword = await bcrypt.hash(args.password, 10);

        let user = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          phone: args.phone,
          age: args.age,
          email: args.email,
          password: hashedPassword,
          address: args.address,
          city: args.city,
          zipCode: args.zipCode,
        });
        return await user.save();
      },
    },
    loginUser: {
      type: loginType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid email or password.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("Invalid email or password!");
        }

        const token = jwt.sign({ userId: user.id }, process.env.TOKEN, {
          expiresIn: "1h",
        });

        return { user, token };
      },
    },
    AddReservation: {
      type: ReservationType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        zipCode: { type: GraphQLString },
        pickUpLocation: { type: GraphQLString },
        dropOfLocation: { type: GraphQLString },
        pickUpdate: { type: GraphQLString },
        dropOfdate: { type: GraphQLString },
        pickUpTime: { type: GraphQLString },
        dropOfTime: { type: GraphQLString },
        carId: { type: GraphQLString },
        userId: { type: GraphQLString },
        token: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        let user = null;
        if (args.token) {
          user = await authenticateToken(args.token);
        }

        let reservation = new Reservation({
          firstName: args.firstName,
          lastName: args.lastName,
          phone: args.phone,
          email: args.email,
          age: args.age,
          address: args.address,
          city: args.city,
          zipCode: args.zipCode,
          pickUpLocation: args.pickUpLocation,
          dropOfLocation: args.dropOfLocation,
          pickUpdate: args.pickUpdate,
          dropOfdate: args.dropOfdate,
          pickUpTime: args.pickUpTime,
          dropOfTime: args.dropOfTime,
          carId: args.carId,
        });

        if (user) {
          reservation.userId = user.id;
          user.reservations.push(reservation._id);
          await user.save();
        } else {
          reservation.userId = null;
          reservation.token = "guest";
        }
        await reservation.save();
        return reservation;
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
