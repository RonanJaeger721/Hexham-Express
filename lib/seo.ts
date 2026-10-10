import type { Metadata } from "next";
export function pageMetadata(
  title: string,
  path: string,
  description: string,
): Metadata {
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: `https://hexham-express.vercel.app${path}` },
    openGraph: {
      title: `${title} | Hexham Bricks`,
      description,
      url: `https://hexham-express.vercel.app${path}`,
      type: "website",
      images: [
        {
          url: "https://hexham-express.vercel.app/media/loaded-truck.webp",
          width: 1280,
          height: 720,
          alt: "Hexham truck loaded with building bricks",
        },
      ],
    },
  };
}
