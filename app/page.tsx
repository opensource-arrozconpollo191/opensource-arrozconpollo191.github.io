import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppLink } from "@/components/site-shell";
import {
  pageMetadata,
  siteAsset,
  siteConfig,
  structuredData,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Edinburgh Private Hire & Bespoke Tours",
  description:
    "Book Edinburgh private hire, airport transfers, longer journeys and bespoke tours with Stevie Craig by WhatsApp.",
  path: "/",
});

const services = [
  {
    title: "Private hire",
    text: "Private hire for journeys across Edinburgh and longer trips beyond the city.",
    href: "/private-hire",
  },
  {
    title: "Airport transfers",
    text: "Edinburgh Airport pickups and drop-offs with the details agreed directly before you travel.",
    href: "/airport-transfers",
  },
  {
    title: "Bespoke tours",
    text: "A day shaped around your interests, your pace and the places you would like to see.",
    href: "/tours",
  },
];

const faqs = [
  {
    question: "How do I book a journey?",
    answer:
      "Message me on WhatsApp with your pickup point, destination, preferred date and time, and number of passengers. I’ll reply with availability and a quote.",
  },
  {
    question: "Can I arrange travel beyond Edinburgh?",
    answer:
      "Yes. The service is based in Edinburgh and longer journeys beyond the city can be discussed and arranged in advance.",
  },
  {
    question: "Are tours based on a fixed itinerary?",
    answer:
      "No fixed itinerary is advertised. Bespoke tours are discussed around the places, interests, pace and time that suit you.",
  },
  {
    question: "Can I arrange an Edinburgh Airport transfer?",
    answer:
      "Yes. Share whether you need a pickup or drop-off, along with your travel date, time, flight details and passenger numbers.",
  },
];

export default function Home() {
  const schema = structuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      <section className="home-hero">
        <img
          className="home-hero__image"
          src={siteAsset("/images/edinburgh-skyline.webp")}
          alt="Edinburgh skyline with the Balmoral clock tower and Edinburgh Castle"
          width="2000"
          height="1328"
          fetchPriority="high"
        />
        <div className="home-hero__shade" />
        <div className="home-hero__content page-width">
          <p className="eyebrow eyebrow--gold">
            Edinburgh · Airport transfers · Tours
          </p>
          <h1>
            Private hire across
            <br /> Edinburgh and beyond.
          </h1>
          <p className="home-hero__intro">
            Local journeys, Edinburgh Airport transfers, longer-distance
            travel and bespoke tours. Message me on WhatsApp to book.
          </p>
          <div className="hero-actions">
            <WhatsAppLink />
            <Link href="#services" className="text-link text-link--light">
              Explore services <span aria-hidden="true">↓</span>
            </Link>
          </div>
          {!siteConfig.whatsappReady && (
            <p className="pending-note pending-note--light">
              <span aria-hidden="true" /> WhatsApp number pending
            </p>
          )}
        </div>
      </section>

      <section className="intro-section page-width" id="services">
        <div className="intro-section__heading">
          <h2>Taxi and private hire services.</h2>
        </div>
        <div className="intro-section__copy">
          <p className="lead">
            Local journeys, Edinburgh Airport transfers, longer trips and
            private tours.
          </p>
          <p>
            Message your pickup, destination, date and passenger numbers on
            WhatsApp to check availability and get a quote.
          </p>
        </div>
      </section>

      <section className="service-index page-width" aria-label="Services">
        {services.map((service) => (
          <Link href={service.href} className="service-row" key={service.href}>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <span className="service-row__link">Read more</span>
          </Link>
        ))}
      </section>

      <section className="faq-section page-width">
        <div className="faq-section__heading">
          <h2>Common questions.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

    </>
  );
}
