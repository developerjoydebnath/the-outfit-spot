import { MessageCircle, ExternalLink } from "lucide-react";
import { Container } from "@/components/shared/container";
import type { ContactInfo } from "@/types/site-data";

interface ContactCtaSectionProps {
  contact: ContactInfo;
}

export function ContactCtaSection({ contact }: ContactCtaSectionProps) {
  return (
    <section className="py-10 md:py-14 bg-foreground text-background" aria-labelledby="contact-cta-heading">
      <Container className="text-center">
        <h2 id="contact-cta-heading" className="text-2xl font-bold text-background sm:text-3xl mb-2">
          Ready to Order Your Jersey?
        </h2>
        <p className="text-background/70 max-w-md mx-auto text-sm mb-8">
          Contact us via WhatsApp or Messenger — we respond quickly and help you choose the right size and jersey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg bg-green-500 px-6 py-3 text-sm font-bold text-white hover:bg-green-600 transition-colors shadow-lg w-full sm:w-auto justify-center"
            id="contact-whatsapp-cta"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Order via WhatsApp
          </a>
          <a
            href={contact.messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-lg w-full sm:w-auto justify-center"
            id="contact-messenger-cta"
          >
            <ExternalLink className="h-5 w-5" aria-hidden />
            Message on Facebook
          </a>
        </div>

        <p className="mt-6 text-xs text-background/50">
          {contact.businessHours} · {contact.address}
        </p>
      </Container>
    </section>
  );
}
