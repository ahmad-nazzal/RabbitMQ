import amqp from "amqplib"

connect()

async function connect(){
  const amqpServer = "amqp://localhost:5672"
  const connection = await amqp.connect(amqpServer)
  const channel = await connection.createChannel();
  await channel.assertQueue("messages")
  await channel.consume("messages",(message)=>{
    console.log(message.content.toString());
    channel.ack(message);
  })
}