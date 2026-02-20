/**
 * Vitest Configuration — Nayan Das Portfolio
 *
 * Uses @nuxt/test-utils to spin up a Nuxt environment for tests,
 * giving us auto-imports, composables, and component mounting
 * out of the box — just like the real app.
 */
import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    /* Use the Nuxt environment provided by @nuxt/test-utils */
    environment: 'nuxt',

    /* Only look inside __tests__/ for test files */
    include: ['__tests__/**/*.test.{js,ts}'],

    /* Increase timeout for Nuxt environment setup */
    testTimeout: 15000,
  },
});
