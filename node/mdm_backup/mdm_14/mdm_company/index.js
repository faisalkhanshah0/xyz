const webServer = require('./services/web-server.js');
const database = require('./services/database.js');
const dbConfig = require('./config/database.js');
const defaultThreadPoolSize = 4;

// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE = dbConfig.teimdb.poolMax + defaultThreadPoolSize;
process.env.UV_THREADPOOL_SIZE = dbConfig.fcmatdb.poolMax + defaultThreadPoolSize;

// Webserver start function starts here
async function startup() {
  console.log('Starting application');

  try {
    console.log('Initializing database module');

    await database.initialize();
	//await database_eim.initialize(); //new
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
  
    try {
    console.log('Initializing web server module');

    await webServer.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
 
   
}
// Webserver start function ends here

startup();


// Webserver shutdown function starts here
async function shutdown(e) {
  let err = e;

  console.log('Shutting down application');

  try {
    console.log('Closing web server module');

    await webServer.close();
  } catch (e) {
    console.error(e);

    err = err || e;
  }

  try {
    console.log('Closing database module');

    await database.close();
	//await database_eim.close();  //new
  } catch (e) {
    console.error(e);

    err = err || e;
  }
  
   
    console.log('Exiting process');
	
  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}
// Webserver shutdown function ends here

process.on('SIGTERM', () => {
  console.log('Received SIGTERM');

  shutdown();
});

process.on('SIGINT', () => {
  console.log('Received SIGINT');

  shutdown();
});

process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);

  shutdown(err);
});