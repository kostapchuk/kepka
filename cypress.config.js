const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        defaultCommandTimeout: 10000,
        setupNodeEvents(on, config) {
            // testomat.io reporter plugin:
            require('@testomatio/reporter/lib/adapter/cypress-plugin')(on, config);
        },
    },
});
