import Link from "next/link";
import { tenants } from "@/lib/tenant-data";
import { StorefrontBrand } from "@/components/storefront-brand";
import { HeroImageGallery } from "@/components/hero-image-gallery";

export default function Home() {
  const tenant = tenants[0];

  return (
    <main className="min-h-screen bg-[#f4f8fc] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 md:py-20">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          <StorefrontBrand tenant={tenant} />
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm font-semibold text-slate-700 transition-colors hover:text-blue-700">
              Admin
            </Link>
            <Link
              href={`/${tenant.slug}`}
              className="rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/15 transition hover:brightness-95 sm:px-6 sm:py-3 sm:text-base"
              style={{ backgroundColor: tenant.accent }}
            >
              Open shop
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-xl shadow-blue-950/5">
          <HeroImageGallery
            tenantSlug={tenant.slug}
            tenantName={tenant.name}
            fallbackImage={tenant.heroImage}
            imageClassName="h-72 w-full object-cover md:h-96"
          />

          <div className="p-5 sm:p-7 md:p-10">
            <div className="max-w-3xl">
              <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
                {tenant.tagline}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{tenant.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[28px] border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5 sm:mt-14 sm:p-7">
          <h3 className="text-3xl font-bold text-slate-900">About us</h3>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
            AK Distributors has served homes, contractors, and businesses with durable materials,
            practical tools, and dependable service. From simple repairs to major projects, we help
            customers find the right solution with reliable quality and expert guidance.
          </p>

          <div className="mt-8 grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.2em]" style={{ color: tenant.accentGreen }}>Visit us</p>
              <p className="mt-2 text-lg font-semibold">{tenant.address}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em]" style={{ color: tenant.accentGreen }}>Call</p>
              <p className="mt-2 text-lg font-semibold">{tenant.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
