import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'heiq2q',
  defaultCommandTimeout: 5000,
  fileServerFolder: 'public',
  component: {
    specPattern: "test/**/*.test.{js,jsx,ts,tsx}",
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
