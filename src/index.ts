import * as core from "@actions/core";
import fs from "fs";
import util from "util";
const readFileAsync = util.promisify(fs.readFile);

async function run() {
  const file_path: string = core.getInput("file_path");
  const prop_path: string = core.getInput("prop_path");
  let pathArr: string[] = [];

  if (prop_path) {
    pathArr = prop_path.split(".");
  }

  try {
    const buffer = await readFileAsync(file_path);
    let json = JSON.parse(buffer.toString());

    if (pathArr.length > 0) {
      json = pathArr.reduce(
        (obj, key) =>
          key && obj && obj[key] !== "undefined" ? obj[key] : undefined,
        json
      );
    }
    if (json && typeof json === "object") {
      for (const key in json) {
        core.setOutput(key, json[key]);
      }
    } else if (json) {
      core.setOutput("value", json);
    } else {
      core.setFailed(`can not find prop_path: ${prop_path} in json file.`);
    }
  } catch (error) {
    console.log(error);
    core.setFailed(error);
  }
}

run();
