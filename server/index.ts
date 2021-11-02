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
	res.sendFile(
		path.join(__dirname, "..", "..", "server-storage", "sample.html")
	);
});

io.on("connection", (socket: socketio.Socket) => {
	console.log("client connected");

	//첫번째 인자값이 클라이언트랑 동일해야 요청 받을 수 있음!
	socket.on("chat message", (msg: string) => {
		console.log("server receive this : ", msg);
	});

	// socket.on("disconnect", () => {
	// 	console.log("client disconnected");
	// });
});

server.listen(
	4232 /*, () => {
	console.log("hey, I did it! : 4232");
}*/
);
