interface ProductFormValues {
  title: string;
  briefDescription: string;
  cost: string;
  basePrice: string;
  salePrice: string;
  discountPercentage: string;
  category: string;
  image?: File; 
}

interface ProductFormErrors {
  title?: string;
  briefDescription?: string;
  cost?: string;
  basePrice?: string;
  salePrice?: string;
  discountPercentage?: string;
  category?: string;
  image?: string;
}

export const validateProductForm = (values: ProductFormValues): ProductFormErrors => {
  const errors: ProductFormErrors = {};
  const numCost = parseFloat(values.cost);
  const numBasePrice = parseFloat(values.basePrice);
  const numSalePrice = parseFloat(values.salePrice);
  const numDiscount = parseFloat(values.discountPercentage);

  if (!values.title) errors.title = "Title is required";
  if (!values.cost) errors.cost = "Cost is required";
  if (!values.briefDescription) errors.briefDescription = "Brief description is required";
  if (!values.salePrice) errors.salePrice = "Sale price is required";
  if (!values.basePrice) errors.basePrice = "Base price is required";
  if (!values.category) errors.category = "Category is required";
  if (!values.image) errors.image = "Image is required";


  if (values.cost && !isNaN(numCost)) {
    if (numCost <= 0) errors.cost = "Cost must be greater than 0";
    if (values.basePrice && !isNaN(numBasePrice) && numCost > numBasePrice) {
      errors.cost = "Cost can't be larger than base price";
    }
  }

  if (values.basePrice && values.salePrice && !isNaN(numBasePrice) && !isNaN(numSalePrice)) {
    if (numBasePrice < numSalePrice) {
      errors.salePrice = "Sale price must be less than or equal to the base price";
    }
  }

  if (values.discountPercentage && !isNaN(numDiscount)) {
    if (numDiscount < 0 || numDiscount >= 100) {
      errors.discountPercentage = "Discount must be 0-99.99%";
    }
  }

  return errors;
};