const userTypeDefs = `#graphql
  type User {
    _id: ID!
    username: String!
    name: String!
    password: String!
    profilePicture: String
    email: String!
  }
  type Query {
    authUser: User
    user(userId: ID!): User
  }

  type Mutation {
    signup(input: SignUpInput!): User!
    login(input:loginInput!): User!
    logout: logoutResponse!
  }
  input SignUpInput {
    username: String!
    name: String!
    password: String!
    email: String!
  }
input loginInput{
  username: String!
  password: String!
}
  type logoutResponse {
    success: Boolean!
    message: String!
  }
`;

export default userTypeDefs;
