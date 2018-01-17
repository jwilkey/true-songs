'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GATEWAY: '"http://localhost:3300"',
  GOOGLE_ANALYTICS_ID: '"UA-48039225-6"'
})
