import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import setupRoutes from './src/routes/index.js';

import { startListening } from './src/utils/Sub.js';
import { publishMessage } from './src/utils/Pub.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  }),
);
app.use(bodyParser.json());
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Iniciar a escuta de mensagens (SUB)
startListening().catch(console.error);

// Configurar o cronjob para publicar uma mensagem a cada 12 horas
cron.schedule(process.env.CRON_SCHEDULE, async () => {
  await publishMessage();
});
