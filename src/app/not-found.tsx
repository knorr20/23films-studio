import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-caption mb-4">404</p>
      <h1 className="font-display text-4xl text-display text-text">Not Found</h1>
      <Link href="/" className="mt-8 text-nav link-arrow text-text-muted">
        Back to home →
      </Link>
    </section>
  );
}
