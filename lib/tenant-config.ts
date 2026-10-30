import "server-only";

import { getTenantBySlug } from "@/lib/tenant-data";

export function getTenantDatabaseId(slug: string): number | undefined {
  if (!getTenantBySlug(slug)) return undefined;

  const variableName = "STORE_TENANT_ID";
  const configuredId = process.env[variableName];
  if (!configuredId || !/^[1-9]\d*$/.test(configuredId)) {
    throw new Error(`${variableName} must be set to a positive integer.`);
  }

  const tenantId = Number(configuredId);
  if (!Number.isSafeInteger(tenantId)) {
    throw new Error(`${variableName} must be a safe positive integer.`);
  }

  return tenantId;
}
