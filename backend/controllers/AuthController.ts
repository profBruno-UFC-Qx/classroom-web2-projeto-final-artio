import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
  // cadastro
  public static async register(req: Request, res: Response) {
    const { email, password, name, username } = req.body;
    try {
      const newUser = await AuthService.register(
        email,
        password,
        name,
        username,
      );
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

  public static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await AuthService.getUserById(id[0]);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }
}

export default AuthController;
