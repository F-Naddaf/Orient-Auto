import { gql } from "@apollo/client";

const ADD_VAUTOUR = gql`
  mutation AddReservation(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
    $age: Int!
    $address: String!
    $city: String!
    $zipCode: String!
    $pickUpLocation: String!
    $dropOfLocation: String!
    $pickUpdate: String!
    $dropOfdate: String!
    $pickUpTime: String!
    $dropOfTime: String!
    $carId: String!
    $userId: String
    $token: String
  ) {
    AddReservation(
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      email: $email
      age: $age
      address: $address
      city: $city
      zipCode: $zipCode
      pickUpLocation: $pickUpLocation
      dropOfLocation: $dropOfLocation
      pickUpdate: $pickUpdate
      dropOfdate: $dropOfdate
      pickUpTime: $pickUpTime
      dropOfTime: $dropOfTime
      carId: $carId
      userId: $userId
      token: $token
    ) {
      firstName
      lastName
      phone
      email
      age
      address
      city
      zipCode
      pickUpLocation
      dropOfLocation
      pickUpdate
      dropOfdate
      pickUpTime
      dropOfTime
      carId
      userId
    }
  }
`;
export { ADD_VAUTOUR };
