import { defineConfig } from "vitest/config";

// Separate from vite.config.ts: the React Router plugin can't run inside Vitest.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["app/**/*.{ts,tsx}"],
      exclude: [
        "app/**/*.test.{ts,tsx}",
        "app/components/ui/**", // shadcn-generated
        "app/lib/mock-threads.ts", // fake data, not logic
        "app/root.tsx",
        "app/routes.ts",
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
