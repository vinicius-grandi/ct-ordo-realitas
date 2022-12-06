const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '.env.local'),
});
const { defineConfig } = require('cypress');
const clearUsers = require('@ct-ordo-realitas/app/__tests__/utils/clearUsers');
const clearDatabases = require('@ct-ordo-realitas/app/__tests__/utils/clearDatabases.js');
const { createRoom } = require('@ct-ordo-realitas/app/__tests__/utils/factory');

module.exports = defineConfig({
  projectId: 'isfp9c',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on('task', {
        clearUsers: async () => {
          await clearUsers();
          return null;
        },
        clearDatabases: async () => {
          await clearDatabases();
          return null;
        },
        createRoom: async (
          { amount, name } = {
            amount: 1,
            name: '',
          },
        ) => {
          await createRoom(amount, name);
          return null;
        },
      });
      config.env = {
        ...process.env,
        ...config.env,
      };
      return config;
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },

  component: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    specPattern: 'components/**/*.cy.spec.{js,ts,jsx,tsx}',
  },

  component: {
    setupNodeEvents(on, config) {
      on('task', {
        clearUsers: async () => {
          await clearUsers();
          return null;
        },
        clearDatabases: async () => {
          await clearDatabases();
          return null;
        },
      });
      config.env = {
        ...process.env,
        ...config.env,
      };
      return config;
    },
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: {
        resolve: {
          fallback: {
            net: false,
            fs: false,
            tls: false,
            child_process: false,
          },
        },
      },
    },
  },
  port: 5001,
});
