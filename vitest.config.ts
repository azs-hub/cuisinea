import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        // provider: 'c8', // or 'istanbul'
        reporter: ['text', 'json', 'html'], // Select your coverage formats
        include: ['src/**/*.vue', 'src/**/*.ts'], // Make sure your source files are included
        exclude: ['node_modules/', '*.spec.ts', 'src/js/firebase.ts', 'src/js/firebaseSeeder.ts'], // Exclude tests and other irrelevant files
        all: true, // This includes untested files in coverage report
      },
    },
  })
)
