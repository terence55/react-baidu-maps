var path = require('path');
var express = require('express');

var pkg = require('./package');
var config = {
  port: 8700
};

var isProduction = (process.env.NODE_ENV === 'production');
var frontendPath = path.join(__dirname, 'samples/index.html');

function startServer(config) {
  var app = express();

  if (!isProduction) {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
  }

  app.get('*', function (req, res) {
    if (req.accepts('html')) {
      res.sendFile(frontendPath);
    } else {
      res.status(404);
      res.end();
    }
  });

  app.listen(config.port, '0.0.0.0', function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(pkg.name + ' start server at port ' + config.port);
  });
}

startServer(config);
