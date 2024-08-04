import { ServiceResponseSchema } from "@/common/models/serviceResponse";
import type { ResponseConfig } from "@asteasolutions/zod-to-openapi";
import type { StatusCodes } from "http-status-codes";
import type { z } from "zod";

export type ApiResponseConfig = {
  schema: z.ZodTypeAny;
  description: string;
  statusCode: StatusCodes;
};

export function createApiResponses(configs: ApiResponseConfig[]) {
  const responses: { [key: string]: ResponseConfig } = {};
  configs.forEach(({ schema, description, statusCode }) => {
    responses[statusCode] = {
      description,
      content: {
        "application/json": {
          schema: ServiceResponseSchema(schema),
        },
      },
    };
  });
  return responses;
}

// import { StatusCodes } from "http-status-codes";
// import type { z } from "zod";

// import { ServiceResponseSchema } from "@/common/models/serviceResponse";

// export function createApiResponse(schema: z.ZodTypeAny, description: string, statusCode = StatusCodes.OK) {
//   return {
//     [statusCode]: {
//       description,
//       content: {
//         "application/json": {
//           schema: ServiceResponseSchema(schema),
//         },
//       },
//     },
//   };
// }
