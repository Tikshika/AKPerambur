import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTenantBySlug, tenants } from "@/lib/tenant-data";
import { StorefrontBrand } from "@/components/storefront-brand";
import { ProductCatalog } from "@/components/product-catalog";
import { HeroImageGallery } from "@/components/hero-image-gallery";
import { StorefrontCartButton, StorefrontCartProvider } from "@/components/storefront-cart";

type TenantPageProps = {
  params: Promise<{ tenant: string }>;
};

export function generateStaticParams() {
  return tenants.map((tenant) => ({ tenant: tenant.slug }));
}

export async function generateMetadata({ params }: TenantPageProps): Promise<Metadata> {
  const { tenant } = await params;
  const storefront = getTenantBySlug(tenant);

  if (!storefront) {
    return {};
  }

  return {
    title: storefront.name,
    description: storefront.description,
  };
}

export default async function TenantPage({ params }: TenantPageProps) {
  const { tenant } = await params;
  const storefront = getTenantBySlug(tenant);

  if (!storefront) {
    notFound();
  }

  return (
    <StorefrontCartProvider key={storefront.slug}>
    <main className="min-h-screen bg-[#f4f8fc] text-slate-900">
      <header
        className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <StorefrontBrand tenant={storefront} compact />
            <div className="min-w-0">
              <h1 className="text-lg font-bold leading-tight sm:text-2xl" style={{ color: storefront.accent }}>
                {storefront.name}
              </h1>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-slate-700 sm:justify-end">
            <Link className="py-1 transition-colors hover:text-blue-700" href={`/${storefront.slug}`}>Home</Link>
            <Link className="py-1 transition-colors hover:text-blue-700" href={`/${storefront.slug}#products`}>Products</Link>
            <Link className="py-1 transition-colors hover:text-blue-700" href={`/${storefront.slug}#about`}>About</Link>
            <Link className="py-1 transition-colors hover:text-blue-700" href={`/${storefront.slug}#find-us`}>Find us</Link>
            <Link className="py-1 transition-colors hover:text-blue-700" href="/admin">Admin</Link>
            <StorefrontCartButton
              accent={storefront.accent}
              currency={storefront.currency}
              tenantSlug={storefront.slug}
            />
          </nav>
        </div>
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${storefront.accentGreen}, ${storefront.accent}, ${storefront.accentGreen})` }}
        />
      </header>

      <section className="relative mx-auto mt-6 grid max-w-6xl gap-8 overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50 px-5 py-8 shadow-xl shadow-blue-950/5 sm:mt-8 sm:px-8 sm:py-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: storefront.accentGreen }}
        />
        <div className="relative min-w-0">
          <div className="mb-5 h-1.5 w-16 rounded-full" style={{ backgroundColor: storefront.accentGreen }} />
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            {storefront.tagline}
          </h2>
          <p className="mt-5 max-w-lg text-lg text-slate-700">{storefront.description}</p>
        </div>

        <div className="relative">
          <HeroImageGallery
            tenantSlug={storefront.slug}
            tenantName={storefront.name}
            fallbackImage={storefront.heroImage}
          />
        </div>
      </section>

      <ProductCatalog
        tenantSlug={storefront.slug}
        currency={storefront.currency}
        accent={storefront.accent}
        accentGreen={storefront.accentGreen}
        accentSoft={storefront.accentSoft}
      />

      <section id="about" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid min-w-0 gap-6 rounded-3xl border border-blue-100 bg-white p-5 shadow-md shadow-blue-950/5 sm:p-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: storefront.accentGreen }}>About</p>
          </div>
          <div className="text-slate-700 md:col-span-2">
            <p>
              {storefront.name} has served homes, contractors, and businesses with durable materials,
              practical tools, and dependable service. From simple repairs to major projects, we help
              customers find the right solution with reliable quality and expert guidance.
            </p>
            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="block font-semibold text-slate-900">Location</span>
                {storefront.address}
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="block font-semibold text-slate-900">Contact</span>
                {storefront.phone}
              </div>
            </div>
          </div>
        </div>
      </section>

      {storefront.address && (
        <section id="find-us" className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 sm:pb-10">
          <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-lg shadow-blue-950/5">
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: storefront.accentGreen }}>Find us</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">Visit {storefront.name}</h3>
                <p className="mt-2 max-w-2xl text-slate-600">{storefront.address}</p>
              </div>
              <a
                className="inline-flex shrink-0 items-center justify-center rounded-xl px-5 py-3 font-semibold text-white"
                style={{ backgroundColor: storefront.accent }}
                href={storefront.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on map
              </a>
            </div>
            <iframe
              className="h-48 w-full border-0 sm:h-64"
              title={`Map showing ${storefront.name} at ${storefront.address}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(storefront.mapCoordinates)}&z=17&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      )}
    </main>
    </StorefrontCartProvider>
  );
}
