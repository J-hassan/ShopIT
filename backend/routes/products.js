import express from "express";
import { createProductReview, deleteProduct, deleteReview, getProductDetails, getProductReviews, getProducts, newProduct, updateProductDetails } from "../controllers/productController.js";
const router = express.Router();
import { isAuthenticatedUser, AuthorizeRoles } from "../middlewares/auth.js";


router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);

// admin routes
router.route("/admin/products").post(isAuthenticatedUser,AuthorizeRoles("admin"),newProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser,AuthorizeRoles("admin"),updateProductDetails);
router.route("/admin/products/:id").delete(isAuthenticatedUser,AuthorizeRoles("admin"),deleteProduct);

// reviews routes
router.route("/reviews")
.put(isAuthenticatedUser,createProductReview)
.get(isAuthenticatedUser,getProductReviews)

router.route("/admin/reviews")
.delete(isAuthenticatedUser,AuthorizeRoles("admin"),deleteReview);

export default router;


