import { AuthApiModule } from "./modules/auth";
import { CompaniesApiModule } from "./modules/companies";
import { IndustriesApiModule } from "./modules/industries";
import { OffersApiModule } from "./modules/offers";
import { UsersApiModule } from "./modules/users";

class ApiService {
  auth: AuthApiModule;
  users: UsersApiModule;
  industries: IndustriesApiModule;
  companies: CompaniesApiModule;
  offers: OffersApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.users = new UsersApiModule();
    this.industries = new IndustriesApiModule();
    this.companies = new CompaniesApiModule();
    this.offers = new OffersApiModule();
  }
}

export const apiService = new ApiService();
