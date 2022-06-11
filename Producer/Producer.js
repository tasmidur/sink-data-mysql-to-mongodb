const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})
const producer = kafka.producer()

const sendMessage = async (message) => {
    await producer.connect()
    await producer.send(message)
    await producer.disconnect()
  }

module.exports=sendMessage
