import { gql } from "@apollo/client";

const VEHICLE_BY_ID = gql`
  query GetCarById($id: ID!) {
    car(id: $id) {
      id
      model
      mark
      price
      image
      year
      ac
      doors
      fuel
    }
  }
`;

export { VEHICLE_BY_ID };
