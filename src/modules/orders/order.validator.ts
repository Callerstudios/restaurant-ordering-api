import { z } from "zod";
import { ORDER_STATUS } from "./order.constants";

const orderItemSchema = z.object({
  menuItemId: z.coerce.number().int().positive(),

  quantity: z.coerce
    .number()
    .int()
    .min(1)
    .max(100, "Quantity must be between 1 and 100"),
});
export const createOrderSchema = z.object({
  body: z.object({
    restaurantId: z.coerce.number().int().positive(),

    items: z
      .array(orderItemSchema)
      .min(1, "Order must contain at least one item")
      .superRefine((items, ctx) => {
        const seen = new Set<number>();

        items.forEach((item, index) => {
          if (seen.has(item.menuItemId)) {
            ctx.addIssue({
              code: "custom",
              message: "Duplicate menu item",
              path: [index, "menuItemId"],
            });
          }

          seen.add(item.menuItemId);
        });
      }),
  }),
});
export const orderIdSchema = z.object({
  params: z.object({
    orderId: z.coerce.number().int().positive(),
  }),
});
export const getOrdersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),

    status: z
      .enum([
        ORDER_STATUS.PENDING,
        ORDER_STATUS.ACCEPTED,
        ORDER_STATUS.PREPARING,
        ORDER_STATUS.READY,
        ORDER_STATUS.COMPLETED,
        ORDER_STATUS.CANCELLED,
      ])
      .optional(),

    sortBy: z.enum(["createdAt", "totalAmount"]).default("createdAt"),

    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),
});
export const getRestaurantOrdersSchema = z.object({
  params: z.object({
    restaurantId: z.coerce.number().int().positive(),
  }),

  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),

    status: z
      .enum([
        ORDER_STATUS.PENDING,
        ORDER_STATUS.ACCEPTED,
        ORDER_STATUS.PREPARING,
        ORDER_STATUS.READY,
        ORDER_STATUS.COMPLETED,
        ORDER_STATUS.CANCELLED,
      ])
      .optional(),

    sortBy: z.enum(["createdAt", "totalAmount"]).default("createdAt"),

    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),
});
export const updateOrderStatusSchema = z.object({
  params: z.object({
    orderId: z.coerce.number().int().positive(),
  }),

  body: z.object({
    status: z.enum([
      ORDER_STATUS.ACCEPTED,
      ORDER_STATUS.PREPARING,
      ORDER_STATUS.READY,
      ORDER_STATUS.COMPLETED,
    ]),
  }),
});
export const cancelOrderSchema = z.object({
  params: z.object({
    orderId: z.coerce.number().int().positive(),
  }),
});