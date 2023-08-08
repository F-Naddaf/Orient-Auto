import { gql } from "@apollo/client";

const ADD_VAUTOUR = gql`
  mutation addUser(
    $pickUpLocation: String!
    $dropOfLocation: String!
    $pickUpdate: String!
    $dropOfdate: String!
    $pickUpTime: String!
    $dropOfTime: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
    $password: String!
    $age: Int!
    $address: String!
    $city: String!
    $zipCode: String!
    $carId: String!
  ) {
    addUser(
      pickUpLocation: $pickUpLocation
      dropOfLocation: $dropOfLocation
      pickUpdate: $pickUpdate
      dropOfdate: $dropOfdate
      pickUpTime: $pickUpTime
      dropOfTime: $dropOfTime
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      email: $email
      password: $password
      age: $age
      address: $address
      city: $city
      zipCode: $zipCode
      carId: $carId
    ) {
      id
      pickUpLocation
      dropOfLocation
      pickUpdate
      dropOfdate
      pickUpTime
      dropOfTime
      firstName
      lastName
      phone
      email
      password
      age
      address
      city
      zipCode
      carId
    }
  }
`;
export { ADD_VAUTOUR };
