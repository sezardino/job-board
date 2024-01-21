import { PrismaService } from "@/libs/prisma";
import { mailService } from "@/services/mail";
import { passwordService } from "@/services/password";
import { AbstractService } from "@/services/server/helpers";
import { UsersService } from "../users/users.service";
import { CustomerRegistrationRequest, LoginRequest } from "./schema";

export class AuthService extends AbstractService {
  constructor(
    prismaService: PrismaService,
    private readonly usersService: UsersService
  ) {
    super(prismaService);
  }

  async customerRegistration(dto: CustomerRegistrationRequest) {
    const { email, password, name } = dto;

    const isEmailAvailable = await this.usersService.checkEmailAvailable(email);

    if (!isEmailAvailable) throw new Error("Login is already taken");

    const hashedPassword = await passwordService.hash(password);

    const newUserData = await this.usersService.registerCustomer({
      name,
      email,
      password: hashedPassword,
    });

    await mailService.sendMail({
      to: newUserData.email,
      templateKey: "welcomeTemplate",
      data: {
        name: newUserData.name,
        token: newUserData.emailToken!,
      },
    });
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
