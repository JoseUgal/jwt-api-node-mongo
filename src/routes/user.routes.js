import { Router } from 'express';

import * as usersController from '../controllers/users.controller';

import { verifyToken, authRoles } from '../middlewares/middlewares.module';

const router = Router();

router.get("/", [verifyToken, authRoles.isAdmin] ,usersController.getUser )

router.post("/", [verifyToken, authRoles.isAdmin] ,usersController.createUser )

export default router;