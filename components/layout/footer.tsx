import { Container } from "@/components/shared/container";
import type { ContactInfo, FooterConfig, SiteSettings, SocialLinks } from "@/types/site-data";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/shared/tracked-link";

interface FooterProps {
  site: SiteSettings;
  contact: ContactInfo;
  social: SocialLinks;
  footer: FooterConfig;
}

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Footer({ site, contact, social, footer }: FooterProps) {
  return (
    <footer className="bg-foreground text-background" aria-label="Site footer">
      <div className="border-t border-background/10">
        <Container className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="relative h-10 w-10 shrink-0">
                  <Image
                    src={site.logo}
                    alt={site.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-bold text-sm text-background">{site.name}</p>
                  <p className="text-xs text-background/60">{site.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-background/70 leading-relaxed">
                {footer.description}
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3 pt-1">
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-background/60 hover:text-primary transition-colors"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                )}
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-background/60 hover:text-primary transition-colors"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                )}
                <a
                  href={contact.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Messenger"
                  className="text-background/60 hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Footer link columns */}
            {footer.sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-background/90">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-background/60 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-background/90">
                Customer Care
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-start gap-2.5 text-sm text-background/60 hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-2.5 text-sm text-background/60 hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-background/60">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden />
                  {contact.address}
                </li>
                <li className="text-xs text-background/50 pt-1">
                  {contact.businessHours}
                </li>
              </ul>
              {/* WhatsApp CTA */}
              <TrackedLink
                trackType="whatsapp"
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp Order
              </TrackedLink>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-background/10 bg-black/20">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4 text-xs text-background/40">
          <p>{footer.copyrightText}</p>
          <div className="flex items-center gap-4">
            <Link href="/delivery" className="hover:text-background/70 transition-colors">
              Delivery Info
            </Link>
            <Link href="/about" className="hover:text-background/70 transition-colors">
              About Us
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
