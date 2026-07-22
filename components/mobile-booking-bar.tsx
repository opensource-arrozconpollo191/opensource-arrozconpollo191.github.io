"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { telephoneHref, whatsappHref } from "@/lib/site";

const MINIMUM_SCROLL = 80;

export function MobileBookingBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const primaryCta = document.querySelector<HTMLElement>(
      "[data-primary-booking-cta]",
    );
    let primaryCtaIsVisible = false;

    const updateBar = () => {
      setIsVisible(
        window.scrollY > MINIMUM_SCROLL && !primaryCtaIsVisible,
      );
    };

    if (primaryCta) {
      const bounds = primaryCta.getBoundingClientRect();
      primaryCtaIsVisible =
        bounds.bottom > 0 && bounds.top < window.innerHeight;
    }

    const observer = primaryCta
      ? new IntersectionObserver(([entry]) => {
          primaryCtaIsVisible = entry.isIntersecting;
          updateBar();
        })
      : null;

    if (primaryCta && observer) observer.observe(primaryCta);
    window.addEventListener("scroll", updateBar, { passive: true });
    updateBar();

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", updateBar);
      setIsVisible(false);
    };
  }, [pathname]);

  return (
    <nav
      className={`mobile-booking-bar${isVisible ? " is-visible" : ""}`}
      aria-label="Quick booking"
      aria-hidden={!isVisible}
    >
      <a
        className="mobile-booking-bar__call"
        href={telephoneHref()}
        tabIndex={isVisible ? undefined : -1}
      >
        Call Stevie
      </a>
      <a
        className="mobile-booking-bar__whatsapp"
        href={whatsappHref()}
        target="_blank"
        rel="noreferrer"
        tabIndex={isVisible ? undefined : -1}
      >
        WhatsApp
      </a>
    </nav>
  );
}
