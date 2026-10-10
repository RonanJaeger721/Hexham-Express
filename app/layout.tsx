import type { Metadata } from "next";
import "./globals.css";
import "./experience.css";
import { Shell } from "@/components/site";
export const metadata: Metadata = {
  title: {
    default: "Hexham Bricks | Brick Supply & Project Logistics Zimbabwe",
    template: "%s | Hexham Bricks",
  },
  description:
    "Hexham Bricks supplies bricks for construction projects in Zimbabwe, with bulk order and logistics enquiries available. Call 0788 828 681.",
  icons: { icon: "/favicon.png" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
