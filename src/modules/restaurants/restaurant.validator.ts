import { z } from "zod";
import { idParamSchema } from "../../validators/id.validator";

export const createRestaurantSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(150),
    description: z.string().max(1000).optional(),
    address: z.string().min(5).max(255),
    phone: z.string().min(7).max(20).optional(),
  }),
});
export const restaurantIdSchema = z.object({
  params: idParamSchema,
});
export const updateRestaurantSchema = z.object({
  params: idParamSchema,

  body: z
    .object({
      name: z.string().min(3).max(150).optional(),
      description: z.string().max(1000).optional(),
      address: z.string().min(5).max(255).optional(),
      phone: z.string().min(7).max(20).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required",
    }),
});
