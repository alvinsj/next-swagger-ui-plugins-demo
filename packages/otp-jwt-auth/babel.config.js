module.exports = {
  plugins: ["@babel/plugin-transform-modules-commonjs"],
  presets: ["@babel/preset-react", ['@babel/preset-env', {targets: {node: 'current'}}]],
};
