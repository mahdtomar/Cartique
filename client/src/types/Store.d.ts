import type { SetStateAction } from "react";

export interface Product {
    _id: string;
    title: stringstring;
    description: stringstring;
    briefDescription: stringstring;
    basePrice: number;
    discountPercentage: number;
    finalPrice:number;
    image: string;
    cloudinary_url: string;
    rating: number;
    ratingCount: number;
    totalRating: number;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface StoreContextTypes {
    previousPage: string; 
    setPreviousPage: React.Dispatch<SetStateAction<string>>;
    getProducts: () => void;
    products: Product[];
    search: string;
    searchProducts: (e:string) => void;
}