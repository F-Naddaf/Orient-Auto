import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        phone
        email
        password
        age
        address
        city
        zipCode
      }
      token
    }
  }
`;
export { LOGIN_USER };
