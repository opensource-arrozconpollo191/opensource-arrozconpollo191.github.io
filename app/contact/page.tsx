import type { Metadata } from "next";
import { WhatsAppLink } from "@/components/site-shell";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Stevie Craig",
  description:
    "Message Stevie Craig directly on WhatsApp to discuss Edinburgh private hire, airport transfers, longer journeys or a bespoke tour.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="contact-page page-width">
      <div className="contact-page__intro">
        <p className="eyebrow">Contact Stevie</p>
        <h1>Book by WhatsApp.</h1>
        <p>
          Send the journey details to check availability, get a quote and book
          with Stevie.
        </p>
      </div>

      <div className="contact-page__grid">
        <div className="contact-booking" id="booking-pending">
          <p className="eyebrow eyebrow--gold">WhatsApp booking</p>
          <h2>
            {siteConfig.whatsappReady
              ? "Ready when you are."
              : "Number awaiting confirmation."}
          </h2>
          <p>
            {siteConfig.whatsappReady
              ? "Use the button below to open a pre-filled message to Stevie. Add your journey details before sending."
              : "The site is currently a private preview. Stevie’s real WhatsApp number will be added here before the public launch."}
          </p>
          <WhatsAppLink />
          {!siteConfig.whatsappReady && (
            <p className="pending-note pending-note--light">
              <span aria-hidden="true" /> WhatsApp number pending
            </p>
          )}
        </div>

        <div className="booking-checklist">
          <h2>Include in your message</h2>
          <ul>
            <li>
              <p>What you are arranging: private hire, an airport transfer or a tour</p>
            </li>
            <li>
              <p>Your pickup point and destination, or tour idea</p>
            </li>
            <li>
              <p>Your preferred date and time</p>
            </li>
            <li>
              <p>The number of passengers and relevant luggage details</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
