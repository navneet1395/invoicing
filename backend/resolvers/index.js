import {mergeResolvers} from "@graphql-tools/merge"
import transactionResolvers from "./transactions.resolvers.js"
import userResolvers from "./user.resolvers.js";
const mergedResolvers = mergeResolvers([transactionResolvers,userResolvers])

export default mergedResolvers;


