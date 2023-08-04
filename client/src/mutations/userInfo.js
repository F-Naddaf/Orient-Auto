import { gql } from "@apollo/client";

const ALL_VEHICLES = gql`
  {
    cars {
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

export { ALL_VEHICLES };
