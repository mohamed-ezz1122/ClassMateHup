import { Schema, model } from "mongoose";

const subjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    subjectData: [{
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true, unique: true },}
    ],
    subjectInfo: {
      term: { type: String, required: true, enum: ["first", "second"] },
      acadimcYears: {
        type: String,
        required: true,
        enum: ["first Years", "secound Years", "Therd Year", "forist Year"],
      },
      doctorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updateBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Subject", subjectSchema);
