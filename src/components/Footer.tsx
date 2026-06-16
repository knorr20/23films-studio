import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-8 text-[13px] text-text-muted md:flex-row md:items-center md:justify-between md:px-12">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}</p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-6">
          {siteConfig.phones.map((phone, i) => (
            <a
              key={phone}
              href={`tel:${siteConfig.phoneLinks[i]}`}
              className="transition-opacity hover:opacity-70"
            >
              {phone}
            </a>
          ))}
          <a
            href={siteConfig.studioRentalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
          >
            Studio Rental →
          </a>
        </div>
      </div>
    </footer>
  );
}
