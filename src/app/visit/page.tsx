import type { Metadata } from "next";
import { VisitContent } from "@/components/VisitContent";

export const metadata: Metadata = {
  title: "Hours & Location",
  description: "Opening hours, attended hours, address, and directions to the laundromat.",
};

export default function VisitPage() {
  return <VisitContent />;
}
