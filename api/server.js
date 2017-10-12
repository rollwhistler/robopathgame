'use strict';

var loopback = require('loopback'),
    boot = require('loopback-boot'),
    app = loopback();

// setup hosting of admin

function startsWith(string, array) {
  for (let i = 0; i < array.length; i++)
    if (string.startsWith(array[i]))
      return true;
  return false;
}

if (process.env.NODE_ENV === 'staging') {


}


// start app

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // Migrate database

  const DbMigrate = require('db-migrate');
  const dbm = DbMigrate.getInstance(true, {
    env: process.env.NODE_ENV || 'dev',
    cwd: __dirname
  });

  dbm.up()
    .then(
      success => {
        // start the server if `$ node server.js`
        if (require.main === module)
          app.start();
      },
      error => {
        console.error('Failed to migrate', error);
      }
    )


});

module.exports = app;
