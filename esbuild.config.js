const esbuild = require('esbuild');
// Automatically exclude all node_modules from the bundled version
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild
  .build({
    entryPoints: ['./src/index.js'],
    outdir: 'lib',
    bundle: true,
    minifyWhitespace: true,
    minifySyntax: true,
    minifyIdentifiers: false,
    platform: 'browser',
    sourcemap: true,
    target: ['node14', 'esnext'],
    splitting: true,
    format: 'esm',
    plugins: [nodeExternalsPlugin()],
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
