import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["card", "cash", "online"],
    },
    category: {
      type: String,
      enum: ["Savingd", "Investment", "Expense", "Others"],
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamp: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
