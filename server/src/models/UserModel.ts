import Mongoose, { Types, Model, Document } from "mongoose";
import { Role, VALID_ROLES } from "../types/jwt.js";
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    created_at: Date;
    user_type: Role;
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
    address: String,
    phone: String,
    created_at: Date,
    user_type: {
        type: String,
        required: true,
        enum: VALID_ROLES,
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
