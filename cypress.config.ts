import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 5000,
  component: {
    specPattern: "test/**/*.test.{js,jsx,ts,tsx}",
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
