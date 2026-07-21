import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta, PageHero } from "@/components/site-shell";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Edinburgh Airport Transfers",
  description:
    "Arrange an Edinburgh Airport pickup or drop-off directly with Stevie Craig, with your journey details agreed in advance.",
  path: "/airport-transfers",
});

export default function AirportTransfersPage() {
  return (
    <>
      <PageHero
        eyebrow="Edinburgh Airport transfers"
        title={<>Edinburgh Airport pickups and drop-offs.</>}
        intro="Book a transfer to or from Edinburgh Airport by WhatsApp."
        image="/images/edinburgh-skyline.webp"
        imageAlt="Edinburgh skyline seen across the city"
        kind="airport"
        imagePosition="62% center"
      />

      <section className="editorial-section page-width">
        <div className="editorial-section__aside">
          <p className="eyebrow">Airport transfers</p>
        </div>
        <div className="editorial-section__content">
          <h2>Book your airport transfer in advance.</h2>
          <div className="two-column-copy">
            <p className="lead">
              Send whether you need a pickup or drop-off, along with the date,
              time and address at the other end.
            </p>
            <p>
              For an arrival, include the flight number and scheduled landing
              time. Stevie will reply with availability and pickup details.
            </p>
          </div>
        </div>
      </section>

      <section className="simple-points page-width">
        <h2>What to send</h2>
        <ul>
          <li>Pickup or drop-off</li>
          <li>Date and preferred time</li>
          <li>Flight number for arrivals</li>
          <li>Passenger and luggage details</li>
        </ul>
      </section>

      <section className="related-link page-width">
        <p>Need a journey elsewhere in Edinburgh?</p>
        <Link href="/private-hire">
          See private hire <span aria-hidden="true">→</span>
        </Link>
      </section>

      <FinalCta
        eyebrow="Airport transfers"
        title="Book by WhatsApp"
        body="Send your date, time, flight number, address and passenger numbers."
        kind="airport"
      />
    </>
  );
}
