import { redis } from "../config/redis";
import { hashPassword, verifyPassword } from "../utils/password";
import { AppError } from "../utils/errors";

export class AuthService {
  static async createUser(username: string, password: string): Promise<void> {
    const key = `user:${username}`;

    if (await redis.exists(key)) {
      throw new AppError(400, "Username already exists");
    }

    const passwordHash = await hashPassword(password);

    await redis.hset(key, {
      username,
      passwordHash,
      createdAt: new Date().toISOString()
    });
  }

  static async authenticate(username: string, password: string): Promise<boolean> {
    const user = await redis.hgetall(`user:${username}`);

    if (!user.passwordHash) return false;

    return verifyPassword(user.passwordHash, password);
  }
}