import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { credentialsSchema } from "../validations/auth.validation";
import { AppError } from "../utils/errors";

export class AuthController {
  static async register(req: Request, res: Response) {
    const parsed = credentialsSchema.safeParse(req.body);
    
    if (!parsed.success) {
      const errors = parsed.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return res.status(400).json({ 
        error: "Validation failed",
        details: errors 
      });
    }

    try {
      await AuthService.createUser(parsed.data.username, parsed.data.password);
      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async login(req: Request, res: Response) {
    const parsed = credentialsSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await AuthService.authenticate(
      parsed.data.username,
      parsed.data.password
    );

    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Authenticated successfully" });
  }
}