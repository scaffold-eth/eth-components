import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: [
    './src/index.ts',
    './src/ant/index.ts',
    './src/ant/generic-contract/index.ts',
    './src/functions/index.ts',
    './src/models/index.ts',
  ],
  splitting: true,
  sourcemap: true,
  clean: true,
  outDir: 'lib',
  bundle: true,
  minifyWhitespace: false,
  minifySyntax: false,
  minifyIdentifiers: false,
  platform: 'browser',
  legacyOutput: false,
  target: ['node16', 'esnext'],
  format: ['cjs', 'esm'],
  inject: ['esbuild.shim.js'],
  skipNodeModulesBundle: true,
  tsconfig: 'tsconfig.build.json',
  treeshake: true,
});
