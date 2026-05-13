import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

// Library build config — produces `dist-lib/` with:
//   - index.mjs / index.cjs   (JS bundles)
//   - index.d.ts              (type declarations)
//   - styles.css              (tokens + every component's CSS, concatenated)
//
// Consumed by `npm run build:lib`. Does NOT replace the demo build
// (`npm run build`), which still emits the Vercel-deployed app to `dist/`.

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/components/**/*', 'src/lib.ts'],
      exclude: ['src/App.tsx', 'src/main.tsx', '**/*.test.*'],
      rollupTypes: true,
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  build: {
    outDir: 'dist-lib',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/lib.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@phosphor-icons/react'],
      output: {
        assetFileNames: (asset) => {
          if (asset.name && asset.name.endsWith('.css')) return 'styles.css';
          return 'assets/[name][extname]';
        },
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@phosphor-icons/react': 'PhosphorReact',
        },
      },
    },
  },
});
