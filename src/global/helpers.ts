import * as bcrypt from "bcrypt";
import { Request } from "express";

export async function generateHash(
  value: string,
  salt: number,
): Promise<string> {
  return bcrypt.hash(value, salt);
}

export function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers?.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
}

export function extractCookieToken(request: Request): string | undefined {
  return request.cookies["auth-cookie"]?.token;
}

export async function compareHash(
  plain: string,
  hashed: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}
