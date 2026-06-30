import bcrypt from "bcrypt";
import * as users from "./user.repository";
import { generateToken } from "../../utils/jwt";
import { UserRole } from "./user.types";
import { ApiError } from "../../utils/api-error";

export async function register(data: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  const existing = await users.findUserByEmail(data.email);

  if (existing) {
    if (existing) {
      throw new ApiError(409, "Email already exists");
    }
  }

  const hashed = await bcrypt.hash(data.password, 10);

  const userId = await users.createUser(
    data.name,
    data.email,
    hashed,
    data.role,
  );

  const token = generateToken({
    userId,
    role: data.role,
  });

  return {
    token,
    user: {
      id: userId,
      name: data.name,
      email: data.email,
      role: data.role,
    },
  };
}
export async function login(email: string, password: string) {
  const user = await users.findUserByEmail(email);

  if (!user) throw new ApiError(401, "Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) throw new ApiError(401, "Invalid credentials");

  return {
    token: generateToken({
      userId: user.id,
      role: user.role,
    }),
  };
}
