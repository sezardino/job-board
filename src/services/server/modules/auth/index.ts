import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "../../helpers";
import { CompaniesService } from "../companies/companies.service";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export class AuthModule implements AbstractModule<AuthController, AuthService> {
  controller: AuthController;
  service: AuthService;

  constructor(
    private readonly prismaService: PrismaService,
    usersService: UsersService,
    companiesService: CompaniesService
  ) {
    this.service = new AuthService(
      prismaService,
      usersService,
      companiesService
    );
    this.controller = new AuthController(this.service);
  }
}
