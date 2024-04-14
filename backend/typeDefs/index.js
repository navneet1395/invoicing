import { mergeTypeDefs } from "@graphql-tools/merge"
import userTypeDefs from "./user.typeDefs.js"
import transactionTypeDefs from "./transactions.typeDefs.js"

const mergedTypeDefs = mergeTypeDefs([userTypeDefs, transactionTypeDefs])

export default mergedTypeDefs;


