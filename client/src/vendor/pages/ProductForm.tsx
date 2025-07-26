import Request from "@/api/axios";
import React, { useRef, useState } from "react";
// import { SimpleEditor } from "./../../utils/rich-text/components/tiptap-templates/simple/simple-editor";
// import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
// import { Input, InputGroup } from "@/components/tiptap-ui-primitive/input";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
type formdataTypes = {
    title: string;
    briefDescription: string;
    cost: string;
    salePrice: string;
    discountPercentage: string;
    category: string;
    description: string;
    image: Blob | undefined;
};
const ProductForm = () => {
    const [title, setTitle] = useState("");
    const [briefDescription, setBriefDescription] = useState("");
    const [cost, setCost] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File>();
    const imgRef = useRef(null);
    const [loading, setLoading] = useState(false);
    // errors
    const [titleError, setTitleError] = useState("");
    const [briefDescriptionError, setBriefDescriptionError] = useState("");
    const [costError, setCostError] = useState("");
    const [salePriceError, setSalePriceError] = useState("");
    const [discountPercentageError, setDiscountPercentageError] = useState("");

    const [basePriceError, setBasePriceError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [imageError, setImageError] = useState("");
    const submitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validation()) {
            // alert("error");
            return;
        }
        const data: formdataTypes = {
            title,
            briefDescription,
            cost,
            salePrice,
            discountPercentage,
            category,
            description,
            image,
        };
        const payload = new FormData();
        for (const [key, value] of Object.entries(data)) {
            console.log(key, value);
            payload.append(key, value);
        }
        console.log(Object.entries(payload.entries()));
        setLoading(true);
        const res = await Request(
            "/product/add",
            "POST",
            true,
            undefined,
            undefined,
            payload
        );
        setLoading(false);
        console.log(JSON.parse(res.data));
    };
    const captureImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();
        setImage(file);
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
    const validatePrices = () => {
        if (basePrice < cost) {
            return false;
        }
        if (basePrice < salePrice) {
            return false;
        }
        if (!basePrice) {
            return false;
        }
        if (!salePrice) {
            return false;
        }
        if (!cost) {
            return false;
        }
        return true;
    };
    const validation = () => {
        setTitleError("");
        setBriefDescriptionError("");
        setCostError("");
        setSalePriceError("");
        setDiscountPercentageError("");
        setBasePriceError("");
        setCategoryError("");
        setImageError("");
        let valid = true;

        if (+cost > +basePrice) {
            valid = false;
            setCostError("Cost can't be larger than the base price");
        }
        if (+basePrice < +salePrice) {
            valid = false;
            setSalePriceError(
                "Sale price must be less than or equal to base price"
            );
        }
        if (+cost <= 0) {
            valid = false;
            setCostError("cost can not be less than or equal to 0");
        }
        if (+discountPercentage < 0 || +discountPercentage >= 100) {
            valid = false;
            setDiscountPercentageError(
                "Discount can only be less than 100 and larger than or equal to 0"
            );
        }
        if (!title) {
            setTitleError("Title is required");
            valid = false;
        }
        if (!cost) {
            valid = false;
            setCostError("cost is required");
        }
        if (!briefDescription) {
            valid = false;
            setBriefDescriptionError("brief description is required");
        }
        if (!salePrice) {
            valid = false;
            setSalePriceError("sale price is required");
        }
        if (!basePrice) {
            valid = false;
            setBasePriceError("base price is required");
        }
        if (!category) {
            valid = false;
            setCategoryError("category is required");
        }
        if (!image) {
            valid = false;
            setImageError("image is required");
        }
        return valid;
    };
    const changeDiscountPercentage = (value: string) => {
        if (basePrice) {
            setSalePrice((+basePrice * (1 - +value / 100)).toFixed(2));
        }
        setDiscountPercentage(value);
    };
    const changeSaleValue = (value: string) => {
        if (basePrice) {
            setDiscountPercentage(
                (
                    ((Number(basePrice) - Number(value)) / Number(basePrice)) *
                    100
                ).toFixed(2)
            );
        }
        setSalePrice(value);
    };
    return (
        <div className="container shadow ">
            <form
                onSubmit={(e) => submitProduct(e)}
                className="flex flex-col items-stretch p-2 rounded"
                id="formi"
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
                            error={titleError}
                        />
                        <InputField
                            id="brief-description"
                            placeholder="Ex. Oled Screen display..."
                            type="text-area"
                            value={briefDescription}
                            setValue={setBriefDescription}
                            label="Brief Description"
                            error={briefDescriptionError}
                        />
                        <div className="flex gap-2">
                            <InputField
                                id="cost"
                                placeholder="Ex. 2000"
                                type="number"
                                value={cost}
                                setValue={setCost}
                                label="Cost"
                                maxLength={9}
                                error={costError}
                            />
                            <InputField
                                id="base-price"
                                placeholder="Ex. 2500"
                                type="number"
                                value={basePrice}
                                setValue={setBasePrice}
                                label="base price"
                                error={basePriceError}
                            />
                            <InputField
                                id="discount-percentage"
                                placeholder="Ex. 4%"
                                type="number"
                                value={discountPercentage}
                                setValue={changeDiscountPercentage}
                                label="discount (%)"
                                error={discountPercentageError}
                            />
                            <InputField
                                id="sale-price"
                                placeholder="Ex. 2400"
                                type="number"
                                value={salePrice}
                                setValue={changeSaleValue}
                                label="sale price"
                                error={salePriceError}
                            />
                            <InputField
                                id="category"
                                placeholder="Ex. Electronics"
                                type="text"
                                value={category}
                                setValue={setCategory}
                                label="Category"
                                error={categoryError}
                            />
                        </div>
                    </div>
                    <div className="w-[350px] wrapper aspect-[218/233] rounded overflow-hidden relative border shadow-lg">
                        <input
                            type="file"
                            name="product-image"
                            id="productImage"
                            accept="image/jpg, image/png, image/jpeg"
                            className="w-full h-full  absolute top-0 left-0 opacity-0 z-10 object-fill"
                            onChange={(e) => captureImage(e)}
                        />
                        <p className="absolute top-[50%] left-[50%] translate-[-50%]">
                            Upload Image
                        </p>
                        <img src="" ref={imgRef} className="relative z-9" />
                        <p className="text-red-400 text-center font-bold absolute bottom-[20px] left-[50%] translate-x-[-50%]">
                            {imageError}
                        </p>
                    </div>
                </div>
                <div className="mt-2">
                    <p>Description</p>
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                    />
                </div>
                <button className="primary self-end">Submit</button>
            </form>
            {loading && "loading"}
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
    error,
}: {
    id: string;
    type: string;
    placeholder?: string;
    value: string;
    setValue: (e: string) => void;
    label?: string;
    maxLength?: number;
    error?: string;
}) => {
    const cleanNumericInput = (
        value: string,
        setState: (value: string) => void
    ) => {
        // Remove non-digit/non-dot characters
        const input = value.replace(/[^\d.]/g, "");

        // Remove extra dots (keep only the first one)
        const parts = input.split(".");
        if (parts.length > 1) {
            const beforeDot = parts[0];
            const afterDot = parts.slice(1).join("");
            setState(`${beforeDot}.${afterDot}`);
        } else {
            setState(input);
        }
    };
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
                    name={value}
                />
                <p className="text-red-400 font-bold">{error}</p>
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
                name={value}
            />
            <p className="text-red-400 font-bold">{error}</p>
        </label>
    );
};
export default ProductForm;
