import React, { useRef, useState } from "react";
// import { SimpleEditor } from "./../../utils/rich-text/components/tiptap-templates/simple/simple-editor";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Input, InputGroup } from "@/components/tiptap-ui-primitive/input";

const ProductForm = () => {
    const [title, setTitle] = useState("");
    const [briefDescription, setBriefDescription] = useState("");
    const [cost, setCost] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const imgRef = useRef(null);

    const submitProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            title,
            briefDescription,
            cost,
            salePrice,
            discountPercentage,
            category,
            description,
        };
        const payload = new FormData();
        for (const [key, value] of Object.entries(data)) {
            console.log(key, value);
            payload.append(key, value);
        }
        console.log(payload.entries());
    };
    const captureImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            console.log("reader is loaded");
            if (!imgRef.current) {
                alert("no preview element available");
                return;
            }
            imgRef.current.src = reader.result;
        };
        if (file) {
            console.log(file);
            reader.readAsDataURL(file);
        }
    };
    const cleanNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;
        input = input.replace(/[^\d.]/g, "");
        // Remove all dots except the first occurrence
        e.target.value = input.replace(
            /\./g,
            (offset: number, string: string) =>
                offset === string.indexOf(".") ? "." : ""
        );
    };
    return (
        <div className="container shadow ">
            <form
                onSubmit={(e) => submitProduct(e)}
                className="flex flex-col items-stretch p-2 rounded"
            >
                <div className="flex gap-4">
                    <div className="w-full flex flex-col">
                        <InputField
                            id="title"
                            placeholder="Ex. Smart Tv 55inch Screen"
                            type="text"
                            value={title}
                            setValue={setTitle}
                            label="Product Title"
                        />
                        <InputField
                            id="brief-description"
                            placeholder="Ex. Oled Screen display..."
                            type="text-area"
                            value={briefDescription}
                            setValue={setBriefDescription}
                            label="Brief Description"
                        />
                        <div className="flex">
                            <InputField
                                id="cost"
                                placeholder="Ex. 2000"
                                type="number"
                                value={cost}
                                setValue={setCost}
                                label="Cost"
                                maxLength={9}
                            />
                            <InputField
                                id="sale-price"
                                placeholder="Ex. 2500"
                                type="text"
                                value={salePrice}
                                setValue={setSalePrice}
                                label="sale price"
                            />
                            <InputField
                                id="category"
                                placeholder="Ex. Electronics"
                                type="text"
                                value={category}
                                setValue={setCategory}
                                label="Category"
                            />
                        </div>
                    </div>
                    <div className="w-[350px] wrapper aspect-[218/233] rounded overflow-hidden relative border shadow-lg">
                        <input
                            type="file"
                            name="product-image"
                            id="productImage"
                            accept="image/jpg, image/png, image/jpeg"
                            className="w-full h-full  absolute top-0 left-0 opacity-0 z-10"
                            onChange={(e) => captureImage(e)}
                        />
                        <p className="absolute top-[50%] left-[50%] translate-[-50%]">
                            Upload Image
                        </p>
                        <img src="" ref={imgRef} className="relative z-9" />
                    </div>
                </div>
                <button className="primary self-end">Submit</button>
                <SimpleEditor  /> 
                <InputGroup />
                <Input />
            </form>
        </div>
    );
};
const InputField = ({
    id,
    type,
    placeholder,
    value,
    setValue,
    label,
    maxLength,
}: {
    id: string;
    type: string;
    placeholder?: string;
    value: string;
    setValue: (e: string) => void;
    label?: string;
    maxLength?: number;
}) => {
    if (type === "text-area") {
        return (
            <label htmlFor={id} className="w-full flex flex-col">
                <span>{label}</span>
                <textarea
                    className="block w-full border focus:outline-0 rounded p-1 resize-none h-[150px]"
                    // type={type}
                    lang="6"
                    maxLength={250}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
        );
    }
    return (
        <label htmlFor={id} className="w-full flex flex-col">
            <span>{label}</span>
            <input
                className="block w-full border focus:outline-0 rounded p-1"
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                maxLength={maxLength}
            />
        </label>
    );
};
export default ProductForm;
