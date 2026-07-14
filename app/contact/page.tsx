import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { getContactInfo, getSiteSettings } from "@/lib/data";
import { Phone, Mail, MapPin, MessageCircle, ExternalLink, Clock } from "lucide-react";
import { TrackedLink } from "@/components/shared/tracked-link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact The Outfit Spot via WhatsApp, Messenger, or email. We respond quickly to all enquiries.",
};

export default function ContactPage() {
  const contact = getContactInfo();
  const site = getSiteSettings();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-gradient py-12 text-white text-center">
        <Container>
          <h1 className="text-3xl font-extrabold mb-2">Contact Us</h1>
          <p className="text-white/80 text-sm max-w-sm mx-auto">
            We&apos;re here to help! Reach us via WhatsApp or Messenger for the fastest response.
          </p>
        </Container>
      </div>

      <Container className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order channels */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Order Now</h2>
            <TrackedLink
              trackType="whatsapp"
              href={`https://wa.me/${contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-page-whatsapp"
              className="flex items-center gap-4 p-5 rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <MessageCircle className="h-6 w-6 text-white" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-sm text-green-700 dark:text-green-400">WhatsApp</p>
                <p className="text-sm text-muted-foreground">Fastest way to order — {contact.phone}</p>
              </div>
            </TrackedLink>
            <TrackedLink
              trackType="messenger"
              href={contact.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-page-messenger"
              className="flex items-center gap-4 p-5 rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <ExternalLink className="h-6 w-6 text-white" aria-hidden />
              </div>
              <div>
                <p className="font-semibold text-sm text-blue-700 dark:text-blue-400">Facebook Messenger</p>
                <p className="text-sm text-muted-foreground">Message us on Facebook</p>
              </div>
            </TrackedLink>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Contact Details</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href={`tel:${contact.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{contact.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-muted-foreground">{contact.businessHours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
