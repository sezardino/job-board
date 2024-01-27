export const generateSlug = (name: string) => {
  const slug = name
    .toLowerCase()
    .replace(/[\s+&@#\/\\,;?!$%\^*:()'"\[\]]+/g, "-");

  const cleanedSlug = slug.replace(/-+/g, "-");

  return cleanedSlug;
};
