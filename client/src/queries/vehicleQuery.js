import { gql } from "@apollo/client";

const GET_VEHICLE = gql`
{
    carCategories {
      name
      cars {
        id
        model
        mark
        year
        price
        doors
        image
        ac
        transmission
        fuel
      }
    }
  }
`;

export { GET_VEHICLE };
