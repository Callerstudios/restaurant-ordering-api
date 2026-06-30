import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../../database/db";
import {
  CreateMenuItemDto,
  MenuItem,
  OrderableMenuItem,
  UpdateMenuItemDto,
} from "./menu-item.types";

// interface MenuItemRow extends MenuItem, RowDataPacket {}
interface MenuItemRow extends RowDataPacket {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
  is_available: 0 | 1;
  created_at: Date;
  updated_at: Date;
}
interface OrderableMenuItemRow extends RowDataPacket {
  id: number;
  category_id: number;
  restaurant_id: number;
  name: string;
  price: string;
  is_available: 0 | 1;
}
function toOrderableMenuItem(row: OrderableMenuItemRow): OrderableMenuItem {
  return {
    id: row.id,
    categoryId: row.category_id,
    restaurantId: row.restaurant_id,
    name: row.name,
    price: Number(row.price),
    isAvailable: Boolean(row.is_available),
  };
}
function toMenuItem(row: MenuItemRow): MenuItem {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    imageUrl: row.image_url,
    isAvailable: Boolean(row.is_available),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function create(item: CreateMenuItemDto): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
      INSERT INTO menu_items
      (
        category_id,
        name,
        description,
        price,
        image_url
      )
      VALUES (?, ?, ?, ?, ?)
      `,
    [
      item.categoryId,
      item.name,
      item.description ?? null,
      item.price,
      item.imageUrl ?? null,
    ],
  );

  return result.insertId;
}
async function findById(
  categoryId: number,
  menuItemId: number,
): Promise<MenuItem | null> {
  const [rows] = await db.execute<RowDataPacket[]>(
    `
      SELECT *
      FROM menu_items
      WHERE id = ?
        AND category_id = ?
      `,
    [menuItemId, categoryId],
  );
  if (rows.length === 0) {
    return null;
  }
  return toMenuItem(rows[0] as MenuItemRow);
}
async function findByIds(ids: number[]): Promise<OrderableMenuItem[]> {
  if (ids.length === 0) {
    return [];
  }

  const placeholders = ids.map(() => "?").join(",");

  const [rows] = await db.execute<OrderableMenuItemRow[]>(
    `
      SELECT
          mi.id,
          mi.category_id,
          c.restaurant_id,
          mi.name,
          mi.price,
          mi.is_available
      FROM menu_items mi
      INNER JOIN categories c
          ON mi.category_id = c.id
      WHERE mi.id IN (${placeholders})
      `,
    ids,
  );

  return rows.map(toOrderableMenuItem);
}
async function findByCategory(categoryId: number): Promise<MenuItem[]> {
  const [rows] = await db.execute<RowDataPacket[]>(
    `
      SELECT *
      FROM menu_items
      WHERE category_id = ?
      ORDER BY name
      `,
    [categoryId],
  );

  return rows.map((row) => toMenuItem(row as MenuItemRow));
}
async function findByCategoryAndName(
  categoryId: number,
  name: string,
): Promise<MenuItem | null> {
  const [rows] = await db.execute<RowDataPacket[]>(
    `
      SELECT *
      FROM menu_items
      WHERE category_id = ?
        AND name = ?
      `,
    [categoryId, name],
  );

  return rows[0] ? toMenuItem(rows[0] as MenuItemRow) : null;
}
async function update(
  categoryId: number,
  menuItemId: number,
  data: UpdateMenuItemDto,
): Promise<void> {
  const fields: string[] = [];
  const values = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  if (data.description !== undefined) {
    fields.push("description = ?");
    values.push(data.description);
  }

  if (data.price !== undefined) {
    fields.push("price = ?");
    values.push(data.price);
  }

  if (data.imageUrl !== undefined) {
    fields.push("image_url = ?");
    values.push(data.imageUrl);
  }

  if (data.isAvailable !== undefined) {
    fields.push("is_available = ?");
    values.push(data.isAvailable);
  }

  fields.push("updated_at = CURRENT_TIMESTAMP");

  values.push(menuItemId);
  values.push(categoryId);

  await db.execute(
    `
    UPDATE menu_items
    SET ${fields.join(", ")}
    WHERE id = ?
      AND category_id = ?
    `,
    values,
  );
}
async function remove(
  categoryId: number,
  menuItemId: number,
): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `
      DELETE FROM menu_items
      WHERE id = ?
        AND category_id = ?
      `,
    [menuItemId, categoryId],
  );

  return result.affectedRows > 0;
}
export const menuItemRepository = {
  create,
  findById,
  findByIds,
  findByCategory,
  findByCategoryAndName,
  update,
  delete: remove,
};
