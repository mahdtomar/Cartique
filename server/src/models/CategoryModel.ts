import mongoose from "mongoose";

type Category = {
  title: string;
};
const schema = new mongoose.Schema<Category>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model("Category", schema);
export default Category;