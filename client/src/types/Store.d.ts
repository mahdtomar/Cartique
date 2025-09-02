import type { SetStateAction } from "react";

export interface StoreContext {
    previousPage: string; 
    setPreviousPage: React.Dispatch<SetStateAction<string>>;
    getProducts:()=>void;
}