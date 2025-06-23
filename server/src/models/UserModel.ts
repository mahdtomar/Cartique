import Mongoose, { Types, Model, Document } from "mongoose";
const user_types = ["customer", "vendor", "admin"];
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    adderss: string;
    phone: string;
    created_at: Date;
    user_type: "customer" | "vendor" | "admin";
    avatar: string;
    favorite_products: Types.ObjectId[];
}
const schema = new Mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: { type: String, required: true },
    adderss: String,
    phone: String,
    created_at: Date,
    user_type: {
        type: String,
        required: true,
        enum: user_types,
    },
    avatar: String,
    // cart: [cartSchema],
    favorite_products: [{ type: Types.ObjectId, ref: "Product" }],
});

schema.pre("save", function (this: IUser, next) {
    if (!this.created_at) {
        this.created_at = new Date();
    }
    next();
});
const User: Model<IUser> = Mongoose.model<IUser>("User", schema);
export default User;
