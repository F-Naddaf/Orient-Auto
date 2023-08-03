import { gql } from "@apollo/client";

const ALL_LOCATIONS = gql`
  {
    locations {
      place
      cars {
        car {
          id
          model
          mark
          year
          price
          doors
          image
          ac
        }
      }
    }
  }
`;

export { ALL_LOCATIONS };
