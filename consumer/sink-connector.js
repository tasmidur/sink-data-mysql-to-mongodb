
const { Kafka, logLevel } = require('kafkajs');
const {updateOrCreate,deleteDoc} =require('./mongoDb');


const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`localhost:9092`],
  clientId: 'example-consumer',
})

const consumer = kafka.consumer({ groupId: 'persons-group' })

const sinker = async () => {
  await consumer.connect()
  await consumer.subscribe({ topics:['persons','person_details','person_address'], fromBeginning: true })
  await consumer.run({
    // eachBatch: async ({ batch }) => {
    //   console.log(batch)
    // },
    eachMessage: async ({ topic, partition, message }) => {
      const messageBody=JSON.parse(message.value.toString());
      let payload=null;
      if(messageBody.type=='DELETE'){
        payload=messageBody.affectedRows[0].before;
        deleteDoc(topic,payload);
      }else{
        payload=messageBody.affectedRows[0].after;
        updateOrCreate(topic,payload);
      }
    },
  })
}

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
sinker();

// errorTypes.forEach(type => {
//   process.on(type, async e => {
//     try {
//       console.log(`process.on ${type}`)
//       console.error(e)
//       await consumer.disconnect()
//       process.exit(0)
//     } catch (_) {
//       process.exit(1)
//     }
//   })
// })

// signalTraps.forEach(type => {
//   process.once(type, async () => {
//     try {
//       await consumer.disconnect()
//     } finally {
//       process.kill(process.pid, type)
//     }
//   })
// })