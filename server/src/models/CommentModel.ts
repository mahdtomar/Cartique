import mongoose from "mongoose";
type commentShemeTypes = {
  user: mongoose.ObjectId;
  rating: number;
  review: string;
  product_id: mongoose.ObjectId;
};
const commentSchema = new mongoose.Schema<commentShemeTypes>({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  product_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Product",
  },
  rating: {
    type: Number,
    required: true,
    max: 5,
    min: 0,
  },
  review: {
    type: String,
    required: true,
  },
});
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
