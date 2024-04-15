import { register } from "node:module";
import { pathToFileURL  } from "node:url";

register("@gxcloud/typescript/lib/loader.js", pathToFileURL("./"));