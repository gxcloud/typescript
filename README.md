# @gxcloud/typescript

**Load TypeScript directly from node without any obscure cli tool.**

TypeScript is the new de-facto standard for writing applications for nodejs or the web. Unfortunately node isn't able to run TypeScript natively without any precompilation or some obscure packages that try to implement their own AST instead of using a solid and battle tested solution.

**@gxcloud/typescript** uses the new but still experimental [module hooks](https://nodejs.org/api/module.html#hooks) and a build pipeline using [esbuild](https://esbuild.github.io/) that compiles TypeScript to JavaScript on the fly and in memory.

## How to use it
There are two options to use this package. You can either use the loader directly or with the register helper.
```sh
# loader
node --loader @gxcloud/typescript/loader ./path/to/code.ts

# register
node --import @gxcloud/typescript/register ./path/to/code.ts
```

The difference is, that when using the ```--loader```, you will get an error message that this is still experimental. In fact, it is actually just an alias for ```--experimental-loader```.

The exact error message looks like the following:
```txt
(node:4909) ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`:
--import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("@gxcloud/typescript/loader", pathToFileURL("./"));'
(Use `node --trace-warnings ...` to show where the warning was created)
```

The register helper uses exactly this code suggestion.

## Limitations
- Only ESM is supported at the moment.
- When importing files, you have to specify the file name extension, otherwise the module cannot be resolved.

## Thanks
Thanks to Evan Wallace for creating and maintaining [esbuild](https://esbuild.github.io/). Without this sophisticated and extremly fast bundler, writing TypeScript would be a pain!