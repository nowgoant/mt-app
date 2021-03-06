import * as Koa from 'koa';
import * as consola from 'consola';
const { Nuxt, Builder } = require('nuxt');
// import chalk from 'chalk';

import { join } from 'path';
import { useKoaServer } from 'routing-controllers';

const routePrefix = '/api';
const app = new Koa();
let config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');

export class Server {
  constructor() {}

  private setRoutes = () => {
    useKoaServer(app, {
      /**
       * We can add options about how routing-controllers should configure itself.
       * Here we specify what controllers should be registered in our express server.
       */
      controllers: [join(__dirname, '/controllers/**/*')],
      routePrefix: routePrefix
    });
  };

  public async startServer() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config);

    const { host = process.env.HOST || '127.0.0.1', port = process.env.PORT || 3000 } = nuxt.options.server;

    // Build in development
    if (config.dev) {
      const builder = new Builder(nuxt);
      await builder.build();
    } else {
      await nuxt.ready();
    }

    this.setRoutes();

    app.use(async (ctx, next) => {
      if (ctx.originalUrl.indexOf(routePrefix) === 0) {
        await next();
      } else {
        ctx.status = 200;
        // koa defaults to 404 when it sees that status is unset
        return new Promise((resolve, reject) => {
          ctx.res.on('close', resolve);
          ctx.res.on('finish', resolve);
          nuxt.render(ctx.req, ctx.res, promise => {
            // nuxt.render passes a rejected promise into callback on error.
            promise.then(resolve).catch(reject);
          });
        });
      }
    });

    app.listen(port, host);
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    });
  }

  //When hosting a client app such as angular - map the path to the client dist folder
  public setStaticFolders = () => {
    // var path = require('path');
    // let clientPath = path.join(__dirname, '../<client folder>/dist');
    //console.log(`adding static folder: ${clientPath}`)
    // this.app.use(express.static(clientPath));
  };

  public setErrorHandlers = () => {
    // this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    //   res.status((<any>err).status || 500);
    //   res.send({
    //     message: err.message,
    //     error: err
    //   });
    // });
  };
}
