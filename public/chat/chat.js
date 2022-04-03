const getSocket = () => {
	const socket = io();

	socket.on("connected", function (message) {
		document.getElementById("connect").style.display = "none";
		document.getElementById("welcome").innerHTML = message;
		document.getElementById("form").style.display = "block";
		document.getElementById("form").addEventListener("submit", (e) => {
			e.preventDefault();
			sendMessage(socket);
		});
	});

	socket.on("message", function (message) {
		const messages = document.getElementById("messages");
		messages.appendChild(createDivider());
		const div = createMessage(message);
		messages.appendChild(div);
	});

	socket.on("all", function (messages) {
		const div = document.getElementById("messages");
		messages.forEach((message, index) => {
			const msg = createMessage(message);
			div.appendChild(msg);
			if (index !== messages.length - 1) {
				div.appendChild(createDivider());
			}
		});
	});

	return socket;
};

const createDivider = () => {
	const divider = document.createElement("div");
	divider.className = "divider";
	return divider;
};

const createMessage = (message) => {
	const div = document.createElement("div");
	div.className = "single-message";
	div.innerHTML += `<p class="email">${message.email}</p>`;
	div.innerHTML += `<p class="text">${message.message}</p>`;
	return div;
};

const sendMessage = (socket) => {
	const message = document.getElementById("message")?.value;
	const email = document.getElementById("email")?.value;
	if (message) {
		socket.emit("message", { message, email });
		document.getElementById("message").value = "";
	}
};

const connectToChat = () => {
	try {
		getSocket();
	} catch (error) {
		console.log("error: ", error);
		document.getElementById("error").innerHTML = "Error al conectarse";
	}
};

document.getElementById("connect").addEventListener("click", () => {
	connectToChat();
});
