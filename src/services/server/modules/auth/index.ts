import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "../../helpers";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export class AuthModule implements AbstractModule<AuthController, AuthService> {
  controller: AuthController;
  service: AuthService;

  constructor(
    private readonly prismaService: PrismaService,
    usersService: UsersService
  ) {
    this.service = new AuthService(prismaService, usersService);
    this.controller = new AuthController(this.service);
  }
}
