import { search } from "@/lib/search-index";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim().slice(0, 200) ?? "";
  const { results, total } = search(q, 8);
  return Response.json({
    total,
    results: results.map(({ kind, title, trail, href, snippet, external }) => ({
      kind,
      title,
      trail,
      href,
      snippet,
      external: !!external,
    })),
  });
}
