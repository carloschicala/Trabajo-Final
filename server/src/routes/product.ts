import { Router } from "express";
import { getProducts, newProduct } from "../controllers/product";
import validateToken from "./validate-token";

const router = Router();

router.get('/', validateToken, getProducts);
router.post('/new', newProduct);

export default router; 