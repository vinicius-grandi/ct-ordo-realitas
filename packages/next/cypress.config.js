const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    specPattern: "cypress/e2e/**/*.cy.spec.{js,jsx,ts,tsx}",
  },

  component: {
    setupNodeEvents(on, config) {},
    specPattern: "components/**/*.cy.spec.{js,ts,jsx,tsx}",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  port: 5001,
});
