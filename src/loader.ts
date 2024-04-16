import { transform } from "esbuild";
import type { ImportAttributes, ModuleFormat } from "node:module";
import { extname } from "node:path";

const typescriptExtensions = new Set([".ts", ".tsx"]);

export type ResolveHookContext = {
  conditions: string[];
  importAttributes: ImportAttributes;
  parentURL?: string;
};

export type ResolveHookOutput = {
  format?: ModuleFormat | "typescript";
  importAttributes?: ImportAttributes;
  shortCircuit?: boolean;
  url: string;
};

export type ResolveHookNext = (
  specifier: string,
  context?: ResolveHookContext,
) => ResolveHookOutput | Promise<ResolveHookOutput>;

export async function resolve(
  specifier: string,
  context: ResolveHookContext,
  nextResolve: ResolveHookNext,
): Promise<ResolveHookOutput> {
  const extensions = extname(specifier);

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

export type LoadHookContext = ResolveHookContext & {
  format: ModuleFormat | "typescript";
};

export type LoadHookOutput = {
  format?: ModuleFormat | "typescript";
  importAttributes?: ImportAttributes;
  shortCircuit?: boolean;
  source: string;
};

export type LoadHookNext = (
  url: string,
  context?: LoadHookContext,
) => Promise<LoadHookOutput>;

export async function load(
  url: string,
  context: LoadHookContext,
  nextLoad: LoadHookNext,
): Promise<LoadHookOutput> {
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
