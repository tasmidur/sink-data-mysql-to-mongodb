const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const {updateOrCreate,deleteDoc} =require('../sink-connector/mongoDb');
const eventOptionalConfig = require('event-config');
const {EVENT_TYPE_DELETE} = require("../common/common");
require('dotenv').config();


const mysqlDBSinker = async () => {
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    });

    const instance = new MySQLEvents(connection, eventOptionalConfig);

    await instance.start();

    instance.addTrigger({
        name: 'OPERATIONS',
        expression: '*',
        statement: MySQLEvents.STATEMENTS.ALL,
        onEvent: (event) => { // You will receive the events here
            if(event.type===EVENT_TYPE_DELETE){
                const payload=event.affectedRows[0]?.before;
                const documentName=event.schema;
                console.log(payload);
                deleteDoc(documentName,payload);
            }else{
                const payload=event.affectedRows[0]?.after;
                const documentName=event.schema;
                console.log(payload);
                updateOrCreate(documentName,payload);
            }
        },
    });
    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

module.exports = mysqlDBSinker();