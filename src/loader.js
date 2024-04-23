import { transform } from "esbuild";
import  { extname } from "node:path";

const typescriptExtensions = new Set([".ts", ".tsx"]);

export async function resolve(specifier, context, nextResolve) {
  const fileNameExtension = extname(specifier);

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

  const rawSource = (await nextLoad(url, { ...context, format: "moudle" }))
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
