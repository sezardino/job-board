import { ApplicationsApiModule } from "./modules/applications";
import { AuthApiModule } from "./modules/auth";
import { CategoriesApiModule } from "./modules/categories";
import { CompaniesApiModule } from "./modules/companies";
import { IndustriesApiModule } from "./modules/industries";
import { NotesApiModule } from "./modules/notes";
import { OffersApiModule } from "./modules/offers";
import { UsersApiModule } from "./modules/users";

class ApiService {
  auth: AuthApiModule;
  users: UsersApiModule;
  industries: IndustriesApiModule;
  companies: CompaniesApiModule;
  offers: OffersApiModule;
  categories: CategoriesApiModule;
  applications: ApplicationsApiModule;
  notes: NotesApiModule;

  constructor() {
    this.auth = new AuthApiModule();
    this.users = new UsersApiModule();
    this.industries = new IndustriesApiModule();
    this.companies = new CompaniesApiModule();
    this.offers = new OffersApiModule();
    this.categories = new CategoriesApiModule();
    this.applications = new ApplicationsApiModule();
    this.notes = new NotesApiModule();
  }
}

export const apiService = new ApiService();
