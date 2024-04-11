// models/Claim.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ClaimSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: mongoose.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    title: { type: String },
    description: { type: String },
    status: { type: String, default: "pending" },
    path: { type: String },
  },
  { timestamps: true }
);

const Claim = mongoose.models.Claim || model("Claim", ClaimSchema);

export default Claim;
