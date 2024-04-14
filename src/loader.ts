import { transform } from "esbuild";
import path, { format } from "node:path";

const typescriptExtensions = new Set([".ts", ".tsx"]);

export async function resolve(specifier: any, context: any, nextResolve: any) {
  const extensions = path.extname(specifier);

  if (!typescriptExtensions.has(extensions)) {
    return nextResolve(specifier);
  }

  const { url } = await nextResolve(specifier);

  return {
    format: "typescript",
    shortCircuit: true,
    url,
  };
}

export async function load(url: string, context: any, nextLoad: any) {
  if (context.format !== "typescript") {
    return nextLoad(url);
  }

  const rawSource =
    "" + (await nextLoad(url, { ...context, format: "module" })).source;

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
