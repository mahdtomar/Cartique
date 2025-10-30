import type { SetStateAction } from "react";

export interface Product {
  _id: string;
  title: stringstring;
  description: stringstring;
  briefDescription: stringstring;
  basePrice: number;
  discountPercentage: number;
  finalPrice: number;
  image: string;
  cloudinary_url: string;
  rating: number;
  ratingCount: number;
  totalRating: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}
export interface Comment {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  product_id: string;
  rating: number;
  review: string;
}
export interface StoreContextTypes {
  previousPage: string;
  setPreviousPage: React.Dispatch<SetStateAction<string>>;
  getProducts: (
    pageNumber?: number,
    limit?: number,
    searchText?: string
  ) => Promise<Product[]>;
  // products: Product[];
  search: string;
  storePage: number;
  productsCount: number;
}
