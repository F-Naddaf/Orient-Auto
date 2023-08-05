import { gql } from "@apollo/client";

const USER_INFO = gql`
  {
    user {
      id
      firstName
      lastName
      phone
      age
      email
      password
      address
      city
      zipCode
    }
  }
`;
export { USER_INFO };
