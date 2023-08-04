import { gql } from "@apollo/client";

const VEHICLE_CATEGORIES = gql`
  {
    carCategories {
      name
      cars {
        id
        model
        mark
      }
    }
  }
`;

export { VEHICLE_CATEGORIES };
