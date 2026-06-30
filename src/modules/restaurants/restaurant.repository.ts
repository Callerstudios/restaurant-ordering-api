import { db } from "../../database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Restaurant, CreateRestaurantDto, UpdateRestaurantDto } from "./restaurant.types";

interface RestaurantRow extends Restaurant, RowDataPacket {}

interface CountRow extends RowDataPacket {
  total: number;
}

async function create(restaurant: CreateRestaurantDto): Promise<number> {
  const [result] = await db.execute<ResultSetHeader>(
    `
            INSERT INTO restaurants
            (
                owner_id,
                name,
                description,
                address,
                phone
            )
            VALUES (?,?,?,?,?)
            `,
    [
      restaurant.ownerId,
      restaurant.name,
      restaurant.description ?? null,
      restaurant.address,
      restaurant.phone ?? null,
    ],
  );

  return result.insertId;
}
async function findById(id: number): Promise<Restaurant | null> {
  const [rows] = await db.execute<RestaurantRow[]>(
    `
            SELECT *
            FROM restaurants
            WHERE id = ?
            `,
    [id],
  );

  return rows[0] ?? null;
}
async function findAll(
  page: number,
  limit: number,
  offset: number,
): Promise<Restaurant[]> {
  const [rows] = await db.execute<RestaurantRow[]>(
    `
    SELECT *
    FROM restaurants
    ORDER BY created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
    `
  );

  return rows;
}
async function count(): Promise<number> {
  const [rows] = await db.execute<CountRow[]>(
    `
    SELECT COUNT(*) AS total
    FROM restaurants
    `
  );

  return rows[0].total;
}
async function findByOwner(ownerId: number): Promise<Restaurant[]> {
  const [rows] = await db.execute<RestaurantRow[]>(
    `
            SELECT *
            FROM restaurants
            WHERE owner_id = ?
            `,
    [ownerId],
  );

  return rows;
}
async function update(id: number, data: UpdateRestaurantDto): Promise<void> {
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

  if (data.address !== undefined) {
    fields.push("address = ?");
    values.push(data.address);
  }

  if (data.phone !== undefined) {
    fields.push("phone = ?");
    values.push(data.phone);
  }

  fields.push("updated_at = CURRENT_TIMESTAMP");

  values.push(id);

  await db.execute(
    `
      UPDATE restaurants
      SET ${fields.join(", ")}
      WHERE id = ?
    `,
    values,
  );
}
async function remove(id: number): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `
    DELETE
    FROM restaurants
    WHERE id = ?
    `,
    [id],
  );

  return result.affectedRows > 0;
}

export const restaurantRepository = {
  create,

  findById,

  findAll,

  count,

  findByOwner,

  update,

  delete: remove,
};