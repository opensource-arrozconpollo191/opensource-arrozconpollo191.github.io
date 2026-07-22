/* eslint-disable @next/next/no-img-element -- static export uses pre-generated responsive WebP variants. */
import Link from "next/link";
import type { ReactNode } from "react";
import { MobileMenu } from "@/components/mobile-menu";
import {
  type BookingKind,
  emailHref,
  siteAsset,
  siteConfig,
  siteImageSrcSet,
  telephoneHref,
  whatsappHref,
} from "@/lib/site";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/private-hire", label: "Private Hire" },
  { href: "/airport-transfers", label: "Airport Transfers" },
  { href: "/tours", label: "Bespoke Tours" },
  { href: "/contact", label: "Contact" },
];

const responsiveImages: Partial<
  Record<
    `/images/${string}.webp`,
    { widths: readonly number[]; width: number; height: number }
  >
> = {
  "/images/edinburgh-skyline.webp": {
    widths: [640, 1200, 2000],
    width: 2000,
    height: 2999,
  },
  "/images/edinburgh-landscape.webp": {
    widths: [640, 1200, 1800],
    width: 1800,
    height: 1200,
  },
  "/images/edinburgh-street.webp": {
    widths: [640, 1200, 1600],
    width: 1600,
    height: 2840,
  },
};

type WhatsAppLinkProps = {
  kind?: BookingKind;
  className?: string;
  children?: ReactNode;
  compact?: boolean;
};

export function WhatsAppLink({
  kind = "general",
  className = "button button--gold",
  children = "Message me on WhatsApp",
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
        <MobileMenu navigation={navigation} />
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
          <p className="footer-label">Contact</p>
          <a href={telephoneHref()}>Call {siteConfig.phoneDisplay}</a>
          <a href={emailHref()}>{siteConfig.email}</a>
          <a href={whatsappHref()} target="_blank" rel="noreferrer">
            Message on WhatsApp
          </a>
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
  image: `/images/${string}.webp`;
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
  const imageData = responsiveImages[image];

  return (
    <section className="page-hero">
      <div className="page-hero__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero__intro">{intro}</p>
        <div className="page-hero__actions" data-primary-booking-cta>
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
          src={siteAsset(image)}
          srcSet={
            imageData ? siteImageSrcSet(image, imageData.widths) : undefined
          }
          sizes="(max-width: 960px) 100vw, 46vw"
          alt={imageAlt}
          width={imageData?.width ?? 1600}
          height={imageData?.height ?? 1100}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      </div>
    </section>
  );
}
