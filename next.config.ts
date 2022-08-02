import withWorkbox from 'next-with-workbox';
// import Index from './src/routes/index';
// import dBHandler from './src/dBHandler';
// import { stringify } from 'flatted';
// import 'reflect-metadata';
// import { serialize } from 'class-transformer';
// import { serialize } from 'esserializer';

module.exports = ( config ) => { 
  config = {...config, ...withWorkbox({
    workbox: {
      swSrc: 'worker.js',
      // .
      // ..
      // ... any workbox-webpack-plugin.GenerateSW option
    },
    // webpack: (config) => {
    //   return config;

    //   if (config.output.path.match(/server$/i)) {
    //     const entryConfigFunction = config.entry;
    //     config.entry = (context) =>
    //       entryConfigFunction(context).then((entry) => {
    //         // entry['foo-service'] = './src/foo-service.ts';
    //         // entry['bootstrap'] = './src/bootstrap.ts';
    //         return entry;
    //       });
    //   }
    //   // you will need to replace this regex with a function that fixes the import paths once you have modules in nested directories
    //   // config.externals.push(/foo-service|bootstrap/);
    // },
    serverRuntimeConfig: {
      // Will only be available on the server side
      // index: stringify(Index),
      // index: serialize(Index),
    },
    async headers() {
      return [
        {
          // matching all API routes
          source: "/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, authorization" },
          ]
        }
      ]
    },
    // .
    // ..
    // ... other Next.js config values
    webpack: (config) => {
      const assetRule = config.module.rules.find((rule) => {
        return rule?.loader ==='next-image-loader';
      });

      const assetLoader = {
        loader: assetRule.loader,
        options: assetRule.options || assetRule.query,
      };
      config.module.rules.unshift({
        test: /\.svg$/,
        use: ['@svgr/webpack', assetLoader],
      });
      config.module.rules = [{ oneOf: config.module.rules }];
      return config;
    }
  })};
  return config;
};
