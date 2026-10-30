import Link from "next/link";
import Image from "next/image";
import type { StorefrontTenant } from "@/lib/tenant-data";

type StorefrontBrandProps = {
  tenant: Pick<StorefrontTenant, "name" | "logo">;
};

export function StorefrontBrand({ tenant }: StorefrontBrandProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Link href="/" aria-label={`Go to ${tenant.name} home page`} className="shrink-0">
        <span className="block aspect-square w-24 overflow-hidden rounded-xl bg-white p-1">
          <Image
            src={tenant.logo.src}
            alt={tenant.logo.alt}
            width={1254}
            height={1254}
            className="h-full w-full object-contain"
          />
        </span>
      </Link>
    </div>
  );
}
