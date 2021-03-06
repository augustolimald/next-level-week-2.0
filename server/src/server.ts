import cors from 'cors';
import express from 'express';
import routes from './routes';

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(5000, () => {
  console.log('Server listening on http://localhost:5000')
});