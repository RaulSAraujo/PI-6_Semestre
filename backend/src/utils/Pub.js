import { config } from 'dotenv';
import { PubSub } from '@google-cloud/pubsub';
import { pub_sub_credentials } from '../../pub-sub-credentials.js'

config();

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function getRandomInt(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

async function publishMessage() {
  try {
    const pubsub = new PubSub({
      credentials: {
        ...pub_sub_credentials,
        "private_key": process.env.CLOUD_PUB_SUB_PRIVATE_KEY,
        "private_key_id": process.env.CLOUD_PUB_SUB_PRIVATE_KEY_ID,
      }
    });
    const topicName = process.env.CLOUD_PUB_SUB_TOPIC;

    const data = JSON.stringify({
      date: new Date().toISOString(),
      low: getRandomFloat(9.0, 13.0, 2),
      high: getRandomFloat(13.0, 15.0, 2),
      opening: getRandomFloat(12.0, 13.0, 2),
      last_value: getRandomFloat(10.0, 13.00, 2),
      percentage_change: getRandomFloat(0.0, 1.5, 2),
      id_listed_shares: getRandomInt([1, 2, 3, 4, 5, 6]),
      trading_volume: Math.floor(Math.random() * (200000000 - 100000000) + 100000000),
    });

    const dataBuffer = Buffer.from(data);

    await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
    console.log(`Message published.`);

  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
  }
}

export { publishMessage };
