import { RowDataPacket, ResultSetHeader } from "mysql2";
import { db } from "../../database/db";
import { User } from "./user.types";

interface UserRow extends User, RowDataPacket {}

export async function findUserByEmail(email: string) {
  const [rows] = await db.execute<UserRow[]>(
    `
    SELECT *
    FROM users
    WHERE email = ?
    `,
    [email],
  );

  return rows[0] ?? null;
}
export async function createUser(
  name: string,
  email: string,
  password: string,
  role: string,
) {
  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO users
    (name,email,password,role)
    VALUES (?,?,?,?)
    `,
    [name, email, password, role],
  );

  return result.insertId;
}
