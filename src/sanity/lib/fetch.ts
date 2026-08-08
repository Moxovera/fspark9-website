import "server-only";

import type { QueryParams } from "next-sanity";

import { client } from "@/sanity/lib/client";

const DEFAULT_REVALIDATE_SECONDS = 60;

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = DEFAULT_REVALIDATE_SECONDS,
  tags,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate, tags },
  });
}
