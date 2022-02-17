import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { glob } from 'glob';
import { container } from 'krisemm/app/web/services';
import { Middleware } from 'krisemm/context/shared/infrastructure/express/middlewares/Middleware';
import morgan from 'morgan';
import path from 'path';

const app: express.Express = express();
const errorHandlerMiddleware: Middleware = container.get('App.Shared.ErrorHandlerMiddleware');
const routesPaths: string[] = glob.sync(path.resolve(__dirname, '../routes/') + '/**/*.routes.{js,ts}');

app.set('port', 8081);
app.set('logger', container.get('App.Shared.Logger'));
app.set('views', path.resolve(__dirname, '../views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'dev') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webpackConfig = require('../resources/webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(morgan('dev'));

routesPaths.map(routePath => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { router } = require(routePath);
  app.use('/', router);
});

app.use(errorHandlerMiddleware.run.bind(errorHandlerMiddleware));

export const ApplicationWebApp: express.Express = app;
