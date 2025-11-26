import Comment from "../models/CommentModel.js";
import Product from "../models/ProductModel.js";
import asyncWrapper from "../utils/AsyncWrapper.js";
import { Fail, Success } from "../utils/ServerResponses.js";
/**
 * @desc    Create a new comment for a product
 * @route   POST /comments/add
 * @access  Protected
 *
 * Retrieves `productId`, `rating`, and `review` from the request body,
 * and uses the authenticated user's ID from `req.user.id`.
 *
 * Validates that:
 *  - All required fields are present
 *  - Rating is between 0 and 5
 *  - The referenced product exists
 *
 * If valid, creates a new Comment document and returns it in the response.
 *
 * @returns {object} JSON response with the created comment
 */
export const addComment = asyncWrapper(async (req, res) => {
  const userId = req.user?.id;
  const { productId, rating, review } = req.body;
  if (!userId || !productId || typeof rating !== "number" || !review) {
    Fail(res, 400, "some required data are missing");
    console.log(rating, !Number(rating));
    return;
  }
  if (rating > 5 || rating < 0) {
    Fail(res, 400, "invalid rating");
    return;
  }
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    Fail(res, 400, "invalid product id");
    return;
  }
  const comment = await Comment.create({
    user: userId,
    rating,
    review: review.trim(),
    product_id: productId,
  });
  product.addComment(rating);
  return Success(res, 201, { comment });
});

export const getProductComments = asyncWrapper(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    Fail(res, 400, "missing product ID");
    return;
  }
  const comments = await Comment.find({ product_id: productId }).populate(
    "user",
    "name avatar"
  );
  Success(res, 200, comments);
});
