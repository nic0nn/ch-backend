const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Proyecto Final - Programación Backend",
			version: "1.0.0",
			description:
				"API desarrollada para el proyecto final de Programación Backend de CoderHouse"
		},
		servers: [
			{
				url: "http://localhost:3000/api/v1"
			}
		],
		tags: [
			{
				name: "Users",
				description: "Operaciones sobre usuarios"
			},
			{
				name: "Products",
				description: "Operaciones sobre productos"
			},
			{
				name: "Cart",
				description: "Operaciones sobre carrito de compras"
			},
			{
				name: "Orders",
				description: "Operaciones sobre ordenes de compra"
			}
		]
	},
	apis: ["./libs/swagger/docs/**/*.yaml"]
};

if (process.env.NODE_ENV === "production") {
	options.definition.servers = [
		{ url: "https://c0der-backend.herokuapp.com/api/v1" }
	];
}
module.exports = options;
