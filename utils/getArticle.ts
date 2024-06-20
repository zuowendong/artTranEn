import fs from "node:fs";

function readArticle() {
  fs.readFile(
    "/public/fictions/CharlotteWeb.json",
    "utf8",
    (err: any, data: string) => {
      if (err) {
        console.error("Error reading file:", err);
      } else {
        console.log(data);
      }
    }
  );
}
