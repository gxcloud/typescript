import { register } from "node:module";
import { pathToFileURL  } from "node:url";

register("./lib/loader.js", pathToFileURL("./"));