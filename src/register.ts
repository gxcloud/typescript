import { register } from "node:module";
import { pathToFileURL  } from "node:url";

register("@gxcloud/typescript/loader", pathToFileURL("./"));