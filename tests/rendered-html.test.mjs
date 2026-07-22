import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  [
    "/",
    "Edinburgh Private Hire &amp; Airport Transfers | Stevie Craig",
    "Private hire across",
    "Hi Stevie, I'd like to arrange a journey.",
  ],
  [
    "/private-hire",
    "Private Hire in Edinburgh and Beyond | Stevie Craig",
    "Private hire in Edinburgh",
    "Hi Stevie, I'd like to arrange private hire.",
  ],
  [
    "/airport-transfers",
    "Edinburgh Airport Transfers | Stevie Craig",
    "Edinburgh Airport pickups",
    "Hi Stevie, I'd like to arrange an airport transfer.",
  ],
  [
    "/tours",
    "Bespoke Tours from Edinburgh | Stevie Craig",
    "Private tours from Edinburgh",
    "Hi Stevie, I'd like to discuss a private tour.",
  ],
  [
    "/contact",
    "Contact &amp; Book | Stevie Craig",
    "Contact Stevie",
    "Hi Stevie, I'd like to arrange a journey.",
  ],
];

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);

async function render(pathname) {
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

for (const [pathname, title, heading, bookingMessage] of routes) {
  test(`server-renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    assert.ok(html.includes(`<title>${title}</title>`));
    assert.match(html, new RegExp(heading, "i"));
    assert.match(html, /<meta name="robots" content="index, follow"/i);
    assert.doesNotMatch(html, /noindex|nofollow|preview\.steviecraig\.example/i);
    const canonicalPath = pathname === "/" ? "/" : `${pathname}/`;
    assert.match(
      html,
      new RegExp(
        `<link rel="canonical" href="https://shctransfers-toursedinburgh\\.com${canonicalPath}"`,
        "i",
      ),
    );
    assert.match(html, /Message me/i);
    assert.match(html, /href="tel:\+447528862843"/i);
    assert.match(html, /stevenjamescraig39@gmail\.com/i);
    assert.match(html, /href="https:\/\/wa\.me\/447528862843\?text=/i);
    const whatsappHref = html.match(
      /href="(https:\/\/wa\.me\/447528862843\?text=[^"]+)"/i,
    )?.[1];
    assert.ok(whatsappHref);
    assert.equal(
      new URL(
        whatsappHref.replaceAll("&amp;", "&").replaceAll("&#x27;", "'"),
      ).searchParams.get("text")?.startsWith(bookingMessage),
      true,
    );
    assert.doesNotMatch(html, /WhatsApp number pending/i);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  });
}

test("production robots allow crawling and advertise the sitemap", async () => {
  const response = await render("/robots.txt");
  assert.equal(response.status, 200);
  const text = await response.text();
  assert.match(text, /Allow: \/$/m);
  assert.doesNotMatch(text, /Disallow: \/$/m);
  assert.match(
    text,
    /Sitemap: https:\/\/shctransfers-toursedinburgh\.com\/sitemap\.xml/i,
  );
});

test("sitemap contains every canonical public route", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();

  for (const [pathname] of routes) {
    const canonicalPath = pathname === "/" ? "/" : `${pathname}/`;
    assert.match(
      xml,
      new RegExp(
        `https://shctransfers-toursedinburgh\\.com${canonicalPath}`,
        "i",
      ),
    );
  }
});

test("home includes truthful service structured data", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /TaxiService/);
  assert.match(html, /FAQPage/);
  assert.match(html, /Edinburgh/);
  assert.match(html, /stevenjamescraig39@gmail\\u002ecom|stevenjamescraig39@gmail\.com/i);
  assert.doesNotMatch(html, /aggregateRating|priceRange|openingHours/i);
});
