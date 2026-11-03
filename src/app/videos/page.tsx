import type { Metadata } from "next";
import { VideoGallery } from "@/components/VideoGallery";

export const metadata: Metadata = {
  title: "Videos",
  description: "A few short, silly videos made just for fun.",
};

export default function VideosPage() {
  return <VideoGallery />;
}
