import { AuthApiModule } from "./modules/auth";
import { UsersApiModule } from "./modules/users";

class ApiService {
  auth: AuthApiModule;
  users: UsersApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.users = new UsersApiModule();
  }
}

export const apiService = new ApiService();
