import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", "Edinburgh Private Hire &amp; Bespoke Tours", "Private hire across"],
  ["/private-hire", "Private Hire in Edinburgh and Beyond", "Private hire in Edinburgh"],
  ["/airport-transfers", "Edinburgh Airport Transfers", "Edinburgh Airport pickups"],
  ["/tours", "Bespoke Tours from Edinburgh", "Private tours from Edinburgh"],
  ["/contact", "Contact Stevie Craig", "Book by WhatsApp"],
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

for (const [pathname, title, heading] of routes) {
  test(`server-renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title}.*Stevie Craig<\\/title>`, "i"));
    assert.match(html, new RegExp(heading, "i"));
    assert.match(html, /<meta name="robots" content="noindex, nofollow, noarchive"/i);
    assert.match(html, /Message me/i);
    assert.match(html, /href="https:\/\/wa\.me\/447528862843\?text=/i);
    const whatsappHref = html.match(
      /href="(https:\/\/wa\.me\/447528862843\?text=[^"]+)"/i,
    )?.[1];
    assert.ok(whatsappHref);
    assert.equal(
      new URL(
        whatsappHref.replaceAll("&amp;", "&").replaceAll("&#x27;", "'"),
      ).searchParams.get("text"),
      "Hi Stevie, I'd like to book a taxi:",
    );
    assert.doesNotMatch(html, /WhatsApp number pending/i);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  });
}

test("preview blocks crawlers until launch details are supplied", async () => {
  const response = await render("/robots.txt");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Disallow: \/$/m);
});

test("home includes truthful service structured data", async () => {
  const response = await render("/");
  const html = await response.text();
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /TaxiService/);
  assert.match(html, /Edinburgh/);
  assert.doesNotMatch(html, /aggregateRating|priceRange|openingHours/i);
});
