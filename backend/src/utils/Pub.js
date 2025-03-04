import { PubSub } from '@google-cloud/pubsub';

function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function getRandomInt(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

async function publishMessage() {
  const topicName = 'pi-duojohns-pub';
  const pubSubClient = new PubSub({ projectId: 'serjava-demo' });

  const data = JSON.stringify({
    date: '2025-03-04',
    low: getRandomFloat(9.0, 13.0, 2),
    high: getRandomFloat(13.0, 15.0, 2),
    opening: getRandomFloat(12.0, 13.0, 2),
    id_listed_shares: getRandomInt([1, 2, 3]),
    last_value: getRandomFloat(10.0, 13.00, 2),
    percentage_change: getRandomFloat(0.0, 1.5, 2),
    trading_volume: Math.floor(Math.random() * (200000000 - 100000000) + 100000000),
  });

  const dataBuffer = Buffer.from(data);

  try {
    const messageId = await pubSubClient.topic(topicName).publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
  }
}

export { publishMessage };
