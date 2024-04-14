const transactionResolvers = {
    Query: {
        transactions: async (parent, args, context, info) => {
            return await getTransactions(args, context, info)
        }
    },
    Mutation: {
        createTransaction: async (parent, args, context, info) => {
            return await createTransaction(args, context, info)
        }
    }
}

export default transactionResolvers

