import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const isDev = process.env.ROLLUP_WATCH;

export default {
  input: "src/dira-thermostat.ts",
  output: {
    file: "dist/dira-thermostat.js",
    format: "iife",
    name: "DiraThermostat",
  },
  plugins: [
    resolve(),
    typescript(),
    !isDev && terser({ format: { comments: false } }),
  ].filter(Boolean),
};
