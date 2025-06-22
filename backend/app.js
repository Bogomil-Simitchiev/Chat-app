import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json('API is running...TEST');
});
app.get('/api/name', (req, res) => {
  res.json('API is running...with name!!!');
});


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
