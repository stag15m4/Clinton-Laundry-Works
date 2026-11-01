import type { Metadata } from "next";
import { RefundContent } from "@/components/RefundContent";

export const metadata: Metadata = {
  title: "Request a Refund",
  description: "Request a refund or reimbursement for a machine that didn't work.",
  robots: { index: false, follow: true },
};

export default function RefundPage() {
  return <RefundContent />;
}
