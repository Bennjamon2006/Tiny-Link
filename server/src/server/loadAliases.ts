import { addAlias } from "module-alias";
import { resolve } from "path";
import { readdirSync } from "fs";

const baseDir = resolve(__dirname, "../");

const directories = readdirSync(baseDir);

for (const dir of directories) {
  const fullPath = resolve(baseDir, dir);
  addAlias(dir, fullPath);
}
