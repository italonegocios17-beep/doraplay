export function seo(title: string, description: string, noindex = false) {
  const t = `${title} · DoraPlay`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
    ],
  };
}
