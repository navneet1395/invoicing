import Transaction from "../models/transaction.model.js";
const transactionResolvers = {
  Query: {
    transactions: async (parent, args, context, info) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (err) {
        throw new Error(err);
      }
    },
    transaction: async (parent, args, context, info) => {
      try {
        const transaction = await Transaction.findById(args.transactionId);
        if (!transaction) {
          throw new Error("Transaction not found");
        }
        return transaction;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createTransaction: async (parent, {input}, context, info) => {
      try{
        const userId = await context.getUser()._id; m 
        const newTransaction = new Transaction({...input,userId:userId})
        await newTransaction.save()
        return newTransaction;

      }catch (err) {
        console.log("Error Creating new Transaction ",err)
        throw new Error("Error creating transaction ")
      }
    },
    updateTransaction: async(parent,{input},context,info)=>{
        try{
            const updateTransaction = await Transaction.findByIdUpdate(input.transactionId,input,{new:true})
        return updateTransaction
        }catch{
            console.log("Error  in Updating Transaction ",err)
            throw new Error("Errror in Updating Transaction")
        }
    },
    deleteTransaction : async (_,{tranactionId})=>{
        try{
            const deleteTransaction = await Transaction.findByIdDelete(transactionId)
        return deleteTransaction
        }catch{
            console.log("Error  in Deleting Transaction ",err)
            throw new Error("Errror in Deleting Transaction")
        }
    }
  },
};

export default transactionResolvers;
