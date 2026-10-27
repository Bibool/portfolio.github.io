import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
};
const server = http.createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(
      new URL(request.url, `http://localhost:${port}`).pathname,
    );
    if (pathname.startsWith("/portfolio.github.io/"))
      pathname = pathname.slice("/portfolio.github.io".length);
    if (pathname.endsWith("/")) pathname += "index.html";
    const file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(root) || !(await stat(file)).isFile())
      throw new Error("Not found");
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Local: http://127.0.0.1:${port}/portfolio.github.io/`),
);
