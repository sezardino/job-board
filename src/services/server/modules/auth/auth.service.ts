import { PrismaService } from "@/libs/prisma";
import { passwordService } from "@/services/password";
import { AbstractService } from "@/services/server/helpers";
import { UsersService } from "../users/users.service";
import { LoginRequest, RegistrationRequest } from "./schema";

export class AuthService extends AbstractService {
  constructor(
    prismaService: PrismaService,
    private readonly usersService: UsersService
  ) {
    super(prismaService);
  }

  async registration(dto: RegistrationRequest): Promise<boolean> {
    const { email, password } = dto;

    const isEmailAvailable = await this.usersService.checkEmailAvailable(email);

    if (!isEmailAvailable) throw new Error("Login is already taken");

    const hashedPassword = await passwordService.hash(password);

    const newUser = await this.usersService.createUser({
      email,
      password,
    });

    return !!newUser;
  }

  async login(dto: LoginRequest) {
    const { email, password } = dto;

    const user = await this.usersService.findByEmail(email);

    if (!user || !user.password) throw new Error("Wrong credentials");

    const isPasswordValid = await passwordService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) throw new Error("Wrong credentials");

    return {
      ...user,
      avatar: user.avatar?.url,
      companyId: user.companyId || undefined,
    };
  }
}
