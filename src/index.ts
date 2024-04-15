import { register } from "node:module";
import { pathToFileURL  } from "node:url";

register("node_modules/@gxcloud/typescript/lib/loader.js", pathToFileURL("./"));