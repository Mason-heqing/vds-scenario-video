'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"http://192.168.1.34:7035"',
  // API_HOST: '"http://127.0.0.1:9007"',
  // API_HOST: '"http://192.168.1.27:9007"',
  // API_HOST: '"https://pre.qy-rgs.com:7035"',
  // API_HOST: '"https://qy-vds.com:7035"',

  // SOCKET_HOST: '"scenario.qy-rgs.com:9007"',
  // SOCKET_HOST: '"192.168.1.34:7035"',
  // SOCKET_HOST: '"http://pre.qy-rgs.com:9007"',
  SOCKET_HOST_HOME: "'ws://192.168.1.247:6005'"
  // SOCKET_HOST_HOME:"'ws://residence-end.qy-rgs.com:9007'",
});
