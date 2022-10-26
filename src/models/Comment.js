import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "can't be blank"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Comment", commentSchema);
