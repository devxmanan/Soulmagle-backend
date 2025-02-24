
import { findSimilarUsers } from "../helpers/findSimilarInterest.js";
import { RoomManager } from "./RoomManager.js";


export class UserManager {
    users;
    queue;
    roomManager;

    constructor() {
        this.users = [];
        this.queue = [];
        this.roomManager = new RoomManager();
    }

    addUser(userId, socket) {
        this.users.push({
            userId, socket
        })
        this.queue.push(socket.id);
        socket.emit("lobby");
        this.clearQueue()
        this.initHandlers(socket);
    }

    removeUser(socketId) {
        this.users = this.users.filter(x => x.socket.id !== socketId);
        this.queue = this.queue.filter(x => x === socketId);
    }

    async clearQueue() {
        console.log("inside clear queues")
        console.log(this.queue.length);
        if (this.queue.length < 2) {
            return;
        }

        const id1 = this.queue.pop();

        console.log("id is " + id1);
        const user1 = this.users.find(x => x.socket.id === id1);
        const remainingUsers = this.users.filter(x => x.socket.id != id1);
        const similarUser = await findSimilarUsers(user1, remainingUsers);
        const user2 = this.users.find(x => x.userId === String(similarUser.userId));
        this.queue = this.queue.filter(x => x != user2.socket.id)

        if (!user1 || !user2) {
            return;
        }
        console.log("creating room");

        const room = this.roomManager.createRoom(user1, user2);
        this.clearQueue();
    }

    initHandlers(socket) {
        socket.on("offer", ({ sdp, roomId }) => {
            this.roomManager.onOffer(roomId, sdp, socket.id);
        })

        socket.on("answer", ({ sdp, roomId }) => {
            this.roomManager.onAnswer(roomId, sdp, socket.id);
        })

        socket.on("add-ice-candidate", ({ candidate, roomId, type }) => {
            this.roomManager.onIceCandidates(roomId, socket.id, candidate, type);
        });

    }

}