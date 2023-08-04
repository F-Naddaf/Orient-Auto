import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String!
    $age: Int!
    $address: String!
    $city: String!
    $zipCode: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      email: $email
      age: $age
      address: $address
      city: $city
      zipCode: $zipCode
    ) {
      id
      firstName
      lastName
      phone
      email
      age
      address
      city
      zipCode
    }
  }
`;
export { ADD_USER };
