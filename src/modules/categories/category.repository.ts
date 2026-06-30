import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../../database/db";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "./category.types";

interface CategoryRow extends Category, RowDataPacket {}

async function create(category: CreateCategoryDto): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO categories
    (
      restaurant_id,
      name
    )
    VALUES (?, ?)
    `,
    [category.restaurantId, category.name],
  );

  return result.insertId;
}
async function findById(
  restaurantId: number,
  categoryId: number,
): Promise<Category | null> {
  const [rows] = await db.execute<CategoryRow[]>(
    `
    SELECT *
    FROM categories
    WHERE id = ?
      AND restaurant_id = ?
    `,
    [categoryId, restaurantId],
  );

  return rows[0] ?? null;
}
async function findByRestaurant(restaurantId: number): Promise<Category[]> {
  const [rows] = await db.execute<CategoryRow[]>(
    `
    SELECT *
    FROM categories
    WHERE restaurant_id = ?
    ORDER BY name ASC
    `,
    [restaurantId],
  );

  return rows;
}
async function findByRestaurantAndName(
  restaurantId: number,
  name: string,
): Promise<Category | null> {
  const [rows] = await db.execute<CategoryRow[]>(
    `
    SELECT *
    FROM categories
    WHERE restaurant_id = ?
      AND name = ?
    `,
    [restaurantId, name],
  );

  return rows[0] ?? null;
}
async function update(
  restaurantId: number,
  categoryId: number,
  data: UpdateCategoryDto,
): Promise<void> {
  const fields: string[] = [];
  const values = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  fields.push("updated_at = CURRENT_TIMESTAMP");

  values.push(categoryId);
  values.push(restaurantId);

  await db.execute(
    `
    UPDATE categories
    SET ${fields.join(", ")}
    WHERE id = ?
      AND restaurant_id = ?
    `,
    values,
  );
}
async function remove(
  restaurantId: number,
  categoryId: number,
): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    DELETE
    FROM categories
    WHERE id = ?
      AND restaurant_id = ?
    `,
    [categoryId, restaurantId],
  );

  return result.affectedRows > 0;
}
export const categoryRepository = {
  create,
  findById,
  findByRestaurant,
  findByRestaurantAndName,
  update,
  delete: remove,
};
