/* craco.config.js */

const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#009688",
              "@font-size-base": "15px",
              "@font-size-lg": "16px",
              "@font-size-sm": "14px",
              "@btn-font-weight": "500",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
