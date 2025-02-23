import { Socket } from "socket.io";
import http from "http";

import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManger";
import admin from "./firebase";

const server = http.createServer(http);

const io = new Server(server, {
  cors: {
    origin: "https://soulmagle.vercel.app",
    methods: ["GET", "POST"]
  }
});

const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
  const userId = socket.handshake.query.userId as string;
  const db = admin.firestore();
  const userDocRef = db.collection('users').doc(userId);
  let user: any;
  userDocRef.get()
    .then((doc) => {
      if (doc.exists) {
       user = doc.data();
      } else {
        console.log('No such document!');
      }
    })
  console.log('a user connected', user?.name);
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  })
});
const PORT = Number(process.env.port) || 3000
server.listen(PORT, "0.0.0.0", () => {
  console.log('listening on *:3000');
});