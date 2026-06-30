import { z } from "zod";

export const createMenuItemSchema = z.object({
  params: z.object({
    restaurantId: z.coerce.number().int().positive(),
    categoryId: z.coerce.number().int().positive(),
  }),

  body: z.object({
    name: z.string().trim().min(2).max(150),

    description: z.string().trim().max(1000).optional(),

    price: z.number().positive(),

    imageUrl: z.url().optional(),
  }),
});
export const categoryParamsSchema = z.object({
  params: z.object({
    restaurantId: z.coerce.number().int().positive(),
    categoryId: z.coerce.number().int().positive(),
  }),
});
export const menuItemIdSchema = z.object({
  params: z.object({
    restaurantId: z.coerce.number().int().positive(),
    categoryId: z.coerce.number().int().positive(),
    menuItemId: z.coerce.number().int().positive(),
  }),
});
export const updateMenuItemSchema = z.object({
  params: z.object({
    restaurantId: z.coerce.number().int().positive(),
    categoryId: z.coerce.number().int().positive(),
    menuItemId: z.coerce.number().int().positive(),
  }),

  body: z
    .object({
      name: z.string().trim().min(2).max(150).optional(),

      description: z.string().trim().max(1000).optional(),

      price: z.coerce.number().positive().optional(),

      imageUrl: z.url().nullable().optional(),

      isAvailable: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required",
    }),
});