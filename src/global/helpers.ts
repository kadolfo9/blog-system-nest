import { JwtService } from "@nestjs/jwt";
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

export async function compareHash(
  plain: string,
  hashed: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export async function verifyToken(jwtService: JwtService, token: string) {
  const checkToken = await jwtService.verifyAsync(token, {
    secret: process.env.JWT_SECRET,
  });

  return checkToken;
}
