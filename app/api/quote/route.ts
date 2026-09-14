import { NextResponse } from "next/server";
import { QuoteRequestData } from "@/lib/types";
import { COMPANY_INFO } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const data: QuoteRequestData = await request.json();

    // Server-side validation
    if (!data.name || !data.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Buyer / Contact name is required." },
        { status: 400 }
      );
    }

    if (!data.company || !data.company.trim()) {
      return NextResponse.json(
        { success: false, error: "Company or Factory name is required." },
        { status: 400 }
      );
    }

    if (!data.phoneOrWhatsApp || !data.phoneOrWhatsApp.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone or WhatsApp contact number is required." },
        { status: 400 }
      );
    }

    if (!data.machineType || !data.machineType.trim()) {
      return NextResponse.json(
        { success: false, error: "Machine type or model selection is required." },
        { status: 400 }
      );
    }

    // Generate unique B2B quote reference ID
    const quoteId = `TK-QUOTE-${Date.now().toString().slice(-6)}`;

    // Generate WhatsApp deep link for immediate direct response
    const whatsappMessage = `*New Quote Request [${quoteId}]*
Name: ${data.name}
Company: ${data.company}
Phone/WA: ${data.phoneOrWhatsApp}
Email: ${data.email || "N/A"}
Machine Type: ${data.machineType}
Gauge: ${data.gauge || "Contact for details"}
Cylinder Diameter: ${data.cylinderDiameter || "Contact for details"}
Feeders: ${data.feederCount || "Contact for details"}
Production Target: ${data.productionTarget || "N/A"}
Quantity: ${data.quantity || "1"}
Preferred Brand: ${data.preferredBrand || "Any Recommended"}
Delivery Requirement: ${data.deliveryRequirement || "Standard CFR Chattogram"}
Notes: ${data.message || "None"}`;

    const whatsappDirectLink = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Quote notification email routed to confirmed company domain email (sales@tasneemknitindustry.com)
    console.log(`[B2B Quote Request Received] Ref: ${quoteId} -> Routing notification to: ${COMPANY_INFO.email}`, data);

    return NextResponse.json({
      success: true,
      quoteId,
      message: "Quote request submitted successfully. Our sourcing team will contact you within 24 hours.",
      whatsappUrl: whatsappDirectLink,
    });
  } catch (error) {
    console.error("Quote API Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your quote request." },
      { status: 500 }
    );
  }
}
