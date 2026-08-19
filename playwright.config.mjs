import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },

  // The suite drives the same server `npm run dev` does, so a passing run means
  // the extensionless links a reviewer clicks actually resolve.
  webServer: {
    command: `node scripts/serve.mjs`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
