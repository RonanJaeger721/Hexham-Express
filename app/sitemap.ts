import type { MetadataRoute } from "next";
import { products } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hexham-express.vercel.app";
  return [
    "/",
    "/bricks",
    "/logistics",
    "/about",
    "/contact",
    ...products.map((p) => `/bricks/${p.slug}`),
  ].map((path) => ({
    url: base + path,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
