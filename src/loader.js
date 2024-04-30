import { transform } from "esbuild";
import { extname } from "node:path";

const typescriptExtensions = new Set([".ts", ".tsx"]);

export async function resolve(specifier, context, nextResolve) {
  let fileNameExtension = extname(specifier);

  // if file name extension is not in import
  if (
    !fileNameExtension &&
    (specifier.includes("./") || specifier.includes("../"))
  ) {
    specifier += ".ts";
    fileNameExtension = ".ts";
  }

    if (!typescriptExtensions.has(fileNameExtension)) {
      return nextResolve(specifier);
    }

  const { url } = await nextResolve(specifier);

  return {
    format: "typescript",
    shortCircuit: true,
    url,
  };
}

export async function load(url, context, nextLoad) {
  if (context.format !== "typescript") {
    return nextLoad(url);
  }

  const rawSource = (await nextLoad(url, { ...context, format: "module" }))
    .source;

  const { code: transpiledSource } = await transform(rawSource, {
    format: "esm",
    loader: "ts",
    sourcemap: "inline",
    target: "esnext",
    platform: "node",
  });

  return {
    format: "module",
    shortCircuit: true,
    source: transpiledSource,
  };
}
