import { AuthApiModule } from "./modules/auth";
import { CategoriesApiModule } from "./modules/categories";
import { CompaniesApiModule } from "./modules/companies";
import { IndustriesApiModule } from "./modules/industries";
import { JobOffersApiModule } from "./modules/job-offers";
import { UsersApiModule } from "./modules/users";

class ApiService {
  auth: AuthApiModule;
  users: UsersApiModule;
  industries: IndustriesApiModule;
  companies: CompaniesApiModule;
  jobOffers: JobOffersApiModule;
  categories: CategoriesApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.users = new UsersApiModule();
    this.industries = new IndustriesApiModule();
    this.companies = new CompaniesApiModule();
    this.jobOffers = new JobOffersApiModule();
    this.categories = new CategoriesApiModule();
  }
}

export const apiService = new ApiService();
