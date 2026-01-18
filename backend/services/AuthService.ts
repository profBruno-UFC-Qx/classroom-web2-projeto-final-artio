import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../models/PrismaClient";

const JWT_SECRET = process.env.JWT_SECRET || "default";

class AuthService {
  // cadastro
  public static async register(
    email: string,
    password: string,
    name: string,
    username: string,
  ) {
    const userExists = await AuthService.findUserByEmail(email);
    if (userExists) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
      },
    });
    return newUser;
  }
  // login
  public static async login(email: string, password: string) {
    const user = await AuthService.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ userId: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token, user };
  }
  // encontrar usuário pelo email
  private static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  public static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { username: id },
    });
    return user;
  }
}

export default AuthService;
