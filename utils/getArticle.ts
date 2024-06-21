import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { once } from "node:events";

export function processLineByLine() {
  return new Promise(async (resolve) => {
    const r = createInterface({
      input: createReadStream("../public/fictions/CharlotteWeb.md"),
      crlfDelay: Infinity,
    });

    r.on("line", (line) => {
      console.log("process the line ===> ", line);
      resolve(line);
    });

    await once(r, "close");
    console.log("file processed");
  });
}
