import { AuthApiModule } from "./modules/auth";
import { IndustriesApiModule } from "./modules/industries";
import { UsersApiModule } from "./modules/users";

class ApiService {
  auth: AuthApiModule;
  users: UsersApiModule;
  industries: IndustriesApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.users = new UsersApiModule();
    this.industries = new IndustriesApiModule();
  }
}

export const apiService = new ApiService();
