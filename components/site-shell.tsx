import Link from "next/link";
import type { ReactNode } from "react";
import {
  type BookingKind,
  siteConfig,
  whatsappHref,
} from "@/lib/site";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/private-hire", label: "Private Hire" },
  { href: "/airport-transfers", label: "Airport Transfers" },
  { href: "/tours", label: "Bespoke Tours" },
  { href: "/contact", label: "Contact" },
];

type WhatsAppLinkProps = {
  kind?: BookingKind;
  className?: string;
  children?: ReactNode;
  compact?: boolean;
};

export function WhatsAppLink({
  kind = "general",
  className = "button button--gold",
  children = "Message Stevie on WhatsApp",
  compact = false,
}: WhatsAppLinkProps) {
  const external = siteConfig.whatsappReady;

  return (
    <Link
      href={whatsappHref(kind)}
      className={`${className}${compact ? " button--compact" : ""}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={
        external
          ? `${String(children)} (opens WhatsApp in a new tab)`
          : `${String(children)} — WhatsApp number pending`
      }
    >
      <span>{children}</span>
    </Link>
  );
}

function Brand() {
  return (
    <Link href="/" className="brand" aria-label={`${siteConfig.name}, home`}>
      <span className="brand__name">Stevie Craig</span>
      <span className="brand__descriptor">Private Hires &amp; Tours</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <WhatsAppLink className="header-booking" compact>
          WhatsApp
        </WhatsAppLink>
        <details className="mobile-menu">
          <summary>
            <span>Menu</span>
            <span className="menu-lines" aria-hidden="true" />
          </summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <WhatsAppLink compact>WhatsApp booking</WhatsAppLink>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top page-width">
        <div>
          <Brand />
          <p>
            Private hire across Edinburgh and beyond, including airport
            transfers, longer journeys and bespoke tours.
          </p>
        </div>
        <div className="footer-nav">
          <p className="footer-label">Explore</p>
          {navigation.slice(1).map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          <p className="footer-label">Book by WhatsApp</p>
          <WhatsAppLink compact>Message Stevie</WhatsAppLink>
          {!siteConfig.whatsappReady && (
            <p className="pending-note">
              <span aria-hidden="true" /> WhatsApp number pending
            </p>
          )}
        </div>
      </div>
      <div className="site-footer__bottom page-width">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <p>Edinburgh photography used under the Unsplash License.</p>
      </div>
    </footer>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
  kind?: BookingKind;
  imagePosition?: string;
};

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  kind = "general",
  imagePosition,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero__intro">{intro}</p>
        <div className="page-hero__actions">
          <WhatsAppLink kind={kind} />
          {!siteConfig.whatsappReady && (
            <p className="pending-note pending-note--light">
              <span aria-hidden="true" /> WhatsApp number pending
            </p>
          )}
        </div>
      </div>
      <div className="page-hero__image">
        <img
          src={image}
          alt={imageAlt}
          width="1600"
          height="1100"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      </div>
    </section>
  );
}

type FinalCtaProps = {
  eyebrow?: string;
  title: string;
  body: string;
  kind?: BookingKind;
};

export function FinalCta({
  eyebrow = "Start with a message",
  title,
  body,
  kind = "general",
}: FinalCtaProps) {
  return (
    <section className="final-cta">
      <div className="page-width final-cta__inner">
        <div>
          <p className="eyebrow eyebrow--gold">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{body}</p>
          <WhatsAppLink kind={kind} />
          {!siteConfig.whatsappReady && (
            <p className="pending-note pending-note--light">
              <span aria-hidden="true" /> WhatsApp number pending
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function MobileBookingBar() {
  return (
    <div className="mobile-booking-bar">
      <WhatsAppLink compact>
        {siteConfig.whatsappReady ? "Message Stevie" : "WhatsApp pending"}
      </WhatsAppLink>
    </div>
  );
}
