import express from 'express';
import listEndpoints from 'express-list-endpoints';

const server = express();

const PORT = 3001;

server.use(express.json());

server.listen(PORT, () => console.log('✅ Server is running on port : ', PORT));

server.on('error', (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
