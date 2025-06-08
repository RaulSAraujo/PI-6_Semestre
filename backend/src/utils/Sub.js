import { config } from 'dotenv';
import { PubSub } from '@google-cloud/pubsub';
import { pub_sub_credentials } from '../../pub-sub-credentials.js'
import ListedSharesService from '../services/ListedSharesService.js';
import ListedShareHistoryService from '../services/ListedShareHistoryService.js';

config();
const listedSharesService = new ListedSharesService();
const listedShareHistoryService = new ListedShareHistoryService();


async function startListening() {
  const pubsub = new PubSub({
    credentials: {
      ...pub_sub_credentials,
      "private_key": process.env.CLOUD_PUB_SUB_PRIVATE_KEY,
      "private_key_id": process.env.CLOUD_PUB_SUB_PRIVATE_KEY_ID,
    }
  });
  const signatureName = process.env.CLOUD_PUB_SUB_SIGNATURE;

  const subscription = pubsub.subscription(signatureName);

  subscription.on('message', async (message) => {
    await processJson(message.data.toString());
    message.ack();  // Acknowledge the message
  });

  subscription.on('error', (error) => {
    console.error(`Received error on subscription: ${error.message}`);
  });


  console.log(`### Listening for messages on ${signatureName} ###`);
}

async function processJson(jsonMessage) {
  try {
    const message = JSON.parse(jsonMessage);
    const createdActionHistory = await listedShareHistoryService.create({ body: message });

    const req = { params: { id: createdActionHistory.id_listed_shares } };
    const action = await listedSharesService.getById(req);

    console.log(`Histórico de Ação adicionado: ${action.name}`)

  } catch (error) {
    console.error(`Error processing message: ${error.message}`);
  }
}

export { startListening };