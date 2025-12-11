const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'pkk8dh',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
