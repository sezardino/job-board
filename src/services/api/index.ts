import { AuthApiModule } from "./modules/auth";
import { CompaniesApiModule } from "./modules/companies";
import { IndustriesApiModule } from "./modules/industries";
import { UsersApiModule } from "./modules/users";

class ApiService {
  auth: AuthApiModule;
  users: UsersApiModule;
  industries: IndustriesApiModule;
  companies: CompaniesApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.users = new UsersApiModule();
    this.industries = new IndustriesApiModule();
    this.companies = new CompaniesApiModule();
  }
}

export const apiService = new ApiService();
