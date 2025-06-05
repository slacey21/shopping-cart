import { z } from "zod/v4";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  __v: z.number(),
});

export const newProductSchema = productSchema.pick({
  title: true,
  price: true,
  quantity: true,
});

export const cartItemSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  productId: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  __v: z.number(),
});

export const UpdateCartResponseSchema = z.object({
  product: productSchema,
  item: cartItemSchema,
})

export type Product = z.infer<typeof productSchema>;
export type NewProduct = z.infer<typeof newProductSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type UpdateCartResponse = z.infer<typeof UpdateCartResponseSchema>;
