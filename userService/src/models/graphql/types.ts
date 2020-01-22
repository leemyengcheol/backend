import { gql } from "apollo-server";

export const typeDefs = gql`
  directive @isAuth on FIELD_DEFINITION
  directive @isEmail on ARGUMENT_DEFINITION | FIELD_DEFINITION

  type User @key(fileds: "id") {
    id: String
    displayName: String
    provider: String
  }

  type Query {
    validateToken: Boolean
    validateId(userId: String): Boolean
    retrieveUser(userId: String): Response!
    retrievePortfolio(userId: String): Response!
    retrieveAllPortfolio: [Portfolio]
  }

  type Mutation {
    login(userId: String, passwd: String): Response!
    signup(userId: String @isEmail, passwd: String, nickname: String): Response!
    signout: Response! @isAuth
    addPortfolio: Response @isAuth
    addTitle(body: String): Response! @isAuth
    addBody(body: String): Response! @isAuth
  }
`;
