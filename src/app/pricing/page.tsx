import type { Metadata } from "next";
import { PricingContent } from "@/components/PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Wash and dry prices by machine size, and laundry supplies available in store.",
};

export default function PricingPage() {
  return <PricingContent />;
}
