import { z } from "zod";

export const createCategorySchema = z.object({
  params: z.object({
    restaurantId: z.coerce.number().int().positive(),
  }),

  body: z.object({
    name: z.string().min(2).max(100),
  }),
});
export const restaurantIdSchema = z.object({
  params: z.object({
    restaurantId: z.coerce.number().int().positive(),
  }),
});
export const categoryIdSchema = z.object({
  params: z.object({
    restaurantId: z.coerce.number().int().positive(),
    categoryId: z.coerce.number().int().positive(),
  }),
});
export const updateCategorySchema = z.object({
  params: z.object({
    restaurantId: z.coerce.number().int().positive(),
    categoryId: z.coerce.number().int().positive(),
  }),

  body: z
    .object({
      name: z.string().min(2).max(100).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required",
    }),
});