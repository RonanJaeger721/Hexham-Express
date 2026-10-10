import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/pages";
import { products } from "@/lib/data";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: products.find((p) => p.slug === slug)?.name || "Supply option",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!products.some((p) => p.slug === slug)) notFound();
  return <ProductDetail slug={slug} />;
}
