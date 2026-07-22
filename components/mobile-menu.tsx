"use client";

import Link from "next/link";
import { useRef } from "react";

type NavigationItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  navigation: NavigationItem[];
};

export function MobileMenu({ navigation }: MobileMenuProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  }

  return (
    <details className="mobile-menu" ref={menuRef}>
      <summary>
        <span>Menu</span>
        <span className="menu-lines" aria-hidden="true" />
      </summary>
      <nav aria-label="Mobile navigation">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
