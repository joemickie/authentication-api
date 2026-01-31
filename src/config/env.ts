import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3000),
  redisHost: process.env.REDIS_HOST as string,
  redisPort: Number(process.env.REDIS_PORT),
  redisPassword: process.env.REDIS_PASSWORD,
  nodeEnv: process.env.NODE_ENV || "development"
};