// import Request from "@/api/axios";
// import InputField from "@/components/misc/InputField";
// import UploadImagePreview from "@/components/misc/UploadImagePreview";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { validateProductForm } from "../validation/ProductFormValidation";
import Request from "@/common/api/axios";
import InputField from "@/common/components/misc/InputField";
import UploadImagePreview from "@/common/components/misc/UploadImagePreview";
import { useForm, type SubmitHandler } from 'react-hook-form'
import MultiLanguageInput from "@/common/components/misc/MultiLanguageInput";
type formdataTypes = {
	title: Map<string, string>;
	briefDescription: string;
	cost: string;
	finalPrice: string;
	basePrice: string;
	discountPercentage: string;
	category: string;
	description: string;
	image: File | undefined;
};
interface ApiResponse {
	data: string;
	// Add other properties if needed (status, headers, etc.)
}
const ProductForm = () => {
	const [title, setTitle] = useState("");
	const [briefDescription, setBriefDescription] = useState("");
	const [cost, setCost] = useState("");
	const [salePrice, setSalePrice] = useState("");
	const [basePrice, setBasePrice] = useState("");
	const [discountPercentage, setDiscountPercentage] = useState("0");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState<File>();
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
	const { register, handleSubmit } = useForm<formdataTypes>()
	const submitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errors = validateProductForm({
			title,
			briefDescription,
			cost,
			basePrice,
			salePrice,
			discountPercentage,
			category,
			image,
		});

		// Update error states
		setTitleError(errors.title || "");
		setCostError(errors.cost || "");
		setBriefDescriptionError(errors.briefDescription || "");
		setSalePriceError(errors.salePrice || "");
		setBasePriceError(errors.basePrice || "");
		setCategoryError(errors.category || "");
		setImageError(errors.image || "");
		setDiscountPercentageError(errors.discountPercentage || "");

		const isValid = Object.keys(errors).length === 0;
		if (!isValid) return;
		const data: formdataTypes = {
			title,
			briefDescription,
			cost,
			finalPrice: salePrice,
			discountPercentage,
			category,
			description,
			image,
			basePrice,
		};
		const payload = new FormData();
		for (const [key, value] of Object.entries(data)) {
			// Add type guard for image
			if (key === "image" && value) {
				payload.append(key, value as File);
			} else if (typeof value === "string") {
				payload.append(key, value);
			}
		}
		console.log(Object.entries(payload.entries()));

		setLoading(true);
		try {
			const res = (await Request(
				"/products/add",
				"POST",
				true,
				undefined,
				undefined,
				payload
			)) as ApiResponse;
			setLoading(false);
			console.log(res);
		} catch (error) {
			setLoading(false);
			console.error("Submission Failed: ", error);
		}
	};

	const changeDiscountPercentage = (value: string) => {
		if (basePrice) {
			setSalePrice((+basePrice * (1 - +value / 100)).toFixed(2));
		}
		setDiscountPercentage(value);
	};

	const changeSaleValue = (value: string) => {
		if (basePrice === salePrice) {
			setDiscountPercentage('0')
		}
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

	useEffect(() => {
		if (+discountPercentage === 0) {
			setSalePrice(basePrice)
		}
		if (!basePrice || +basePrice === 0) {
			setSalePrice("")
			setDiscountPercentage("")
		}
	}, [basePrice])

	useEffect(() => {
		setTitleError("");
		setBriefDescriptionError("");
		setCostError("");
		setSalePriceError("");
		setDiscountPercentageError("");
		setBasePriceError("");
		setCategoryError("");
		setImageError("");
	}, [
		title,
		briefDescription,
		cost,
		salePrice,
		basePrice,
		discountPercentage,
		category,
		image,
	]);
	const onSubmit: SubmitHandler<formdataTypes> = (data) => console.log(data)
	return (
		<div className="container  ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col items-stretch p-2 rounded mt-10 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.2)]"
				id="formi"
			>
				<div className="flex gap-4">
					<div className="w-full flex flex-col gap-2">
						<MultiLanguageInput
							// id="title"
							name="title.en"
							// placeholder="Ex. Smart Tv 55inch Screen"
							type="text"
							label="title"
							// {...register("title")}
							register={register}
						/>
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
								id="category"
								placeholder="Ex. Electronics"
								type="text"
								value={category}
								setValue={setCategory}
								label="Category"
								error={categoryError}
							/>
						</div>
						<div className="flex gap-2">
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
						</div>
					</div>
					<div className="w-[350px]">
						<UploadImagePreview setImage={setImage} imageError={imageError} />
					</div>
				</div>
				<div className="mt-2">
					<p className="font-bold">Description</p>
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

export default ProductForm;
