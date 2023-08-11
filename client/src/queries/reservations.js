import { gql } from "@apollo/client";

const RESERVATIONS = gql`
  {
    userReservations(userId: "64d631f37e9c26f865a3f813") {
      id
      firstName
      lastName
      pickUpLocation
      dropOfLocation
      pickUpdate
      dropOfdate
      pickUpTime
      dropOfTime
      carId {
        image
        model
        mark
        price
        fuel
      }
    }
  }
`;

export { RESERVATIONS };
