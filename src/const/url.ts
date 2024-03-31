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
  newOffer: "/company/offers/new",
  offer: (id: string) => `/company/offers/${id}`,
};

export const UserPageUrls = {
  home: "/user",
  industries: "/user/industries",
  companies: "/user/companies",
};

export const PublicPageUrls = {
  notFound: "/404",
  home: "/",
  about: "/about",
  login: "/auth",
  verify: (token: string) => `/auth/verify?token=${token}`,
  registerUser: "/auth/registration",
  registerCompany: "/auth/registration/company",
  jobOffers: "/job-offers",
  jobOffersByIndustry: (industry: string) => `/job-offers/${industry}`,
  jobOffersByCategory: (industry: string, category: string) =>
    `/job-offers/${industry}/${category}`,
  offer: (id: string) => `/offers/${id}`,
  company: (id: string) => `/companies/${id}`,
} as const;
