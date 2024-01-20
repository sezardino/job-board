export const AdminPageUrls = {
  home: "/admin",
  industries: "/admin/industries",
  companies: "/admin/companies",
  users: "/admin/users",
  admins: "/admin/users/admins",
  customers: "/admin/users/customers",
};

export const CompanyPageUrls = {
  home: "/company",
  profile: "/company/profile",
  users: "/company/users",
  offers: "/company/offers",
  bank: "/company/bank",
};

export const UserPageUrls = {
  home: "/user",
  industries: "/user/industries",
  companies: "/user/companies",
};

export const PublicPageUrls = {
  home: "/",
  about: "/about",
  login: "/auth",
  registerUser: "/auth/registration",
  registerCompany: "/auth/registration/company",
  industry: (id: string) => `/industry/${id}`,
  category: (industry: string, category: string) => `/${industry}/${category}`,
  offer: (id: string) => `/offers/${id}`,
  company: (id: string) => `/companies/${id}`,
} as const;
