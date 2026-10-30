export type TenantCategory = "hardware";

export type StorefrontTenant = {
  slug: string;
  databaseSlug: string;
  name: string;
  category: TenantCategory;
  tagline: string;
  description: string;
  accent: string;
  accentSoft: string;
  currency: string;
  logo: {
    src: string;
    alt: string;
  };
  address: string;
  mapCoordinates: string;
  mapUrl: string;
  phone: string;
  heroImage: string;
};

export const tenants: StorefrontTenant[] = [
  {
    slug: "ak-distributors",
    databaseSlug: "AK",
    name: "AK Distributors",
    category: "hardware",
    tagline: "Your trusted partner for quality products and dependable supply.",
    description:
      "Discover quality products, reliable service, and a dependable supply partner for your business.",
    accent: "#0757b8",
    accentSoft: "#eff6ff",
    currency: "INR",
    logo: {
      src: "/logo.png",
      alt: "AK Distributors logo",
    },
    address: "No 170/74, Haji Abdul Rahim Street, Perumbur, High Road, Jamalia, Chennai, Tamil Nadu 600012",
    mapCoordinates: "13.1070833,80.2491342",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=13.1070833%2C80.2491342",
    phone: "9841186905",
    heroImage: "",
  },
];

export function getTenantBySlug(slug: string) {
  return tenants.find((tenant) => tenant.slug === slug);
}
