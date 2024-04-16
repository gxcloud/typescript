# @gxcloud/typescript
<b>Load TypeScript directly from node without any obscure cli tool.</b>

TypeScript is the new de-facto standard for writing applications for nodejs or the web. Unfortunately node isn't able to run TypeScript natively without any precompilation or some obscure packages like ts-node that do not let the user invoke the node command directly.

<b>@gxcloud/typescript</b> uses the new but still experimental [module hooks](https://nodejs.org/api/module.html#hooks) and a build pipeline using [esbuild](https://esbuild.github.io/) that compiles TypeScript to JavaScript on the fly and in memory.

## How to use it
You can use this module by importing the resolver:
```sh
node --import @gxcloud/typescript/resolver ./path/to/typescript/file.ts
```

## Credits
Thanks to Evan Wallace for creating and maintaining [esbuild](https://esbuild.github.io/). Without this sophisticated and extremly fast bundler, writing TypeScript would be a pain!


