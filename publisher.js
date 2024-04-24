import amqp from "amqplib"
import readline from "readline"

connect()


function read(){

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let recieveMessage
  rl.question('Please enter your message: ', async (message) => {
    console.log(message);
    recieveMessage=message
    rl.close();
  });
// return resultMessage
}

const args = process.argv
const message =args.slice(2).join(" ")
async function connect(){
  try {
    const amqpServer = "amqp://localhost:5672"
    const connection =await amqp.connect(amqpServer)
    const channel = await connection.createChannel();
    const queueName = "messages"
    await channel.assertQueue(queueName);
    await channel.sendToQueue(queueName,Buffer.from(message));

    await channel.close()
    await connection.close()

    
  } catch (error) {
    console.error(error)
  }


}