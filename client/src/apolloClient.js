import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://orient-auto-server.onrender.com/graphql",
  // uri: `${process.env.URI}`,
});

const middleware = new ApolloLink((operation, forward) => {
  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
  };
  operation.setContext({
    headers,
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: new ApolloLink.from([middleware, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
