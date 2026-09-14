export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does Tasneem Knit Industry source industrial knitting machines?",
    answer:
      "We source directly from established circular knitting machinery manufacturers in China and Taiwan. By eliminating intermediary trading companies, we secure factory-direct pricing, custom cylinder/gauge configurations, and genuine factory spare parts for our Bangladeshi textile clients.",
    category: "Sourcing & Import",
  },
  {
    question: "What does the CFR Chattogram shipping process include?",
    answer:
      "Under CFR (Cost and Freight) Chattogram terms, the machine purchase price covers export packaging, domestic factory transport overseas, export customs clearance, and ocean freight shipping directly to Chattogram Port. We provide all commercial invoices, packing lists, and bills of lading for smooth import processing through Bangladeshi customs.",
    category: "Shipping & Logistics",
  },
  {
    question: "Is third-party pre-shipment inspection provided?",
    answer:
      "Yes. Prior to container loading at the manufacturer's facility, we can arrange third-party pre-shipment inspection through internationally recognized agencies such as SGS, Intertek (ITS), or Bureau Veritas (BV) to verify machine specifications, component integrity, and test run results.",
    category: "Inspection & Quality",
  },
  {
    question: "Do you offer installation and on-site commissioning in Bangladesh?",
    answer:
      "Yes. Our experienced machinery technicians assist with on-site leveling, assembly, yarn creel setup, oil mist calibration, and trial fabric knitting at your factory premises in Narayanganj, Gazipur, Savar, or anywhere across Bangladesh.",
    category: "Installation & Services",
  },
  {
    question: "Can I order custom gauge, cylinder diameter, and feeder counts?",
    answer:
      "Absolutely. Industrial circular knitting machines are customized according to your mill's target GSM, fabric width, and yarn counts. Submit a quote request with your desired gauge (e.g. 24G, 28G, 32G), cylinder diameter (e.g. 30\", 34\"), and feeder specifications, and we will configure the optimal machinery model.",
    category: "Specifications & Ordering",
  },
  {
    question: "What payment and L/C terms are accepted?",
    answer:
      "We facilitate standard commercial documentary Letters of Credit (L/C) through major commercial banks in Bangladesh, ensuring full transparency and adherence to Bangladesh Bank import regulations. Contact our sales team for exact proforma invoice terms.",
    category: "Payment & Commercial",
  },
  {
    question: "Are spare parts and maintenance available after commissioning?",
    answer:
      "Yes. We support our client mills with essential spare parts including Groz-Beckert/compatible knitting needles, sinkers, positive yarn feeders, central lubrication units, and electronic inverter drives, along with scheduled technician maintenance support.",
    category: "After-Sales Support",
  },
];
