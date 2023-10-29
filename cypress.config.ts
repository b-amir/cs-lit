import { defineConfig } from "cypress";
import { seed } from "prisma/seed-test";


export default defineConfig({
  // defaultCommandTimeout: 30_000,
  // responseTimeout: 30_000,
  // requestTimeout: 30_000,
  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false, // needed for testing auth-js
    testIsolation: false,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async seedDatabase() {
          await seed()
          return null;
        },
      });
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
