import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the finished academy site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ko">/i);
  assert.match(html, /서울예대실용음악학원/);
  assert.match(html, /좋아하는 음악이/);
  assert.match(html, /배우고 싶은 음악을 골라보세요/);
  assert.match(html, /tel:050714081515/);
  assert.match(html, /\/images\/hero-studio\.webp/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps optimized media and removes the disposable starter", async () => {
  const [packageJson, hero, song] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    stat(new URL("../public/images/hero-studio.webp", import.meta.url)),
    stat(new URL("../public/audio/academy-song-01.mp3", import.meta.url)),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.ok(hero.size < 250_000, `hero image is ${hero.size} bytes`);
  assert.ok(song.size > 1_000_000, "promo audio should be present");
  await assert.rejects(access(new URL("../app/_sites-preview", templateRoot)));
});
