import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponses } from "@/api/docs/openAPIResponseBuilders";
import { UserSchema } from "@/api/user/userModel";
import { getByIdSchema } from "@/common/utils/commonValidation";
import { validateRequest } from "@/common/utils/httpHandlers";
import { StatusCodes } from "http-status-codes";
import { userController } from "./userController";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponses([
    {
      schema: z.array(UserSchema),
      description: "Success",
      statusCode: StatusCodes.OK,
    },
  ]),
});

userRouter.get("/", userController.getUsers);

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: getByIdSchema.shape.params },
  responses: createApiResponses([
    {
      schema: z.array(UserSchema),
      description: "Success",
      statusCode: StatusCodes.OK,
    },
  ]),
});

userRouter.get("/:id", validateRequest(getByIdSchema), userController.getUser);
