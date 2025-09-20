// redisClient.js
import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();
const redisClient = createClient({
  username: 'default',
  password: process.env.REDISPWD,
  socket: {
    host: 'redis-11229.crce176.me-central-1-1.ec2.redns.redis-cloud.com',
    port: 11229,
  },
});

redisClient.on("error", (err) => console.error("Redis Error", err));

await redisClient.connect();  // connect once

export default redisClient;
