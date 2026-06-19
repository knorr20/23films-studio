import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

const footerNav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const footerSocial = [
  { href: siteConfig.social.instagram, label: "Instagram" },
  { href: siteConfig.social.telegram, label: "Telegram" },
  { href: siteConfig.social.whatsapp, label: "WhatsApp" },
];

export function Footer() {
  const location = `${siteConfig.address.city}, ${siteConfig.address.region}`;

  return (
    <footer className="border-t border-border bg-bg">
      <div className="max-content section-padding !pb-12 !pt-16 md:!py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label={`${siteConfig.name} home`}>
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={120}
                height={34}
                className="h-8 w-auto opacity-90"
              />
            </Link>
            <p className="text-caption mt-6">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              {siteConfig.footerNote}
            </p>
            <p className="text-caption mt-6">{location}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
            <div>
              <p className="text-caption mb-5">Explore</p>
              <ul className="space-y-3">
                {footerNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-nav text-text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-caption mb-5">Contact</p>
              <ul className="space-y-3 text-sm text-text-muted">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition-colors hover:text-text"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                {siteConfig.phones.map((phone, i) => (
                  <li key={phone}>
                    <a
                      href={`tel:${siteConfig.phoneLinks[i]}`}
                      className="transition-colors hover:text-text"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="text-nav inline-flex text-text transition-opacity hover:opacity-70"
                  >
                    Start a Project →
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-caption mb-5">Studio</p>
              <ul className="space-y-3 text-sm text-text-muted">
                <li>
                  <a
                    href={siteConfig.studioRentalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nav inline-flex transition-colors hover:text-text"
                  >
                    Studio Rental →
                  </a>
                </li>
                <li className="leading-relaxed">
                  Production space in North Hollywood for shoots and rental.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[13px] text-text-subtle">
              © {new Date().getFullYear()} {siteConfig.legalName}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {footerSocial.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nav text-text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
