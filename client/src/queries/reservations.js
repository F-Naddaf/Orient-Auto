import { gql } from "@apollo/client";

const RESERVATIONS = gql`
  query GetUserReservations($userId: ID) {
    userReservations(userId: $userId) {
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
