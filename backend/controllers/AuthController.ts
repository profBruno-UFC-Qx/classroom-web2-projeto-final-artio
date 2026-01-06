import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
  // cadastro
  public static async register(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const newUser = await AuthService.register(email, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
  // login
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { token, user } = await AuthService.login(email, password);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}

export default AuthController;
