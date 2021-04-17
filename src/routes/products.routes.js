import { Router } from 'express';
const router = Router();

import * as productsController from "../controllers/products.controller";

import { verifyToken, authRoles } from '../middlewares/middlewares.module';


router.get('/', productsController.getProducts);

router.post('/', [ verifyToken, authRoles.isModerator ], productsController.createProduct);

router.get('/:productId', productsController.getProductById);

router.put('/:productId', [verifyToken, authRoles.isAdmin], productsController.updateProductById);

router.delete('/:productId', [verifyToken, authRoles.isAdmin], productsController.deleteProductById);


export default router;