import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import initializeDB from './models/index.js';
import authController from './controllers/auth/authentication.js';
import friendController from './controllers/friend/friendActions.js';
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
app.use(session({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}))

app.use('/api/auth', authController);
app.use('/api', friendController);


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

initializeDB().then(() => {

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch((error) => {
  console.error('Database initialization failed:', error);
});
