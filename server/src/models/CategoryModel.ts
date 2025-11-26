import mongoose from "mongoose";

export type CategoryType = {
  title: Map<string, string>; // for supporting multiple languages keys
};

const schema = new mongoose.Schema<CategoryType>({
  title: {
    required: true,
    type: Map,
    of: String,
  },
});

const Category = mongoose.model("Category", schema);
export default Category;
