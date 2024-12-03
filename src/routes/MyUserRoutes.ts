import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

// Validation middlewares as RequestHandler[]
const validationMiddlewares = validateMyUserRequest as express.RequestHandler[];

// Define the GET route to retrieve user data
router.get(
  "/",
  jwtCheck,
  MyUserController.getCurrentUser
);

// Define the POST route to create a new user
router.post(
  "/",
  jwtCheck,
  jwtParse,
  MyUserController.createCurrentUser
);

// Define the PUT route to update an existing user
router.put(
  "/",
  jwtCheck,
  jwtParse,
  ...validationMiddlewares,
  MyUserController.updateCurrentUser
);

export default router;
