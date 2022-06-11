const mysqlDBSinker = require('./source-connector/mysqlSourceConnector');
mysqlDBSinker.then(() => console.log('Waiting for database vents...'))
    .catch(console.error);