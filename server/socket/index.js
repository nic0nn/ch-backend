const socketio = require("socket.io");
const Chat = require("../../persistence").getDAO("chat");

const getMessages = () => {
	return Chat.getAll();
};

exports.start = (server) => {
	const io = socketio(server);

	io.on("connection", (socket) => {
		console.log(`${socket.id} has connected`);

		getMessages().then((messages) => {
			socket.emit("all", messages);
			socket.emit("connected", "Te has conectado al servidor");
		});

		socket.on("disconnect", () => {
			console.log(`${socket.id} has disconnected`);
		});

		socket.on("message", (message) => {
			Chat.create(message);
			io.sockets.emit("message", message);
		});
	});
	return server;
};
