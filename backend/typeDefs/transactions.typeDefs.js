const transactionTypeDefs = `#graphql
type Transaction{
    _id: ID!
    amount: Float!
    description: String!
    date: String!
    userId: String!
    paymentType: String!
    category: String!
}
type Query {
    transactions: [Transaction!]
    transaction(_id: ID!): Transaction
}
type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction( input: UpdateTransactionInput!): Transaction!
    deleteTransaction(transactionId: ID!): Transaction!
}
input CreateTransactionInput {
    amount: Float!
    description: String!
    date: String!
    userId: String!
    paymentType: String!
    category: String!
}
input UpdateTransactionInput {
    transactionId: ID!,
    amount: Float
    description: String
    date: String
    userId: String
    paymentType: String
    category: String
}

`

export default transactionTypeDefs

