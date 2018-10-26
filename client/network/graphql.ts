import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  // uri: "https://api.radiant.engineering/Radiant/graphql",
  uri: "http://localhost:4000/DevApp/graphql",
});

const mutate = (mutation, options = {}) => {
  options = addHeaders(options);

  let body = {
    mutation,
    ...options,
  };

  console.log("Graphql mutate: ", body);
  return client.mutate(body).then(({ data }) => data);
};

const fetch = (query, options = {}) => {
  options = addHeaders(options);

  let body = {
    query,
    ...options,
  };

  console.log("Graphql fetch: ", body);
  return client.query(body).then(({ data }) => data);
};

function addHeaders(options) {
  const token = sessionStorage.getItem("auth-token");
  if (!options.context) options.context = {};
  if (!options.context.headers) options.context.headers = {};
  options.context.headers.authorization = token ? `Bearer ${token}` : "";

  return options;
}

export { client, fetch, mutate };
