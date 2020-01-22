import { ApolloServer } from "apollo-server";
import { ApolloGateway } from "@apollo/gateway";
import jwt from "jsonwebtoken";
// Initialize an ApolloGateway instance and pass it an array of implementing
// service names and URLs

console.log("process.env.JWTSECRET", process.env.JWTSECRET);
const gateway = new ApolloGateway({
  serviceList: [
    {
      name: "user",
      url: "http://localhost:4001"
    },
    {
      name: "topic",
      url: "http://localhost:4002"
    }

    // more services
  ]
});

// Pass the ApolloGateway to the ApolloServer constructor
const gqlGateway = new ApolloServer({
  gateway,

  // Disable subscriptions (not currently supported with ApolloGateway)
  context: ({ req }) => {
    const authorization = req.headers.authorization || "";
    if (
      authorization !== "" &&
      authorization.toLowerCase().startsWith("bearer")
    ) {
      const token = authorization.substr(7);
      const user = jwt.verify(token, process.env.JWTSECRET);
      console.log("user", user);
      return { user };
    }
  },
  subscriptions: false
});

gqlGateway.listen("5000").then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

export default gqlGateway;
