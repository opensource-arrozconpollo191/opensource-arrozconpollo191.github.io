import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta, PageHero } from "@/components/site-shell";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Private Hire in Edinburgh and Beyond",
  description:
    "Arrange pre-booked private hire across Edinburgh and longer journeys beyond the city directly with Stevie Craig.",
  path: "/private-hire",
});

export default function PrivateHirePage() {
  return (
    <>
      <PageHero
        eyebrow="Edinburgh private hire"
        title={<>Private hire in Edinburgh and beyond.</>}
        intro="Book local journeys, hotel and station pickups, airport runs and longer trips by WhatsApp."
        image="/images/edinburgh-street.webp"
        imageAlt="People walking along a historic Edinburgh street"
        kind="privateHire"
        imagePosition="center 58%"
      />

      <section className="editorial-section page-width">
        <div className="editorial-section__aside">
          <p className="eyebrow">Private hire</p>
        </div>
        <div className="editorial-section__content">
          <h2>Local trips and longer journeys.</h2>
          <div className="two-column-copy">
            <p className="lead">
              Book a pickup within Edinburgh or a longer journey beyond the
              city.
            </p>
            <p>
              Send the pickup, destination, date, time and number of passengers
              to check availability and get a quote.
            </p>
          </div>
        </div>
      </section>

      <section className="detail-list page-width">
        <div className="detail-list__intro">
          <p className="eyebrow">What to include</p>
          <h2>A few details make the first message useful.</h2>
        </div>
        <dl>
          <div>
            <dt>Pickup</dt>
            <dd>The address, hotel, station or agreed meeting point.</dd>
          </div>
          <div>
            <dt>Destination</dt>
            <dd>Where you are travelling to, including stops if needed.</dd>
          </div>
          <div>
            <dt>Timing</dt>
            <dd>Your preferred date and pickup time.</dd>
          </div>
          <div>
            <dt>Passengers</dt>
            <dd>The number travelling and any luggage details to discuss.</dd>
          </div>
        </dl>
      </section>

      <section className="related-link page-width">
        <p>Travelling to or from Edinburgh Airport?</p>
        <Link href="/airport-transfers">
          See airport transfers <span aria-hidden="true">→</span>
        </Link>
      </section>

      <FinalCta
        eyebrow="Private hire"
        title="Book your journey"
        body="Send the pickup, destination, date, time and passenger numbers on WhatsApp."
        kind="privateHire"
      />
    </>
  );
}
