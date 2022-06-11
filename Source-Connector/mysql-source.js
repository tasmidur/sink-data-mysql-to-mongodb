const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const sendMessage = require('../Producer/Producer');


const program = async () => {
  const connection = mysql.createConnection({
    user: 'root',
    password: 'root'
  });
  
  const instance = new MySQLEvents(connection, {
    startAtEnd: true,
    excludedSchemas: {
      mysql: true,
    },
  });

  await instance.start();

  instance.addTrigger({
    name: 'OPERATIONS',
    expression: '*',
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: (event) => { // You will receive the events here
       const message=
        {
          topic: event.table,
          messages: [
            { key: event.table, value: JSON.stringify(event) }
          ],
        }
        console.log(message);
      sendMessage(message);
    },
  });
  
  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
  .then(() => console.log('Waiting for database events...'))
  .catch(console.error);