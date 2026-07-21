import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta, PageHero } from "@/components/site-shell";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Bespoke Tours from Edinburgh",
  description:
    "Discuss a bespoke Edinburgh or Scotland tour with Stevie Craig, shaped around your interests, timing and preferred pace.",
  path: "/tours",
});

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Bespoke tours from Edinburgh"
        title={<>Private tours from Edinburgh.</>}
        intro="Tell Stevie what you would like to see, where you are starting and how much time you have."
        image="/images/edinburgh-landscape.webp"
        imageAlt="The Edinburgh skyline viewed from Arthur’s Seat at sunset"
        kind="tour"
        imagePosition="center 52%"
      />

      <section className="editorial-section page-width">
        <div className="editorial-section__aside">
          <p className="eyebrow">Private tours</p>
        </div>
        <div className="editorial-section__content">
          <h2>A flexible day out.</h2>
          <div className="two-column-copy">
            <p className="lead">
              Tours are based on the places you want to see and the time you
              have available.
            </p>
            <p>
              Send your interests, starting point and preferred date on
              WhatsApp. Stevie will reply with what is possible.
            </p>
          </div>
        </div>
      </section>

      <section className="simple-points page-width">
        <h2>What to send</h2>
        <ul>
          <li>The places or subjects that interest you</li>
          <li>Where you would like to start and finish</li>
          <li>Your preferred date and available time</li>
          <li>The number of passengers</li>
        </ul>
      </section>

      <section className="related-link page-width">
        <p>Looking for straightforward transport instead?</p>
        <Link href="/private-hire">
          See private hire <span aria-hidden="true">→</span>
        </Link>
      </section>

      <FinalCta
        eyebrow="Private tours"
        title="Ask about a tour"
        body="Send your preferred date, starting point, interests and passenger numbers."
        kind="tour"
      />
    </>
  );
}
