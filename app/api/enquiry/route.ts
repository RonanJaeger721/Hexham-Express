import { NextResponse } from "next/server";
import { whatsapp } from "@/lib/data";
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const fields = [
      "name",
      "company",
      "phone",
      "email",
      "location",
      "requirement",
      "quantity",
      "transport",
      "message",
    ];
    if (
      !data ||
      typeof data !== "object" ||
      fields.some(
        (k) =>
          data[k] !== undefined &&
          (typeof data[k] !== "string" || data[k].length > 2000),
      )
    )
      return NextResponse.json(
        { error: "Please check your enquiry details." },
        { status: 400 },
      );
    if (
      ["name", "phone", "location", "requirement"].some((k) => !data[k]?.trim())
    )
      return NextResponse.json(
        {
          error:
            "Please complete your name, phone, location and brick requirement.",
        },
        { status: 400 },
      );
    const message = [
      "Hello Hexham Bricks,",
      "I'd like to request a quote for my project.",
      "",
      ...fields
        .filter((k) => data[k]?.trim())
        .map((k) => `${k[0].toUpperCase() + k.slice(1)}: ${data[k].trim()}`),
    ].join("\n");
    return NextResponse.json({
      whatsappUrl: whatsapp(message),
      delivery: "customer-sends-via-whatsapp",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to prepare the enquiry. Please try again." },
      { status: 400 },
    );
  }
}
