import mongoose from "mongoose";

const customMinbasePrice: [(val: number) => boolean, string] = [
  function (val: number) {
    return val > 0;
  },
  "sale price cant be less than or equal to 0.",
];
const costValidation: [(val: number) => boolean, string] = [
  function (val: number) {
    return val > 0;
  },
  "cost can not be less than or equal to 0.",
];

type Product = {
  title: Map<string, string>;
  description: Map<string, string>;
  briefDescription: Map<string, string>;
  cost: number;
  basePrice: number;
  discountPercentage: number;
  finalPrice: number;
  image: string;
  vendor_id: mongoose.ObjectId;
  category: mongoose.ObjectId;
  warehouse_id: string;
  rating: number;
  ratingCount: number;
  totalRating: number;
  cloudinary_url: string;
};
interface ProductDocument extends Product, mongoose.Document {
  toPublicJSON: () => any;
  addComment: (rating: number) => Promise<ProductDocument>;
  editComment: (
    oldRating: number,
    newRating: number
  ) => Promise<ProductDocument>;
  deleteComment: (rating: number) => Promise<ProductDocument>;
}
const productSchema = new mongoose.Schema<ProductDocument>(
  {
    title: {
      type: Map,
      required: true,
      maxlength: 100,
    },
    description: {
      type: Map,
    },
    briefDescription: {
      type: Map,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      validate: costValidation,
    },
    basePrice: {
      type: Number,
      required: true,
      validate: customMinbasePrice,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "no-image",
    },
    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      default: "All",
      required: true,
    },
    warehouse_id: {
      type: String,
      default: "default warehouse",
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    cloudinary_url: {
      type: String,
      default: "no-image",
    },
  },
  { timestamps: true }
);

productSchema.index({ "title.en": 1 }, { unique: true, sparse: true });
productSchema.index({ "title.ar": 1 }, { unique: true, sparse: true });

// public version of the product to prevent leaking important data
productSchema.methods.toPublicJSON = function () {
  return {
    _id: this._id,
    title: this.title,
    description: this.description,
    briefDescription: this.briefDescription,
    basePrice: this.basePrice,
    discountPercentage: this.discountPercentage,
    finalPrice: this.finalPrice,
    image: this.image,
    cloudinary_url: this.cloudinary_url,
    rating: this.rating,
    ratingCount: this.ratingCount,
    totalRating: this.totalRating,
    category: this.category,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

productSchema.methods.addComment = function (rating: number) {
  this.ratingCount += 1;
  this.totalRating += rating;
  this.rating = this.totalRating / this.ratingCount;
  return this.save();
};

productSchema.methods.editComment = function (
  oldRating: number,
  newRating: number
) {
  this.totalRating = this.totalRating - oldRating + newRating;
  this.rating = this.totalRating / this.ratingCount;
  return this.save();
};

productSchema.methods.deleteComment = function (rating: number) {
  this.ratingCount = Math.max(0, this.ratingCount - 1);
  this.totalRating = Math.max(0, this.totalRating - rating);
  this.rating = this.ratingCount > 0 ? this.totalRating / this.ratingCount : 0;
  return this.save();
};

// validation
productSchema.pre<ProductDocument>("save", function (next) {
  // this.finalPrice = (+this.basePrice - (+this.basePrice * (+this.discountPercentage/100)))
  if (this.basePrice < this.cost) {
    return next(new Error("Base price cannot be less than cost"));
  }
  if (this.finalPrice < this.cost) {
    return next(new Error("Final price cannot be less than cost"));
  }
  next();
});
const Product = mongoose.model("Product", productSchema);
export default Product;
