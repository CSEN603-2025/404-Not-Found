#!/usr/bin/env node
/**
 * Simple TS→JS/TSX→JSX converter v2
 * Usage:
 *   node convert-tsx-to-js.js
 */

const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

// files to convert
const patterns = ["**/*.ts", "**/*.tsx"];
// ignore these
const ignore = ["**/*.d.ts", "node_modules/**", ".next/**"];

(async () => {
  for (const pattern of patterns) {
    try {
      const files = await glob(pattern, { ignore });
      for (const file of files) {
        const ext = path.extname(file);
        const targetExt = ext === ".ts" ? ".js" : ".jsx";
        const target = file.replace(ext, targetExt);

        let src = fs.readFileSync(file, "utf8");

        // 1) strip `import type { ... } from ...`
        src = src.replace(
          /\bimport\s+{\s*type\s+([^}]+)\s*}\s+from/g,
          "import { $1 } from"
        );

        // 2) remove explicit type annotations like `: Foo`
        src = src.replace(/:\s*[A-Za-z0-9_\[\]\|\<\>]+\s*(?=[,;)\}])/g, "");

        // 3) drop interface & type blocks
        src = src.replace(
          /(?:^|\n)\s*(?:interface|type)\s+\w+\s*[^;{]*\{[^}]*\}/g,
          ""
        );

        // 4) remove TS generics `<T>`
        src = src.replace(/<\s*[A-Za-z0-9_,\s\{\}]+\s*>/g, "");

        fs.writeFileSync(target, src, "utf8");
        fs.unlinkSync(file);
        console.log(`✔ ${file} → ${target}`);
      }
    } catch (e) {
      console.error(`✖ Failed on pattern ${pattern}`, e);
    }
  }
})();