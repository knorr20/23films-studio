import type { Metadata } from "next";
import { TowerBlox404 } from "@/components/TowerBlox404";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <TowerBlox404 />;
}
