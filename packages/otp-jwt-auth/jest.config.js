/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transformIgnorePatterns: [
    "node_modules/(?!url-join)"
  ]
};

module.exports = config;
