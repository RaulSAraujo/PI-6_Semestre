import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  logging: false,
  timezone: '-03:00',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  sync: { force: process.env.DB_SYNCHRONIZE === 'true' },
  dialectOptions: process.env.SSL == 'true' ? {
    ssl: {
      require: true, // Force SSL/TLS
      rejectUnauthorized: false // Allow self-signed certificates, use `true` in production
    }
  } : {},
});

export default sequelize;
