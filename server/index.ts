import socketio from "socket.io";
import express from "express";
import http from "http";
import path from "path";
const app = express();

//서버
const server = http.createServer(app);

//소켓친구
const io = new socketio.Server(server);

app.get("/", (req: express.Request, res: express.Response) => {
	res.sendFile(path.join(__dirname, "..", "server-storage", "sample.html"));
});

io.on("connection", (socket) => {
	console.log("client connected");

	socket.on("message", (obj: object) => {
		console.log("server receive this : ", obj);
	});

	socket.on("disconnect", () => {
		console.log("server disconnected");
	});
});

server.listen(4232, () => {
	console.log("hey, I did it! : 4232");
});
