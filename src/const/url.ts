export const AdminPageUrls = {
  home: "/admin",
  industries: "/admin/industries",
  industryOffers: (id: string) => `/admin/industries/${id}/offers`,
  categories: (industryId: string) =>
    `/admin/industries/${industryId}/categories`,
  categoryOffers: (industryId: string, categoryId: string) =>
    `/admin/industries/${industryId}/categories/${categoryId}/offers`,
  companies: "/admin/companies",
  companyOffers: (id: string) => `/admin/companies/${id}`,
  offer: (companyId: string, offerId: string) =>
    `/admin/companies/${companyId}/offers/${offerId}`,
  applications: (companyId: string, offerId: string) =>
    `/admin/companies/${companyId}/offers/${offerId}/applications`,
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
  applications: (id: string) => `/company/offers/${id}/applications`,
};

export const CustomerPageUrls = {
  profile: "/profile",
};

export const PublicPageUrls = {
  notFound: "/404",
  home: "/",
  about: "/about",
  login: "/auth",
  profile: "/profile",
  settings: "/settings",
  settingsSecurity: "/settings/security",
  settingsNotifications: "/settings/notifications",
  settingsAppearance: "/settings/appearance",
  verify: (token: string) => `/auth/verify?token=${token}`,
  resetPassword: "/auth/reset-password",
  resetPasswordToken: (token: string) => `/auth/reset-password/${token}`,
  registerUser: "/auth/registration",
  registerCompany: "/auth/registration/company",
  offers: "/offers",
  offersByIndustry: (industry: string) => `/offers/${industry}`,
  offersByCategory: (industry: string, category: string) =>
    `/offers/${industry}/${category}`,
  offer: (id: string) => `/offer/${id}`,
  company: (id: string) => `/companies/${id}`,
} as const;
