// make.fun Mini: "Rate My Human: The One-Line Review"
// Writes exactly one line (1-200 characters) to <output>/entry.txt.
// Node 22, standard library only, no network, same bytes on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Three stars: brilliant ideas, zero documentation, and a gift for saying 'just one more thing' at 11:58 p.m. — would still take the job.";

const MAX_CHARS = 200;

function validate(line: string): number {
  const chars = [...line].length;
  if (line.trim() === "" || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line");
  }
  return chars;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const chars = validate(LINE);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote entry.txt (${chars} chars)`);
