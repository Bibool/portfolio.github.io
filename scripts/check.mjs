import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import assert from "node:assert/strict";

const root = fileURLToPath(new URL("../", import.meta.url));
const pages = ["index.html", "projects.html", "plugins.html", "voidstar.html"];
const html = new Map(
  await Promise.all(
    pages.map(async (name) => [
      name,
      await readFile(path.join(root, name), "utf8"),
    ]),
  ),
);
let links = 0;
for (const [name, content] of html) {
  assert.equal(
    (content.match(/<h1[ >]/g) || []).length,
    1,
    `${name}: exactly one h1`,
  );
  assert.equal(
    (content.match(/aria-current="page"/g) || []).length,
    1,
    `${name}: active navigation`,
  );
  assert.ok(
    content.includes('<meta name="viewport"'),
    `${name}: responsive viewport`,
  );
  assert.ok(
    !/wixsite|jquery|\{%|\{\{/.test(content),
    `${name}: no legacy dependencies or content`,
  );
  const ids = [...content.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${name}: unique IDs`);
  for (const image of content.matchAll(/<img\b[^>]*>/g))
    assert.ok(/\balt="[^"]*"/.test(image[0]), `${name}: image alt text`);
  for (const match of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const link = match[1];
    if (/^(https?:|mailto:)/.test(link)) continue;
    assert.ok(
      !link.startsWith("/"),
      `${name}: ${link} must be relative for GitHub project Pages`,
    );
    const [file, anchor] = link.split("#");
    const target = file || name;
    await access(path.join(root, target));
    if (anchor)
      assert.ok(
        html.get(target)?.includes(`id="${anchor}"`),
        `${name}: missing target ${link}`,
      );
    links++;
  }
}
await access(path.join(root, ".nojekyll"));
await access(path.join(root, "assets/images/social-preview.png"));
const projects = html.get("projects.html");
assert.equal((projects.match(/data-category="studio"/g) || []).length, 6);
assert.equal((projects.match(/data-category="personal"/g) || []).length, 1);
console.log(
  `Checked ${pages.length} pages and ${links} local links/assets: all valid.`,
);
